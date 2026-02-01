'use client';

import { useState, useCallback } from 'react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
// Relative path avoids Turbopack "server relative imports" error when aliasing maplibre-gl
import '../../../node_modules/maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { DEFAULT_VIEW_STATE, MAP_STYLES } from '@/lib/map-config';
import { MapPinsLayer, PINS_LAYER_ID, type PinsSelectedFeature } from './map-pins-layer';
import { DEMO_RESEARCH_GEOJSON } from '@/data/demo-research-geojson';

interface MapContainerProps {
  className?: string;
  children?: React.ReactNode;
  /** GeoJSON to show (from map agent or demo). When null/undefined, uses demo data. */
  pinsData?: GeoJSON.FeatureCollection | null;
}

export function MapContainer({ className, children, pinsData }: MapContainerProps) {
  const [selectedFeature, setSelectedFeature] = useState<PinsSelectedFeature | null>(null);

  const data = pinsData ?? DEMO_RESEARCH_GEOJSON;
  const hasPins = data.features.length > 0;

  const handleMapClick = useCallback(
    (ev: { features?: Array<GeoJSON.Feature>; lngLat: { lng: number; lat: number } }) => {
      const f = ev.features?.[0];
      if (!f || f.geometry?.type !== 'Point') {
        setSelectedFeature(null);
        return;
      }
      const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number];
      setSelectedFeature({
        feature: f as GeoJSON.Feature<GeoJSON.Point>,
        lngLat: [ev.lngLat.lng, ev.lngLat.lat],
      });
    },
    []
  );

  const clearSelection = useCallback(() => setSelectedFeature(null), []);

  return (
    <div
      className={cn("relative border-border", className)}
      role="application"
      aria-label="Interactive map of research locations"
    >
      <Map
        initialViewState={DEFAULT_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLES.liberty}
        onClick={handleMapClick}
        cursor={hasPins ? 'pointer' : undefined}
        interactiveLayerIds={hasPins ? [PINS_LAYER_ID] : undefined}
      >
        <NavigationControl position="top-right" />
        <MapPinsLayer
          data={data}
          selectedFeature={selectedFeature}
          onClearSelect={clearSelection}
        />
        {children}
      </Map>
    </div>
  );
}
