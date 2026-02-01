'use client';

import { useEffect, useRef } from 'react';
import { Source, Layer, Popup, useMap } from 'react-map-gl/maplibre';
export const PINS_LAYER_ID = 'research-pins';
const PINS_SOURCE_ID = 'research-pins-source';

const circleLayerStyle = {
  id: PINS_LAYER_ID,
  type: 'circle' as const,
  source: PINS_SOURCE_ID,
  paint: {
    'circle-radius': 10,
    'circle-color': '#0d9488',
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff',
  },
};

function getBounds(features: GeoJSON.Feature<GeoJSON.Point>[]): [[number, number], [number, number]] | null {
  if (features.length === 0) return null;
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const f of features) {
    const coords = f.geometry?.coordinates;
    if (!coords || coords.length < 2) continue;
    const [lng, lat] = coords as [number, number];
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
  }
  return [[minLng, minLat], [maxLng, maxLat]];
}

export type PinsSelectedFeature = {
  feature: GeoJSON.Feature<GeoJSON.Point>;
  lngLat: [number, number];
};

export interface MapPinsLayerProps {
  /** GeoJSON FeatureCollection of points (e.g. demo or API data from map agent). */
  data: GeoJSON.FeatureCollection | null;
  /** Currently selected feature (from map click in parent). */
  selectedFeature: PinsSelectedFeature | null;
  /** Clear selection (e.g. when popup closes). */
  onClearSelect: () => void;
  /** Callback when a pin is selected (for aria-live / screen reader). */
  onSelectFeature?: (feature: GeoJSON.Feature<GeoJSON.Point> | null) => void;
}

export function MapPinsLayer({
  data,
  selectedFeature,
  onClearSelect,
}: MapPinsLayerProps) {
  const fitDoneRef = useRef(false);
  const mapRef = useMap();

  const features = (data?.features ?? []) as GeoJSON.Feature<GeoJSON.Point>[];
  const hasFeatures = features.length > 0;

  useEffect(() => {
    if (!hasFeatures || fitDoneRef.current) return;
    const map = mapRef?.current?.getMap?.();
    if (!map) return;
    const bounds = getBounds(features);
    if (!bounds) return;
    const padding = 40;
    const duration =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 600;
    map.fitBounds(bounds, { padding, duration });
    fitDoneRef.current = true;
  }, [hasFeatures, features, mapRef]);

  if (!data || data.features.length === 0) return null;

  return (
    <>
      <Source id={PINS_SOURCE_ID} type="geojson" data={data}>
        <Layer {...circleLayerStyle} />
      </Source>
      {selectedFeature && (
        <Popup
          longitude={selectedFeature.lngLat[0]}
          latitude={selectedFeature.lngLat[1]}
          onClose={onClearSelect}
          closeButton
          closeOnClick={false}
          anchor="bottom"
          className="map-pin-popup"
        >
          <div className="min-w-[180px] max-w-[280px] text-left">
            <p className="font-semibold text-foreground">
              {(selectedFeature.feature.properties as { title?: string })?.title ?? 'Location'}
            </p>
            {(selectedFeature.feature.properties as { snippet?: string })?.snippet && (
              <p className="mt-1 text-sm text-muted-foreground">
                {(selectedFeature.feature.properties as { snippet?: string }).snippet}
              </p>
            )}
          </div>
        </Popup>
      )}
    </>
  );
}
