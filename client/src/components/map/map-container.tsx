'use client';

import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { DEFAULT_VIEW_STATE, MAP_STYLES } from '@/lib/map-config';

interface MapContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function MapContainer({ className, children }: MapContainerProps) {
  return (
    <div className={cn('relative', className)}>
      <Map
        initialViewState={DEFAULT_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLES.liberty}
      >
        <NavigationControl position="top-right" />
        {children}
      </Map>
    </div>
  );
}
