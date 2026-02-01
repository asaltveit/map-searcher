(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/map-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_VIEW_STATE",
    ()=>DEFAULT_VIEW_STATE,
    "MAP_STYLES",
    ()=>MAP_STYLES
]);
const DEFAULT_VIEW_STATE = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4
};
const MAP_STYLES = {
    liberty: 'https://tiles.openfreemap.org/styles/liberty'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPinsLayer",
    ()=>MapPinsLayer,
    "PINS_LAYER_ID",
    ()=>PINS_LAYER_ID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/react-map-gl/dist/maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const PINS_LAYER_ID = 'research-pins';
const PINS_SOURCE_ID = 'research-pins-source';
const circleLayerStyle = {
    id: PINS_LAYER_ID,
    type: 'circle',
    source: PINS_SOURCE_ID,
    paint: {
        'circle-radius': 10,
        'circle-color': '#0d9488',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
    }
};
function getBounds(features) {
    if (features.length === 0) return null;
    let minLng = Infinity;
    let minLat = Infinity;
    let maxLng = -Infinity;
    let maxLat = -Infinity;
    for (const f of features){
        const coords = f.geometry?.coordinates;
        if (!coords || coords.length < 2) continue;
        const [lng, lat] = coords;
        minLng = Math.min(minLng, lng);
        minLat = Math.min(minLat, lat);
        maxLng = Math.max(maxLng, lng);
        maxLat = Math.max(maxLat, lat);
    }
    return [
        [
            minLng,
            minLat
        ],
        [
            maxLng,
            maxLat
        ]
    ];
}
function MapPinsLayer({ data, selectedFeature, onClearSelect }) {
    _s();
    const fitDoneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const features = data?.features ?? [];
    const hasFeatures = features.length > 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPinsLayer.useEffect": ()=>{
            if (!hasFeatures || fitDoneRef.current) return;
            const map = mapRef?.current?.getMap?.();
            if (!map) return;
            const bounds = getBounds(features);
            if (!bounds) return;
            const padding = 40;
            const duration = ("TURBOPACK compile-time value", "object") !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 600;
            map.fitBounds(bounds, {
                padding,
                duration
            });
            fitDoneRef.current = true;
        }
    }["MapPinsLayer.useEffect"], [
        hasFeatures,
        features,
        mapRef
    ]);
    if (!data || data.features.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Source"], {
                id: PINS_SOURCE_ID,
                type: "geojson",
                data: data,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                    ...circleLayerStyle
                }, void 0, false, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            selectedFeature && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                longitude: selectedFeature.lngLat[0],
                latitude: selectedFeature.lngLat[1],
                onClose: onClearSelect,
                closeButton: true,
                closeOnClick: false,
                anchor: "bottom",
                className: "map-pin-popup",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-[180px] max-w-[280px] text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-foreground",
                            children: selectedFeature.feature.properties?.title ?? 'Location'
                        }, void 0, false, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        selectedFeature.feature.properties?.snippet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-muted-foreground",
                            children: selectedFeature.feature.properties.snippet
                        }, void 0, false, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(MapPinsLayer, "o097fENQNtZNrEWuaBXKiOemsK0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = MapPinsLayer;
var _c;
__turbopack_context__.k.register(_c, "MapPinsLayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/data/demo-research-geojson.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Demo GeoJSON for hackathon: sample research locations with titles and snippets.
 * Used when no live workflow data is available so the map always has pins.
 */ __turbopack_context__.s([
    "DEMO_RESEARCH_GEOJSON",
    ()=>DEMO_RESEARCH_GEOJSON
]);
const DEMO_RESEARCH_GEOJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    -122.6765,
                    45.5231
                ]
            },
            properties: {
                id: "demo-1",
                title: "Portland Art Museum",
                snippet: "Research: Major museum in downtown Portland with rotating exhibits."
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    -122.6819,
                    45.5122
                ]
            },
            properties: {
                id: "demo-2",
                title: "Powell's City of Books",
                snippet: "Research: World's largest independent bookstore, a Portland landmark."
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    -122.6587,
                    45.5302
                ]
            },
            properties: {
                id: "demo-3",
                title: "Washington Park",
                snippet: "Research: Home to Oregon Zoo, Japanese Garden, and Hoyt Arboretum."
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    -122.6764,
                    45.5152
                ]
            },
            properties: {
                id: "demo-4",
                title: "Portland Saturday Market",
                snippet: "Research: Open-air arts and crafts market by the waterfront."
            }
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapContainer",
    ()=>MapContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/react-map-gl/dist/maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Map__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript) <export Map as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$map$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/map-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$map$2d$pins$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-pins-layer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$data$2f$demo$2d$research$2d$geojson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/data/demo-research-geojson.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function MapContainer({ className, children, pinsData }) {
    _s();
    const [selectedFeature, setSelectedFeature] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const data = pinsData ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$data$2f$demo$2d$research$2d$geojson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_RESEARCH_GEOJSON"];
    const hasPins = data.features.length > 0;
    const handleMapClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[handleMapClick]": (ev)=>{
            const f = ev.features?.[0];
            if (!f || f.geometry?.type !== 'Point') {
                setSelectedFeature(null);
                return;
            }
            const coords = f.geometry.coordinates;
            setSelectedFeature({
                feature: f,
                lngLat: [
                    ev.lngLat.lng,
                    ev.lngLat.lat
                ]
            });
        }
    }["MapContainer.useCallback[handleMapClick]"], []);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.useCallback[clearSelection]": ()=>setSelectedFeature(null)
    }["MapContainer.useCallback[clearSelection]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative border-border", className),
        role: "application",
        "aria-label": "Interactive map of research locations",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Map__as__default$3e$__["default"], {
            initialViewState: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$map$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VIEW_STATE"],
            style: {
                width: '100%',
                height: '100%'
            },
            mapStyle: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$map$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_STYLES"].liberty,
            onClick: handleMapClick,
            cursor: hasPins ? 'pointer' : undefined,
            interactiveLayerIds: hasPins ? [
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$map$2d$pins$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PINS_LAYER_ID"]
            ] : undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavigationControl"], {
                    position: "top-right"
                }, void 0, false, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$map$2d$pins$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapPinsLayer"], {
                    data: data,
                    selectedFeature: selectedFeature,
                    onClearSelect: clearSelection
                }, void 0, false, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(MapContainer, "D1nnCMyWA7o83sllZI/eMGqDcgY=");
