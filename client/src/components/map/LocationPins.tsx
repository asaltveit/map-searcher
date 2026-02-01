'use client';

import { useState, useCallback } from 'react';
import { Source, Layer, Popup } from 'react-map-gl/maplibre';
import type { GeoJsonFeatureCollection, GeoJsonFeature } from '@/lib/api';
import type { MapLayerMouseEvent } from 'maplibre-gl';

interface LocationPinsProps {
  data: GeoJsonFeatureCollection;
  onFeatureClick?: (feature: GeoJsonFeature) => void;
}

const layerStyle = {
  id: 'alert-locations',
  type: 'circle' as const,
  paint: {
    'circle-radius': 8,
    'circle-color': '#ef4444', // red-500
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff',
    'circle-opacity': 0.9,
  },
};

const layerHoverStyle = {
  id: 'alert-locations-hover',
  type: 'circle' as const,
  paint: {
    'circle-radius': 12,
    'circle-color': '#dc2626', // red-600
    'circle-stroke-width': 3,
    'circle-stroke-color': '#ffffff',
    'circle-opacity': 1,
  },
  filter: ['==', ['get', 'locationId'], ''],
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function LocationPins({ data, onFeatureClick }: LocationPinsProps) {
  console.log(`[PINS] LocationPins RENDER - featureCount=${data.features.length}`);
  if (data.features.length === 0) {
    console.warn(`[PINS] LocationPins WARNING - NO FEATURES! Map will be empty.`);
  } else {
    console.log(`[PINS] LocationPins SAMPLE FEATURES:`, data.features.slice(0, 3).map(f => ({ mention: f.properties.mention, coords: f.geometry.coordinates })));
  }

  const [popupInfo, setPopupInfo] = useState<GeoJsonFeature | null>(null);
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      console.log(`[PINS] onClick - feature clicked:`, feature?.properties?.mention);
      if (feature && feature.geometry.type === 'Point') {
        const props = feature.properties as GeoJsonFeature['properties'];
        const geoJsonFeature: GeoJsonFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: (feature.geometry as GeoJSON.Point).coordinates as [number, number],
          },
          properties: props,
        };
        console.log(`[PINS] onClick SHOWING popup for:`, props.mention);
        setPopupInfo(geoJsonFeature);
        onFeatureClick?.(geoJsonFeature);
      }
    },
    [onFeatureClick]
  );

  const onMouseEnter = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    console.log(`[PINS] onMouseEnter - locationId=${feature?.properties?.locationId}`);
    if (feature) {
      setHoverInfo(feature.properties?.locationId || null);
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    console.log(`[PINS] onMouseLeave`);
    setHoverInfo(null);
  }, []);

  // Create hover filter
  const hoverFilter = hoverInfo
    ? ['==', ['get', 'locationId'], hoverInfo]
    : ['==', ['get', 'locationId'], ''];

  return (
    <>
      <Source id="alert-locations" type="geojson" data={data}>
        <Layer
          {...layerStyle}
          beforeId={undefined}
        />
        <Layer
          {...layerHoverStyle}
          filter={hoverFilter as unknown as undefined}
        />
      </Source>

      {popupInfo && (
        <Popup
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
          className="location-popup"
        >
          <div className="p-2 max-w-xs">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {popupInfo.properties.articleTitle}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
              {popupInfo.properties.mention}
            </p>
            {popupInfo.properties.formattedAddress && (
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-2">
                {popupInfo.properties.formattedAddress}
              </p>
            )}
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">
                {formatDate(popupInfo.properties.publishedAt)}
              </span>
              <a
                href={popupInfo.properties.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read article
              </a>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

// Export the interactiveLayerIds for the map
export const LOCATION_PINS_LAYER_IDS = ['alert-locations'];
