/**
 * Demo GeoJSON for hackathon: sample research locations with titles and snippets.
 * Used when no live workflow data is available so the map always has pins.
 */

export type DemoFeatureProperties = {
  title: string;
  snippet?: string;
  articleUrl?: string;
  id?: string;
};

export type DemoGeoJSONFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: DemoFeatureProperties;
};

export type DemoFeatureCollection = {
  type: "FeatureCollection";
  features: DemoGeoJSONFeature[];
};

export const DEMO_RESEARCH_GEOJSON: DemoFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.6765, 45.5231] },
      properties: {
        id: "demo-1",
        title: "Portland Art Museum",
        snippet: "Research: Major museum in downtown Portland with rotating exhibits.",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.6819, 45.5122] },
      properties: {
        id: "demo-2",
        title: "Powell's City of Books",
        snippet: "Research: World's largest independent bookstore, a Portland landmark.",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.6587, 45.5302] },
      properties: {
        id: "demo-3",
        title: "Washington Park",
        snippet: "Research: Home to Oregon Zoo, Japanese Garden, and Hoyt Arboretum.",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.6764, 45.5152] },
      properties: {
        id: "demo-4",
        title: "Portland Saturday Market",
        snippet: "Research: Open-air arts and crafts market by the waterfront.",
      },
    },
  ],
};