_c = MapContainer;
var _c;
__turbopack_context__.k.register(_c, "MapContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$map$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechRecognition",
    ()=>useSpeechRecognition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function getSpeechRecognition() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}
function useSpeechRecognition(options) {
    _s();
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [interimTranscript, setInterimTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Defer support check to useEffect so server and first client render match (avoid hydration mismatch)
    const [isSupported, setIsSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onResultRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(options?.onResult);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSpeechRecognition.useEffect": ()=>{
            setIsSupported(!!getSpeechRecognition());
        }
    }["useSpeechRecognition.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSpeechRecognition.useEffect": ()=>{
            onResultRef.current = options?.onResult;
        }
    }["useSpeechRecognition.useEffect"], [
        options?.onResult
    ]);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechRecognition.useCallback[start]": ()=>{
            const SR = getSpeechRecognition();
            if (!SR) {
                setError("Speech recognition is not supported in this browser.");
                return;
            }
            setError(null);
            setTranscript("");
            setInterimTranscript("");
            const recognition = new SR();
            recognition.continuous = options?.continuous ?? true;
            recognition.lang = options?.lang ?? "en-US";
            recognition.interimResults = true;
            recognition.onresult = ({
                "useSpeechRecognition.useCallback[start]": (event)=>{
                    let interim = "";
                    let final = "";
                    for(let i = event.resultIndex; i < event.results.length; i++){
                        const result = event.results[i];
                        const text = result[0].transcript;
                        if (result.isFinal) {
                            final += text;
                        } else {
                            interim += text;
                        }
                    }
                    if (interim) setInterimTranscript(interim);
                    if (final) {
                        setTranscript({
                            "useSpeechRecognition.useCallback[start]": (prev)=>(prev + final).trim()
                        }["useSpeechRecognition.useCallback[start]"]);
                        setInterimTranscript("");
                        onResultRef.current?.(final, true);
                    }
                }
            })["useSpeechRecognition.useCallback[start]"];
            recognition.onerror = ({
                "useSpeechRecognition.useCallback[start]": (event)=>{
                    if (event.error === "not-allowed") {
                        setError("Microphone access was denied.");
                    } else if (event.error === "no-speech") {
                        setError("No speech detected. Try again.");
                    } else {
                        setError(event.error || "Speech recognition error.");
                    }
                    setIsListening(false);
                }
            })["useSpeechRecognition.useCallback[start]"];
            recognition.onend = ({
                "useSpeechRecognition.useCallback[start]": ()=>{
                    setIsListening(false);
                }
            })["useSpeechRecognition.useCallback[start]"];
            recognition.start();
            recognitionRef.current = recognition;
            setIsListening(true);
        }
    }["useSpeechRecognition.useCallback[start]"], [
        options?.continuous,
        options?.lang
    ]);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechRecognition.useCallback[stop]": ()=>{
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
            setIsListening(false);
        }
    }["useSpeechRecognition.useCallback[stop]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechRecognition.useCallback[reset]": ()=>{
            setTranscript("");
            setInterimTranscript("");
            setError(null);
        }
    }["useSpeechRecognition.useCallback[reset]"], []);
    return {
        isSupported,
        isListening,
        transcript,
        interimTranscript,
        error,
        start,
        stop,
        reset
    };
}
_s(useSpeechRecognition, "3TGW9irfc4Riovj5dVslr1ccYd0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/hooks/useSpeechSynthesis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechSynthesis",
    ()=>useSpeechSynthesis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useSpeechSynthesis(options) {
    _s();
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useSpeechSynthesis.useState": ()=>("TURBOPACK compile-time value", "object") !== "undefined" && "speechSynthesis" in window
    }["useSpeechSynthesis.useState"]);
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechSynthesis.useCallback[speak]": (text)=>{
            if (("TURBOPACK compile-time value", "object") === "undefined" || !window.speechSynthesis) return;
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = options?.lang ?? "en-US";
            utterance.rate = options?.rate ?? 1;
            utterance.pitch = options?.pitch ?? 1;
            utterance.onstart = ({
                "useSpeechSynthesis.useCallback[speak]": ()=>setIsSpeaking(true)
            })["useSpeechSynthesis.useCallback[speak]"];
            utterance.onend = ({
                "useSpeechSynthesis.useCallback[speak]": ()=>setIsSpeaking(false)
            })["useSpeechSynthesis.useCallback[speak]"];
            utterance.onerror = ({
                "useSpeechSynthesis.useCallback[speak]": ()=>setIsSpeaking(false)
            })["useSpeechSynthesis.useCallback[speak]"];
            window.speechSynthesis.speak(utterance);
        }
    }["useSpeechSynthesis.useCallback[speak]"], [
        options?.lang,
        options?.rate,
        options?.pitch
    ]);
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechSynthesis.useCallback[cancel]": ()=>{
            if (("TURBOPACK compile-time value", "object") !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
        }
    }["useSpeechSynthesis.useCallback[cancel]"], []);
    return {
        isSupported,
        isSpeaking,
        speak,
        cancel
    };
}
_s(useSpeechSynthesis, "/4vS8eeJ5GEJ/gLrWzYFnJWfypQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/button.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceSection",
    ()=>VoiceSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$hooks$2f$useSpeechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/hooks/useSpeechSynthesis.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// Cast for React 19 + lucide-react type compatibility
const iconProps = {
    className: "size-4",
    "aria-hidden": true
};
const MicIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
        ...iconProps
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
        lineNumber: 15,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0));
