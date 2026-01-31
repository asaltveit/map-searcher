/**
 * Client-side tool schemas for research agent (search_stored_research, save_research)
 * and map agent (add_fill_layer, add_line_layer, add_circle_layer, add_symbol_layer, set_map_view).
 * Pass these in client_tools when calling Letta messages.create.
 */

export const researchClientTools = [
  {
    name: 'search_stored_research',
    description: 'Search stored research by query. Call this first before using web_search.',
    parameters: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Search query' } },
      required: ['query'],
    },
  },
  {
    name: 'save_research',
    description: 'Save a research finding with its source URL so it can be reused.',
    parameters: {
      type: 'object',
      properties: {
        content: { type: 'string', description: 'Content or summary' },
        source_url: { type: 'string', description: 'URL of the source' },
        title: { type: 'string', description: 'Optional title' },
      },
      required: ['content', 'source_url'],
    },
  },
];

export const mapClientTools = [
  {
    name: 'add_fill_layer',
    description: 'Add a fill layer for polygons/areas. Requires layerName for accessibility.',
    parameters: {
      type: 'object',
      properties: {
        sourceId: { type: 'string' },
        data: { type: 'object', description: 'GeoJSON' },
        layerId: { type: 'string' },
        layerName: { type: 'string', description: 'Human-readable name for screen readers' },
        'fill-color': { type: 'string' },
        'fill-opacity': { type: 'number' },
        'fill-outline-color': { type: 'string' },
      },
      required: ['sourceId', 'data', 'layerId', 'layerName'],
    },
  },
  {
    name: 'add_line_layer',
    description: 'Add a line layer for routes/boundaries. Requires layerName for accessibility.',
    parameters: {
      type: 'object',
      properties: {
        sourceId: { type: 'string' },
        data: { type: 'object' },
        layerId: { type: 'string' },
        layerName: { type: 'string' },
        'line-color': { type: 'string' },
        'line-width': { type: 'number' },
        'line-dasharray': { type: 'array', items: { type: 'number' } },
      },
      required: ['sourceId', 'data', 'layerId', 'layerName'],
    },
  },
  {
    name: 'add_circle_layer',
    description: 'Add a circle layer for points. Requires layerName for accessibility.',
    parameters: {
      type: 'object',
      properties: {
        sourceId: { type: 'string' },
        data: { type: 'object' },
        layerId: { type: 'string' },
        layerName: { type: 'string' },
        'circle-radius': { type: 'number' },
        'circle-color': { type: 'string' },
        'circle-stroke-width': { type: 'number' },
      },
      required: ['sourceId', 'data', 'layerId', 'layerName'],
    },
  },
  {
    name: 'add_symbol_layer',
    description: 'Add a symbol layer for labels/icons. Requires layerName for accessibility.',
    parameters: {
      type: 'object',
      properties: {
        sourceId: { type: 'string' },
        data: { type: 'object' },
        layerId: { type: 'string' },
        layerName: { type: 'string' },
        'text-field': { type: 'string' },
        'icon-image': { type: 'string' },
        'text-size': { type: 'number' },
      },
      required: ['sourceId', 'data', 'layerId', 'layerName'],
    },
  },
  {
    name: 'set_map_view',
    description: 'Set map center and zoom.',
    parameters: {
      type: 'object',
      properties: {
        center: { type: 'array', items: { type: 'number' }, description: '[lng, lat]' },
        zoom: { type: 'number' },
      },
      required: ['center', 'zoom'],
    },
  },
];
