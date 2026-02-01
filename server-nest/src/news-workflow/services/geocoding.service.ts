import { Injectable, Logger } from "@nestjs/common";

export interface GeocodeResult {
  success: boolean;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
  confidence?: number;
  error?: string;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  importance: number;
}

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);
  private lastRequestTime = 0;
  private readonly MIN_REQUEST_INTERVAL_MS = 1100; // Nominatim rate limit: 1 req/sec

  /**
   * Geocode a location string to lat/lng coordinates using Nominatim
   */
  async geocode(
    location: string,
    regionContext: string,
  ): Promise<GeocodeResult> {
    this.logger.log(`[GEOCODE] geocode START - location="${location}", regionContext="${regionContext}"`);

    // Rate limiting: ensure at least 1 second between requests
    await this.rateLimit();
    this.logger.log(`[GEOCODE] Rate limit passed`);

    const query = `${location}, ${regionContext}`;
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "1");

    this.logger.log(`[GEOCODE] Nominatim request URL: ${url.toString()}`);

    try {
      const response = await fetch(url.toString(), {
        headers: {
          "User-Agent": "MapSearcher/1.0 (news-workflow)",
        },
      });

      this.logger.log(`[GEOCODE] Nominatim response status: ${response.status}`);

      if (!response.ok) {
        this.logger.error(`[GEOCODE] Nominatim HTTP error: ${response.status} ${response.statusText}`);
        throw new Error(`Nominatim returned ${response.status}`);
      }

      const results: NominatimResult[] = await response.json();
      this.logger.log(`[GEOCODE] Nominatim results count: ${results?.length || 0}`);

      if (results && results.length > 0) {
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        this.logger.log(`[GEOCODE] SUCCESS - location="${location}", lat=${lat}, lng=${lng}, address="${result.display_name}", importance=${result.importance}`);
        return {
          success: true,
          lat,
          lng,
          formattedAddress: result.display_name,
          confidence: result.importance,
        };
      }

      this.logger.warn(`[GEOCODE] NO RESULTS from Nominatim for query="${query}"`);

      // No results found - try LocationIQ fallback if configured
      if (process.env.LOCATIONIQ_API_KEY) {
        this.logger.log(`[GEOCODE] Trying LocationIQ fallback...`);
        return this.geocodeWithLocationIQ(location, regionContext);
      }

      this.logger.warn(`[GEOCODE] FAILED - No results found and no LocationIQ fallback configured`);
      return { success: false, error: "No results found" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`[GEOCODE] EXCEPTION for query="${query}": ${message}`);

      // Try LocationIQ fallback if configured
      if (process.env.LOCATIONIQ_API_KEY) {
        this.logger.log(`[GEOCODE] Trying LocationIQ fallback after error...`);
        return this.geocodeWithLocationIQ(location, regionContext);
      }

      return { success: false, error: message };
    }
  }

  /**
   * Fallback geocoding using LocationIQ
   */
  private async geocodeWithLocationIQ(
    location: string,
    regionContext: string,
  ): Promise<GeocodeResult> {
    this.logger.log(`[GEOCODE-LIQ] geocodeWithLocationIQ START - location="${location}", regionContext="${regionContext}"`);
    await this.rateLimit();

    const query = `${location}, ${regionContext}`;
    const url = new URL("https://us1.locationiq.com/v1/search.php");
    url.searchParams.set("key", process.env.LOCATIONIQ_API_KEY!);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    this.logger.log(`[GEOCODE-LIQ] LocationIQ request (key hidden)`);

    try {
      const response = await fetch(url.toString());
      this.logger.log(`[GEOCODE-LIQ] LocationIQ response status: ${response.status}`);

      if (!response.ok) {
        this.logger.error(`[GEOCODE-LIQ] LocationIQ HTTP error: ${response.status}`);
        throw new Error(`LocationIQ returned ${response.status}`);
      }

      const results = await response.json();
      this.logger.log(`[GEOCODE-LIQ] LocationIQ results count: ${results?.length || 0}`);

      if (results && results.length > 0) {
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        this.logger.log(`[GEOCODE-LIQ] SUCCESS - location="${location}", lat=${lat}, lng=${lng}`);
        return {
          success: true,
          lat,
          lng,
          formattedAddress: result.display_name,
          confidence: result.importance || 0.5,
        };
      }

      this.logger.warn(`[GEOCODE-LIQ] NO RESULTS from LocationIQ for query="${query}"`);
      return { success: false, error: "No results found (LocationIQ)" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`[GEOCODE-LIQ] EXCEPTION for query="${query}": ${message}`);
      return { success: false, error: `LocationIQ: ${message}` };
    }
  }

  /**
   * Batch geocode multiple locations with rate limiting
   */
  async batchGeocode(
    locations: Array<{ id: string; mention: string }>,
    regionContext: string,
  ): Promise<Map<string, GeocodeResult>> {
    const results = new Map<string, GeocodeResult>();

    for (const loc of locations) {
      const result = await this.geocode(loc.mention, regionContext);
      results.set(loc.id, result);
    }

    return results;
  }

  /**
   * Rate limiting helper
   */
  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL_MS) {
      await this.delay(this.MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest);
    }

    this.lastRequestTime = Date.now();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
