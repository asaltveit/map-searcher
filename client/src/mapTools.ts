/**
 * Execute map client tools on a MapLibre map instance.
 * Validates inputs (allowlist layerType, bounds-check center/zoom) and updates aria-live with layerName.
 */
import type { Map as MapLibreMap } from 'maplibre-gl';

const VALID_LAYER_TYPES = ['fill', 'line', 'circle', 'symbol'] as const;
const ZOOM_MIN = 0;
const ZOOM_MAX = 22;
const LAT_MIN = -90;
const LAT_MAX = 90;
const LNG_MIN = -180;
const LNG_MAX = 180;

export type MapAnnouncer = (message: string) => void;

function safeNumber(n: unknown, fallback: number): number {
  if (typeof n === 'number' && Number.isFinite(n)) return n;
  return fallback;
}

function safeArray(arr: unknown): number[] {
  if (!Array.isArray(arr) || arr.length < 2) return [0, 0];
  const a = Number(arr[0]);
  const b = Number(arr[1]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return [0, 0];
  return [Math.max(LNG_MIN, Math.min(LNG_MAX, a)), Math.max(LAT_MIN, Math.min(LAT_MAX, b))];
}

function safePaint(obj: unknown): Record<string, unknown> | undefined {
  if (obj == null || typeof obj !== 'object') return undefined;
  const out: Record<string, unknown> = {};
  const allowed = new Set([
    'fill-color', 'fill-opacity', 'fill-outline-color',
    'line-color', 'line-width', 'line-dasharray',
    'circle-radius', 'circle-color', 'circle-stroke-width',
    'text-field', 'icon-image', 'text-size',
  ]);
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (allowed.has(k)) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

export function executeMapTool(
  map: MapLibreMap,
  toolName: string,
  args: Record<string, unknown>,
  announce: MapAnnouncer
): { tool_return: string; status: 'success' | 'error' } {
  try {
    if (toolName === 'set_map_view') {
      const center = safeArray(args.center);
      const zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, safeNumber(args.zoom, 10)));
      map.flyTo({ center: center as [number, number], zoom });
      announce(`Map view set to center ${center[0].toFixed(2)}, ${center[1].toFixed(2)}, zoom ${zoom}`);
      return { tool_return: 'View updated.', status: 'success' };
    }

    const sourceId = String(args.sourceId ?? '').slice(0, 128);
    const layerId = String(args.layerId ?? '').slice(0, 128);
    const layerName = String(args.layerName ?? 'Layer').slice(0, 256);
    const data = args.data;

    if (!sourceId || !layerId || !layerName) {
      return { tool_return: 'sourceId, layerId, and layerName are required.', status: 'error' };
    }

    const typeMap: Record<string, 'fill' | 'line' | 'circle' | 'symbol'> = {
      add_fill_layer: 'fill',
      add_line_layer: 'line',
      add_circle_layer: 'circle',
      add_symbol_layer: 'symbol',
    };
    const type = typeMap[toolName];
    if (!type || !VALID_LAYER_TYPES.includes(type)) {
      return { tool_return: `Unknown layer type for ${toolName}.`, status: 'error' };
    }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
        type: 'geojson',
        data: data && typeof data === 'object' ? (data as GeoJSON.GeoJSON) : { type: 'FeatureCollection', features: [] },
      });
    } else {
      const src = map.getSource(sourceId) as { setData?: (d: GeoJSON.GeoJSON) => void };
      if (src.setData && data && typeof data === 'object') {
        src.setData(data as GeoJSON.GeoJSON);
      }
    }

    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }

    const paint = safePaint(args.paint) ?? {};
    const layout = args.layout && typeof args.layout === 'object' ? (args.layout as Record<string, unknown>) : {};
    map.addLayer({
      id: layerId,
      type,
      source: sourceId,
      paint: paint as Record<string, unknown>,
      layout: layout as Record<string, unknown>,
    });

    announce(`Layer "${layerName}" added.`);
    return { tool_return: `Layer "${layerName}" added.`, status: 'success' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    announce(`Error: ${msg}`);
    return { tool_return: msg, status: 'error' };
  }
}
