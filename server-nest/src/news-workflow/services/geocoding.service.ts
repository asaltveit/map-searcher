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
    // Rate limiting: ensure at least 1 second between requests
    await this.rateLimit();

    const query = `${location}, ${regionContext}`;
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "1");

    try {
      const response = await fetch(url.toString(), {
        headers: {
          "User-Agent": "MapSearcher/1.0 (news-workflow)",
        },
      });

      if (!response.ok) {
        throw new Error(`Nominatim returned ${response.status}`);
      }

      const results: NominatimResult[] = await response.json();

      if (results && results.length > 0) {
        const result = results[0];
        return {
          success: true,
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          formattedAddress: result.display_name,
          confidence: result.importance,
        };
      }

      // No results found - try LocationIQ fallback if configured
      if (process.env.LOCATIONIQ_API_KEY) {
        return this.geocodeWithLocationIQ(location, regionContext);
      }

      return { success: false, error: "No results found" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Geocoding failed for "${query}": ${message}`);

      // Try LocationIQ fallback if configured
      if (process.env.LOCATIONIQ_API_KEY) {
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
    await this.rateLimit();

    const query = `${location}, ${regionContext}`;
    const url = new URL("https://us1.locationiq.com/v1/search.php");
    url.searchParams.set("key", process.env.LOCATIONIQ_API_KEY!);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`LocationIQ returned ${response.status}`);
      }

      const results = await response.json();

      if (results && results.length > 0) {
        const result = results[0];
        return {
          success: true,
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          formattedAddress: result.display_name,
          confidence: result.importance || 0.5,
        };
      }

      return { success: false, error: "No results found (LocationIQ)" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(
        `LocationIQ geocoding failed for "${query}": ${message}`,
      );
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