_c = MicIcon;
const MicOffIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
        ...iconProps
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
        lineNumber: 16,
        columnNumber: 26
    }, ("TURBOPACK compile-time value", void 0));
_c1 = MicOffIcon;
const Volume2Icon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
        ...iconProps
    }, void 0, false, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
        lineNumber: 17,
        columnNumber: 27
    }, ("TURBOPACK compile-time value", void 0));
_c2 = Volume2Icon;
function VoiceSection({ onTranscript, textToSpeak, className }) {
    _s();
    const [speakInput, setSpeakInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { speak: speakText } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$hooks$2f$useSpeechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechSynthesis"])();
    const { isSupported: sttSupported, isListening, transcript, interimTranscript, error: sttError, start, stop, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"])({
        continuous: true
    });
    const handleToggleMic = ()=>{
        if (isListening) {
            stop();
            const full = (transcript + " " + interimTranscript).trim();
            if (full && onTranscript) onTranscript(full);
        } else {
            reset();
            start();
        }
    };
    const handleSpeakInput = ()=>{
        const t = speakInput.trim() || textToSpeak;
        if (t) speakText(t);
    };
    const displayTranscript = (transcript + " " + interimTranscript).trim() || "—";
    // Unknown support (server + first client render): render same structure as supported so hydration matches
    if (sttSupported === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border-border/80 shadow-sm", className),
            role: "region",
            "aria-labelledby": "voice-section-title",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    className: "pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            id: "voice-section-title",
                            className: "text-base font-medium text-foreground",
                            children: "Voice input"
                        }, void 0, false, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "text-sm",
                            children: "Speak your query or hear findings read aloud."
                        }, void 0, false, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2 sm:flex-nowrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "default",
                                            size: "icon",
                                            className: "min-h-[44px] min-w-[44px] touch-manipulation sm:min-h-0 sm:min-w-0",
                                            disabled: true,
                                            "aria-label": "Start listening",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MicIcon, {}, void 0, false, {
                                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                                lineNumber: 75,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-muted-foreground",
                                            children: "Loading…"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-h-10 rounded-lg border border-input bg-background/50 px-3 py-2 text-sm",
                                    role: "status",
                                    "aria-live": "polite",
                                    "aria-label": "Live transcript",
                                    children: "—"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "voice-speak-input",
                                    className: "text-sm font-medium",
                                    children: "Text to speak"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2 sm:flex-nowrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "voice-speak-input",
                                            type: "text",
                                            placeholder: "Enter text to hear it read aloud",
                                            disabled: true,
                                            className: "min-h-[44px] flex-1 touch-manipulation"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            size: "icon",
                                            className: "min-h-[44px] min-w-[44px] shrink-0 touch-manipulation sm:min-h-0 sm:min-w-0",
                                            disabled: true,
                                            "aria-label": "Speak",
                                            children: [
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Volume2Icon, {}, void 0, false, {
                                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 184
                                                }, this),
                                                " "
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this);
    }
    if (!sttSupported) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border-border/80 shadow-sm", className),
            role: "region",
            "aria-labelledby": "voice-section-title",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        id: "voice-section-title",
                        className: "text-base font-medium text-foreground",
                        children: "Voice input"
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                        children: "Speech recognition is not supported in this browser. Try Chrome or Edge."
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border-border/80 shadow-sm", className),
        role: "region",
        "aria-labelledby": "voice-section-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        id: "voice-section-title",
                        className: "text-base font-medium text-foreground",
                        children: "Voice input"
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                        className: "text-sm",
                        children: "Speak your query or hear findings read aloud."
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2 sm:flex-nowrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: isListening ? "destructive" : "default",
                                        size: "icon",
                                        className: "min-h-[44px] min-w-[44px] touch-manipulation sm:min-h-0 sm:min-w-0",
                                        onClick: handleToggleMic,
                                        "aria-label": isListening ? "Stop listening" : "Start listening",
                                        "aria-pressed": isListening,
                                        children: isListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MicOffIcon, {}, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 129,
                                            columnNumber: 30
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MicIcon, {}, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 129,
                                            columnNumber: 47
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-muted-foreground",
                                        children: isListening ? "Listening… tap mic to stop and send" : "Tap mic to speak your question"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-h-10 rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-muted-foreground",
                                role: "status",
                                "aria-live": "polite",
                                "aria-atomic": "false",
                                "aria-label": "Live transcript",
                                children: displayTranscript
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            sttError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-destructive",
                                role: "alert",
                                children: sttError
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "voice-speak-input",
                                className: "text-sm font-medium",
                                children: "Hear findings aloud"
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 sm:flex-nowrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "voice-speak-input",
                                        type: "text",
                                        placeholder: textToSpeak ? "Or type here…" : "Enter text to hear it read aloud",
                                        value: speakInput,
                                        onChange: (e)=>setSpeakInput(e.target.value),
                                        onKeyDown: (e)=>e.key === "Enter" && handleSpeakInput(),
                                        className: "min-h-[44px] flex-1 touch-manipulation"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        size: "icon",
                                        className: "min-h-[44px] min-w-[44px] shrink-0 touch-manipulation sm:min-h-0 sm:min-w-0",
                                        onClick: handleSpeakInput,
                                        "aria-label": "Speak the text",
                                        disabled: !speakInput.trim() && !textToSpeak,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Volume2Icon, {}, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            textToSpeak && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "secondary",
                                size: "sm",
                                onClick: ()=>speakText(textToSpeak),
                                className: "min-h-[44px] w-full touch-manipulation",
                                children: "Speak last findings"
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(VoiceSection, "DsM0Pzenbqi2hKHbhjc8hg9DIK0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$hooks$2f$useSpeechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechSynthesis"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"]
    ];
});
_c3 = VoiceSection;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MicIcon");
__turbopack_context__.k.register(_c1, "MicOffIcon");
__turbopack_context__.k.register(_c2, "Volume2Icon");
__turbopack_context__.k.register(_c3, "VoiceSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAgents",
    ()=>getAgents,
    "getLastAssistantContent",
    ()=>getLastAssistantContent,
    "getMapState",
    ()=>getMapState,
    "sendAgentMessage",
    ()=>sendAgentMessage,
    "updateResearchBlock",
    ()=>updateResearchBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Client API for the backend (server-nest by default).
 * Set NEXT_PUBLIC_API_URL in production (e.g. https://api.example.com).
 * In dev, when the client runs on port 3000, defaults to http://localhost:3001 (run server-nest with PORT=3001).
 */ function getBase() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const env = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL;
    if (env) return env.replace(/\/$/, "");
    return window.location.port === "3000" ? "http://localhost:3001" : "";
}
async function getAgents() {
    const res = await fetch(`${getBase()}/api/workflow/agents`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function sendAgentMessage(agentId, content) {
    const res = await fetch(`${getBase()}/api/workflow/send-message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            agentId,
            content
        })
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function updateResearchBlock(researchBlockId, value) {
    const res = await fetch(`${getBase()}/api/workflow/update-block`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            researchBlockId,
            value
        })
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
}
function getLastAssistantContent(response) {
    const r = response;
    const messages = r?.messages ?? r?.steps;
    if (Array.isArray(messages)) {
        for(let i = messages.length - 1; i >= 0; i--){
            const m = messages[i];
            if (m?.role === "assistant" && typeof m?.content === "string") return m.content;
        }
    }
    const content = r?.content ?? r?.output;
    if (typeof content === "string") return content;
    return "";
}
async function getMapState() {
    const res = await fetch(`${getBase()}/api/workflow/map-state`, {
        credentials: "include"
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.geoJson?.type || data.geoJson.type !== "FeatureCollection") return null;
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentInput",
    ()=>AgentInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$voice$2f$VoiceSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/voice/VoiceSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const MAP_PROMPT = "Update the map using the research in your context. Add layers for any places or routes mentioned.";
function AgentInput({ className, onAfterMapAgentResponse }) {
    _s();
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [askInput, setAskInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastResponse, setLastResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const ensureAgents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AgentInput.useCallback[ensureAgents]": async ()=>{
            if (agents) return agents;
            const ids = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgents"])();
            setAgents(ids);
            return ids;
        }
    }["AgentInput.useCallback[ensureAgents]"], [
        agents
    ]);
    const submitMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AgentInput.useCallback[submitMessage]": async (userText)=>{
            const text = userText.trim();
            if (!text) return;
            setLoading(true);
            setError(null);
            setLastResponse("");
            try {
                const ids = await ensureAgents();
                const researchResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendAgentMessage"])(ids.researchAgentId, text);
                const researchContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastAssistantContent"])(researchResponse);
                if (researchContent) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateResearchBlock"])(ids.researchBlockId, researchContent);
                    const mapResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendAgentMessage"])(ids.mapAgentId, MAP_PROMPT);
                    const mapContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastAssistantContent"])(mapResponse);
                    setLastResponse(mapContent || researchContent);
                    await onAfterMapAgentResponse?.();
                } else {
                    setLastResponse((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastAssistantContent"])(researchResponse) || "No reply from research agent.");
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally{
                setLoading(false);
            }
        }
    }["AgentInput.useCallback[submitMessage]"], [
        ensureAgents,
        onAfterMapAgentResponse
    ]);
    const handleAskSubmit = ()=>{
        submitMessage(askInput);
        setAskInput("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("space-y-6", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                "aria-label": "Research query",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "ask-input",
                        className: "sr-only",
                        children: "Ask a research question"
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 sm:flex-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "ask-input",
                                        type: "text",
                                        placeholder: "Search events, places, or ask a question…",
                                        value: askInput,
                                        onChange: (e)=>setAskInput(e.target.value),
                                        onKeyDown: (e)=>e.key === "Enter" && handleAskSubmit(),
                                        disabled: loading,
                                        className: "min-h-[48px] touch-manipulation pl-9 text-base shadow-sm sm:min-h-[52px] sm:pl-10 sm:text-base",
                                        "aria-describedby": "ask-hint"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: handleAskSubmit,
                                disabled: loading || !askInput.trim(),
                                className: "min-h-[48px] shrink-0 touch-manipulation px-5 sm:min-h-[52px]",
                                children: loading ? "Researching…" : "Research"
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "ask-hint",
                        className: "text-xs text-muted-foreground",
                        children: "Or use the mic below to speak your request."
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this),
            lastResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5 sm:py-5",
                "aria-label": "Findings",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex items-center gap-2 text-sm font-medium text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "size-4 shrink-0 text-muted-foreground",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            "Findings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground/90",
                        children: lastResponse
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$voice$2f$VoiceSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceSection"], {
                onTranscript: submitMessage,
                textToSpeak: lastResponse || undefined,
                className: "w-full max-w-xl border-border/80 bg-muted/30"
            }, void 0, false, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(AgentInput, "s9uQvD2YX/lZzA3b/Z8dJscAGK0=");
_c = AgentInput;
var _c;
__turbopack_context__.k.register(_c, "AgentInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResearchMapPage",
    ()=>ResearchMapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$map$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/map/map-container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$AgentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/AgentInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$data$2f$demo$2d$research$2d$geojson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/src/data/demo-research-geojson.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Documents/projects/tech-competitions/weave-hacks/client/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ResearchMapPage() {
    _s();
    const [mapState, setMapState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResearchMapPage.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMapState"])().then({
                "ResearchMapPage.useEffect": (s)=>s?.geoJson && setMapState(s.geoJson)
            }["ResearchMapPage.useEffect"]).catch({
                "ResearchMapPage.useEffect": ()=>{}
            }["ResearchMapPage.useEffect"]);
        }
    }["ResearchMapPage.useEffect"], []);
    const onAfterMapAgentResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ResearchMapPage.useCallback[onAfterMapAgentResponse]": async ()=>{
            const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMapState"])();
            if (s?.geoJson) setMapState(s.geoJson);
        }
    }["ResearchMapPage.useCallback[onAfterMapAgentResponse]"], []);
    const pinsData = mapState ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$data$2f$demo$2d$research$2d$geojson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_RESEARCH_GEOJSON"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen min-h-[100dvh] flex-col bg-background font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-10 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl",
                                    children: "Pulse"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:inline",
                                    children: "Research"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative flex h-1.5 w-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                "Live research"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main-content",
                className: "mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8",
                "aria-label": "Main content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-6 sm:mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
                                children: "Current events, researched and mapped"
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1.5 max-w-xl text-sm text-muted-foreground sm:text-base",
                                children: "Ask about places, routes, or events in plain language. Results are researched and plotted on the map below."
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$AgentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgentInput"], {
                        onAfterMapAgentResponse: onAfterMapAgentResponse
                    }, void 0, false, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-6 sm:mt-8",
                        "aria-label": "Research map",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center gap-2 text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "size-4 shrink-0",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Findings on map"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$projects$2f$tech$2d$competitions$2f$weave$2d$hacks$2f$client$2f$src$2f$components$2f$map$2f$map$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                                className: "h-[320px] w-full min-h-[260px] rounded-xl border border-border overflow-hidden shadow-sm sm:h-[420px] sm:min-h-[340px]",
                                pinsData: pinsData
                            }, void 0, false, {
                                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/projects/tech-competitions/weave-hacks/client/src/components/ResearchMapPage.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(ResearchMapPage, "8wbmvcFMm3yZZj364h8fDqxvgN4=");
_c = ResearchMapPage;
var _c;
__turbopack_context__.k.register(_c, "ResearchMapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_projects_tech-competitions_weave-hacks_client_src_b06e696f._.js.map