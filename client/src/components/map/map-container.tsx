'use client';

import { forwardRef, useState, useCallback } from 'react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import type { MapRef, MapLayerMouseEvent, ViewStateChangeEvent } from 'react-map-gl/maplibre';
// Relative path avoids Turbopack "server relative imports" error when aliasing maplibre-gl
import '../../../node_modules/maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { DEFAULT_VIEW_STATE, MAP_STYLES } from '@/lib/map-config';
import { MapPinsLayer, PINS_LAYER_ID, type PinsSelectedFeature } from './map-pins-layer';
import { DEMO_RESEARCH_GEOJSON } from '@/data/demo-research-geojson';

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface MapContainerProps {
  className?: string;
  children?: React.ReactNode;
  /** GeoJSON to show (from map agent or demo). When null/undefined, uses demo data. */
  pinsData?: GeoJSON.FeatureCollection | null;
  initialViewState?: ViewState;
  interactiveLayerIds?: string[];
  onLayerClick?: (event: MapLayerMouseEvent) => void;
  onMove?: (event: ViewStateChangeEvent) => void;
  cursor?: string;
}

export const MapContainer = forwardRef<MapRef, MapContainerProps>(function MapContainer(
  {
    className,
    children,
    pinsData,
    initialViewState,
    interactiveLayerIds,
    onLayerClick,
    onMove,
    cursor,
  },
  ref
) {
  const [selectedFeature, setSelectedFeature] = useState<PinsSelectedFeature | null>(null);

  const data = pinsData ?? DEMO_RESEARCH_GEOJSON;
  const hasPins = data.features.length > 0;

  const handleMapClick = useCallback(
    (ev: MapLayerMouseEvent) => {
      // If external handler provided, call it
      if (onLayerClick && ev.features && ev.features.length > 0) {
        onLayerClick(ev);
      }

      // Internal pin selection logic
      const f = ev.features?.[0];
      if (!f || f.geometry?.type !== 'Point') {
        setSelectedFeature(null);
        return;
      }
      setSelectedFeature({
        feature: f as GeoJSON.Feature<GeoJSON.Point>,
        lngLat: [ev.lngLat.lng, ev.lngLat.lat],
      });
    },
    [onLayerClick]
  );

  const clearSelection = useCallback(() => setSelectedFeature(null), []);

  // Combine internal and external interactive layer IDs
  const allInteractiveLayerIds = [
    ...(hasPins ? [PINS_LAYER_ID] : []),
    ...(interactiveLayerIds || []),
  ];

  return (
    <div
      className={cn("relative border-border", className)}
      role="application"
      aria-label="Interactive map of research locations"
    >
      <Map
        ref={ref}
        initialViewState={initialViewState || DEFAULT_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLES.liberty}
        onClick={handleMapClick}
        onMove={onMove}
        cursor={cursor || (hasPins ? 'pointer' : undefined)}
        interactiveLayerIds={allInteractiveLayerIds.length > 0 ? allInteractiveLayerIds : undefined}
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
});
