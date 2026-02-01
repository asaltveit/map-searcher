import bbox from '@turf/bbox';
import type { GeoJsonFeatureCollection } from '@/lib/api';

export type MapBounds = [[number, number], [number, number]];

/**
 * Calculate map bounds from a GeoJSON FeatureCollection using turf.js bbox
 * @param geojson - GeoJSON FeatureCollection with Point features
 * @returns Map bounds as [[minLng, minLat], [maxLng, maxLat]] or null if no valid features
 */
export function calculateBounds(geojson: GeoJsonFeatureCollection): MapBounds | null {
  if (!geojson.features || geojson.features.length === 0) {
    return null;
  }

  // Filter to ensure we have valid Point geometries
  const validFeatures = geojson.features.filter(
    (f) => f.geometry?.type === 'Point' &&
           Array.isArray(f.geometry.coordinates) &&
           f.geometry.coordinates.length >= 2
  );

  if (validFeatures.length === 0) {
    return null;
  }

  // If only one point, return a small bounding box around it
  if (validFeatures.length === 1) {
    const [lng, lat] = validFeatures[0].geometry.coordinates;
    const padding = 0.01; // ~1km padding
    return [
      [lng - padding, lat - padding],
      [lng + padding, lat + padding],
    ];
  }

  // bbox returns [west, south, east, north] = [minLng, minLat, maxLng, maxLat]
  const [minLng, minLat, maxLng, maxLat] = bbox({
    type: 'FeatureCollection',
    features: validFeatures,
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

/**
 * Fit bounds options for react-map-gl
 */
export const DEFAULT_FIT_BOUNDS_OPTIONS = {
  padding: 50,
  maxZoom: 14,
  duration: 500,
};
