import { useEffect, useRef, useCallback, useState } from 'react';
import maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap } from 'maplibre-gl';

const STYLE_URL = 'https://demotiles.maplibre.org/style.json';
const DEFAULT_CENTER: [number, number] = [-122.6765, 45.5231];
const DEFAULT_ZOOM = 10;

type MapViewProps = {
  onMapReady: (map: MapLibreMap) => void;
  announceRef: React.MutableRefObject<((msg: string) => void) | null>;
};

export function MapView({ onMapReady, announceRef }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [liveMessage, setLiveMessage] = useState('');

  const announce = useCallback((msg: string) => {
    setLiveMessage(msg);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;
    onMapReady(map);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onMapReady]);

  useEffect(() => {
    announceRef.current = announce;
    return () => {
      announceRef.current = null;
    };
  }, [announce, announceRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const map = mapRef.current;
      if (!map) return;
      const panPixels = 80;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          map.panBy([panPixels, 0]);
          announce('Map panned left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          map.panBy([-panPixels, 0]);
          announce('Map panned right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          map.panBy([0, panPixels]);
          announce('Map panned up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          map.panBy([0, -panPixels]);
          announce('Map panned down');
          break;
        case '+':
        case '=':
          e.preventDefault();
          map.zoomIn();
          announce('Map zoomed in');
          break;
        case '-':
          e.preventDefault();
          map.zoomOut();
          announce('Map zoomed out');
          break;
        default:
          break;
      }
    },
    [announce]
  );

  return (
    <section aria-label="Map of search results" className="map-section">
      <p className="map-keyboard-hint" id="map-keyboard-hint">
        Map: focus then use arrow keys to pan, plus/minus to zoom.
      </p>
      <div
        ref={containerRef}
        className="map-container"
        role="region"
        aria-label="Map of search results"
        aria-describedby="map-keyboard-hint"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', height: '400px' }}
      />
      <div
        role="status"
        aria-live="polite"
        aria-atomic
        className="map-live-region"
      >
        {liveMessage}
      </div>
    </section>
  );
}
