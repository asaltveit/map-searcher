import { Test, TestingModule } from "@nestjs/testing";
import { GeocodingService } from "./geocoding.service";

describe("GeocodingService", () => {
  let service: GeocodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeocodingService],
    }).compile();

    service = module.get<GeocodingService>(GeocodingService);
  });

  describe("geocode", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
      expect(service.geocode).toBeDefined();
    });

    it("should return success false when geocoding fails", async () => {
      // Mock fetch to simulate network error
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

      const result = await service.geocode("123 Main St", "San Francisco, CA");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Network error");

      global.fetch = originalFetch;
    });

    it("should return success false when no results found", async () => {
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      });

      const result = await service.geocode(
        "NonexistentAddress12345",
        "Nowhere, XX",
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain("No results");

      global.fetch = originalFetch;
    });

    it("should return geocoded result on success", async () => {
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              lat: "37.7749",
              lon: "-122.4194",
              display_name: "123 Main St, San Francisco, CA 94102, USA",
              importance: 0.85,
            },
          ]),
      });

      const result = await service.geocode("123 Main St", "San Francisco, CA");

      expect(result.success).toBe(true);
      expect(result.lat).toBe(37.7749);
      expect(result.lng).toBe(-122.4194);
      expect(result.formattedAddress).toContain("San Francisco");
      expect(result.confidence).toBe(0.85);

      global.fetch = originalFetch;
    });
  });

  describe("batchGeocode", () => {
    it("should geocode multiple locations", async () => {
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              lat: "37.7749",
              lon: "-122.4194",
              display_name: "Location 1",
              importance: 0.9,
            },
          ]),
      });

      const locations = [
        { id: "loc1", mention: "123 Main St" },
        { id: "loc2", mention: "456 Oak Ave" },
      ];

      const results = await service.batchGeocode(locations, "San Francisco, CA");

      expect(results.size).toBe(2);
      expect(results.get("loc1")).toBeDefined();
      expect(results.get("loc2")).toBeDefined();

      global.fetch = originalFetch;
    });
  });
});
