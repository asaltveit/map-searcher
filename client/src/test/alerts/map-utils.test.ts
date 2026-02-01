import { describe, it, expect } from 'vitest';
import { calculateBounds, DEFAULT_FIT_BOUNDS_OPTIONS } from '@/lib/map-utils';
import type { GeoJsonFeatureCollection } from '@/lib/api';

describe('calculateBounds', () => {
  it('returns null for empty feature collection', () => {
    const geojson: GeoJsonFeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };

    expect(calculateBounds(geojson)).toBeNull();
  });

  it('returns padded bounds for single point', () => {
    const geojson: GeoJsonFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-81.0998, 32.0809],
          },
          properties: {
            locationId: '1',
            articleId: 'a1',
            alertId: 'alert1',
            articleTitle: 'Test',
            mention: 'Savannah',
            mentionType: 'city',
            articleUrl: 'https://example.com',
            publishedAt: '2024-01-01T00:00:00Z',
          },
        },
      ],
    };

    const bounds = calculateBounds(geojson);
    expect(bounds).not.toBeNull();

    const [[minLng, minLat], [maxLng, maxLat]] = bounds!;

    // Should be padded around the single point
    expect(minLng).toBeLessThan(-81.0998);
    expect(maxLng).toBeGreaterThan(-81.0998);
    expect(minLat).toBeLessThan(32.0809);
    expect(maxLat).toBeGreaterThan(32.0809);
  });

  it('returns correct bounds for multiple points', () => {
    const geojson: GeoJsonFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-81.0998, 32.0809], // Savannah
          },
          properties: {
            locationId: '1',
            articleId: 'a1',
            alertId: 'alert1',
            articleTitle: 'Test 1',
            mention: 'Savannah',
            mentionType: 'city',
            articleUrl: 'https://example.com/1',
            publishedAt: '2024-01-01T00:00:00Z',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-84.3880, 33.7490], // Atlanta
          },
          properties: {
            locationId: '2',
            articleId: 'a2',
            alertId: 'alert1',
            articleTitle: 'Test 2',
            mention: 'Atlanta',
            mentionType: 'city',
            articleUrl: 'https://example.com/2',
            publishedAt: '2024-01-01T00:00:00Z',
          },
        },
      ],
    };

    const bounds = calculateBounds(geojson);
    expect(bounds).not.toBeNull();

    const [[minLng, minLat], [maxLng, maxLat]] = bounds!;

    // Bounds should encompass both points
    expect(minLng).toBeLessThanOrEqual(-84.3880); // Atlanta (westernmost)
    expect(maxLng).toBeGreaterThanOrEqual(-81.0998); // Savannah (easternmost)
    expect(minLat).toBeLessThanOrEqual(32.0809); // Savannah (southernmost)
    expect(maxLat).toBeGreaterThanOrEqual(33.7490); // Atlanta (northernmost)
  });

  it('returns bounds in correct format [[minLng, minLat], [maxLng, maxLat]]', () => {
    const geojson: GeoJsonFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-80, 30],
          },
          properties: {
            locationId: '1',
            articleId: 'a1',
            alertId: 'alert1',
            articleTitle: 'Test',
            mention: 'Test',
            mentionType: 'city',
            articleUrl: 'https://example.com',
            publishedAt: '2024-01-01T00:00:00Z',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-85, 35],
          },
          properties: {
            locationId: '2',
            articleId: 'a2',
            alertId: 'alert1',
            articleTitle: 'Test 2',
            mention: 'Test 2',
            mentionType: 'city',
            articleUrl: 'https://example.com/2',
            publishedAt: '2024-01-01T00:00:00Z',
          },
        },
      ],
    };

    const bounds = calculateBounds(geojson);
    expect(bounds).toHaveLength(2);
    expect(bounds![0]).toHaveLength(2);
    expect(bounds![1]).toHaveLength(2);

    // First element is SW corner [minLng, minLat]
    // Second element is NE corner [maxLng, maxLat]
    expect(bounds![0][0]).toBeLessThanOrEqual(bounds![1][0]); // minLng <= maxLng
    expect(bounds![0][1]).toBeLessThanOrEqual(bounds![1][1]); // minLat <= maxLat
  });
});

describe('DEFAULT_FIT_BOUNDS_OPTIONS', () => {
  it('has expected properties', () => {
    expect(DEFAULT_FIT_BOUNDS_OPTIONS).toHaveProperty('padding', 50);
    expect(DEFAULT_FIT_BOUNDS_OPTIONS).toHaveProperty('maxZoom', 14);
    expect(DEFAULT_FIT_BOUNDS_OPTIONS).toHaveProperty('duration', 500);
  });
});
