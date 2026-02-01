(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/lib/map-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPinsLayer",
    ()=>MapPinsLayer,
    "PINS_LAYER_ID",
    ()=>PINS_LAYER_ID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/react-map-gl/dist/maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)");
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
    const fitDoneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const features = data?.features ?? [];
    const hasFeatures = features.length > 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Source"], {
                id: PINS_SOURCE_ID,
                type: "geojson",
                data: data,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                    ...circleLayerStyle
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            selectedFeature && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                longitude: selectedFeature.lngLat[0],
                latitude: selectedFeature.lngLat[1],
                onClose: onClearSelect,
                closeButton: true,
                closeOnClick: false,
                anchor: "bottom",
                className: "map-pin-popup",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-[180px] max-w-[280px] text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-foreground",
                            children: selectedFeature.feature.properties?.title ?? 'Location'
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        selectedFeature.feature.properties?.snippet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-muted-foreground",
                            children: selectedFeature.feature.properties.snippet
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(MapPinsLayer, "o097fENQNtZNrEWuaBXKiOemsK0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = MapPinsLayer;
var _c;
__turbopack_context__.k.register(_c, "MapPinsLayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/data/demo-research-geojson.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/repos/map-searcher/client/src/components/map/map-container.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapContainer",
    ()=>MapContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/react-map-gl/dist/maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Map__as__default$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript) <export Map as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$map$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/map-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$map$2d$pins$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/map/map-pins-layer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$data$2f$demo$2d$research$2d$geojson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/data/demo-research-geojson.ts [app-client] (ecmascript)");
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
const MapContainer = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function MapContainer({ className, children, pinsData, initialViewState, interactiveLayerIds, onLayerClick, onMove, cursor }, ref) {
    _s();
    const [selectedFeature, setSelectedFeature] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const data = pinsData ?? __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$data$2f$demo$2d$research$2d$geojson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_RESEARCH_GEOJSON"];
    const hasPins = data.features.length > 0;
    const handleMapClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.MapContainer.useCallback[handleMapClick]": (ev)=>{
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
            const coords = f.geometry.coordinates;
            setSelectedFeature({
                feature: f,
                lngLat: [
                    ev.lngLat.lng,
                    ev.lngLat.lat
                ]
            });
        }
    }["MapContainer.MapContainer.useCallback[handleMapClick]"], [
        onLayerClick
    ]);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapContainer.MapContainer.useCallback[clearSelection]": ()=>setSelectedFeature(null)
    }["MapContainer.MapContainer.useCallback[clearSelection]"], []);
    // Combine internal and external interactive layer IDs
    const allInteractiveLayerIds = [
        ...hasPins ? [
            __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$map$2d$pins$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PINS_LAYER_ID"]
        ] : [],
        ...interactiveLayerIds || []
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative border-border", className),
        role: "application",
        "aria-label": "Interactive map of research locations",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Map__as__default$3e$__["default"], {
            ref: ref,
            initialViewState: initialViewState || __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$map$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VIEW_STATE"],
            style: {
                width: '100%',
                height: '100%'
            },
            mapStyle: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$map$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_STYLES"].liberty,
            onClick: handleMapClick,
            onMove: onMove,
            cursor: cursor || (hasPins ? 'pointer' : undefined),
            interactiveLayerIds: allInteractiveLayerIds.length > 0 ? allInteractiveLayerIds : undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavigationControl"], {
                    position: "top-right"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/map/map-container.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$map$2d$pins$2d$layer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapPinsLayer"], {
                    data: data,
                    selectedFeature: selectedFeature,
                    onClearSelect: clearSelection
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/map/map-container.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/map/map-container.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/map/map-container.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}, "D1nnCMyWA7o83sllZI/eMGqDcgY=")), "D1nnCMyWA7o83sllZI/eMGqDcgY=");
_c1 = MapContainer;
var _c, _c1;
__turbopack_context__.k.register(_c, "MapContainer$forwardRef");
__turbopack_context__.k.register(_c1, "MapContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOCATION_PINS_LAYER_IDS",
    ()=>LOCATION_PINS_LAYER_IDS,
    "LocationPins",
    ()=>LocationPins
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/react-map-gl/dist/maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const layerStyle = {
    id: 'alert-locations',
    type: 'circle',
    paint: {
        'circle-radius': 8,
        'circle-color': '#ef4444',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': 0.9
    }
};
const layerHoverStyle = {
    id: 'alert-locations-hover',
    type: 'circle',
    paint: {
        'circle-radius': 12,
        'circle-color': '#dc2626',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': 1
    },
    filter: [
        '==',
        [
            'get',
            'locationId'
        ],
        ''
    ]
};
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function LocationPins({ data, onFeatureClick }) {
    _s();
    console.log(`[PINS] LocationPins RENDER - featureCount=${data.features.length}`);
    if (data.features.length === 0) {
        console.warn(`[PINS] LocationPins WARNING - NO FEATURES! Map will be empty.`);
    } else {
        console.log(`[PINS] LocationPins SAMPLE FEATURES:`, data.features.slice(0, 3).map((f)=>({
                mention: f.properties.mention,
                coords: f.geometry.coordinates
            })));
    }
    const [popupInfo, setPopupInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoverInfo, setHoverInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LocationPins.useCallback[onClick]": (event)=>{
            const feature = event.features?.[0];
            console.log(`[PINS] onClick - feature clicked:`, feature?.properties?.mention);
            if (feature && feature.geometry.type === 'Point') {
                const props = feature.properties;
                const geoJsonFeature = {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: feature.geometry.coordinates
                    },
                    properties: props
                };
                console.log(`[PINS] onClick SHOWING popup for:`, props.mention);
                setPopupInfo(geoJsonFeature);
                onFeatureClick?.(geoJsonFeature);
            }
        }
    }["LocationPins.useCallback[onClick]"], [
        onFeatureClick
    ]);
    const onMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LocationPins.useCallback[onMouseEnter]": (event)=>{
            const feature = event.features?.[0];
            console.log(`[PINS] onMouseEnter - locationId=${feature?.properties?.locationId}`);
            if (feature) {
                setHoverInfo(feature.properties?.locationId || null);
            }
        }
    }["LocationPins.useCallback[onMouseEnter]"], []);
    const onMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LocationPins.useCallback[onMouseLeave]": ()=>{
            console.log(`[PINS] onMouseLeave`);
            setHoverInfo(null);
        }
    }["LocationPins.useCallback[onMouseLeave]"], []);
    // Create hover filter
    const hoverFilter = hoverInfo ? [
        '==',
        [
            'get',
            'locationId'
        ],
        hoverInfo
    ] : [
        '==',
        [
            'get',
            'locationId'
        ],
        ''
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Source"], {
                id: "alert-locations",
                type: "geojson",
                data: data,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                        ...layerStyle,
                        beforeId: undefined
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                        ...layerHoverStyle,
                        filter: hoverFilter
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            popupInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                longitude: popupInfo.geometry.coordinates[0],
                latitude: popupInfo.geometry.coordinates[1],
                anchor: "bottom",
                onClose: ()=>setPopupInfo(null),
                closeOnClick: false,
                className: "location-popup",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2 max-w-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-sm mb-1 line-clamp-2",
                            children: popupInfo.properties.articleTitle
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-400 mb-2",
                            children: popupInfo.properties.mention
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        popupInfo.properties.formattedAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-500 dark:text-zinc-500 mb-2",
                            children: popupInfo.properties.formattedAddress
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                            lineNumber: 127,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-zinc-400",
                                    children: formatDate(popupInfo.properties.publishedAt)
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: popupInfo.properties.articleUrl,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-600 hover:underline",
                                    children: "Read article"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(LocationPins, "GKvv7/qxIXLBHiKQsgbtGXjakMw=");
_c = LocationPins;
const LOCATION_PINS_LAYER_IDS = [
    'alert-locations'
];
var _c;
__turbopack_context__.k.register(_c, "LocationPins");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/map/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$map$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/map/map-container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$LocationPins$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechRecognition",
    ()=>useSpeechRecognition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [interimTranscript, setInterimTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Defer support check to useEffect so server and first client render match (avoid hydration mismatch)
    const [isSupported, setIsSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onResultRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(options?.onResult);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSpeechRecognition.useEffect": ()=>{
            setIsSupported(!!getSpeechRecognition());
        }
    }["useSpeechRecognition.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSpeechRecognition.useEffect": ()=>{
            onResultRef.current = options?.onResult;
        }
    }["useSpeechRecognition.useEffect"], [
        options?.onResult
    ]);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechRecognition.useCallback[stop]": ()=>{
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
            setIsListening(false);
        }
    }["useSpeechRecognition.useCallback[stop]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
"[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
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
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/button.tsx",
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
"[project]/repos/map-searcher/client/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/input.tsx",
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
"[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chatWithArticles",
    ()=>chatWithArticles,
    "createAlert",
    ()=>createAlert,
    "deleteAlert",
    ()=>deleteAlert,
    "getAgents",
    ()=>getAgents,
    "getAlert",
    ()=>getAlert,
    "getAlertsLocations",
    ()=>getAlertsLocations,
    "getLastAssistantContent",
    ()=>getLastAssistantContent,
    "getMapState",
    ()=>getMapState,
    "getPreferences",
    ()=>getPreferences,
    "listAlerts",
    ()=>listAlerts,
    "resetPreferences",
    ()=>resetPreferences,
    "runAlert",
    ()=>runAlert,
    "sendAgentMessage",
    ()=>sendAgentMessage,
    "textToSpeech",
    ()=>textToSpeech,
    "updateAlert",
    ()=>updateAlert,
    "updatePreferences",
    ()=>updatePreferences,
    "updateResearchBlock",
    ()=>updateResearchBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/** Default backend port when running client in dev (server-nest). */ const DEFAULT_API_PORT = "3001";
/**
 * Client API for the backend (server-nest by default).
 * Set NEXT_PUBLIC_API_URL in production (e.g. https://api.example.com).
 * In dev, defaults to http://localhost:3001 so API calls always hit the backend even if the client runs on another port.
 */ function getBase() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const env = ("TURBOPACK compile-time value", "http://localhost:3001");
    if ("TURBOPACK compile-time truthy", 1) return env.replace(/\/$/, "");
    //TURBOPACK unreachable
    ;
}
/** Turn API error response body into a user-facing message (avoid showing HTML 404 pages). */ async function getErrorMessage(res) {
    const text = await res.text().catch(()=>res.statusText);
    const trimmed = text.trim();
    if (trimmed.startsWith("<!") || trimmed.toLowerCase().startsWith("<!doctype")) {
        return "Could not reach the research service. Make sure the backend is running (e.g. server-nest on port 3001).";
    }
    if (res.status === 404) return "Research service not found. Is the backend running?";
    if (res.status >= 500) return "Research service error. Try again later.";
    return trimmed || res.statusText;
}
async function getAgents() {
    const res = await fetch(`${getBase()}/api/workflow/agents`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error(await getErrorMessage(res));
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
    if (!res.ok) throw new Error(await getErrorMessage(res));
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
    if (!res.ok) throw new Error(await getErrorMessage(res));
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
async function listAlerts() {
    const url = `${getBase()}/api/alerts`;
    console.log(`[API] listAlerts START - url=${url}`);
    const res = await fetch(url, {
        credentials: "include"
    });
    console.log(`[API] listAlerts response - status=${res.status}, ok=${res.ok}`);
    if (!res.ok) {
        const errorText = await res.text().catch(()=>res.statusText);
        console.error(`[API] listAlerts FAILED - status=${res.status}, error=${errorText}`);
        throw new Error(errorText);
    }
    const data = await res.json();
    console.log(`[API] listAlerts SUCCESS - count=${data?.length || 0}, alerts=`, data?.map((a)=>({
            id: a.id,
            query: a.query,
            articleCount: a.articleCount
        })));
    return data;
}
async function getAlert(alertId) {
    const url = `${getBase()}/api/alerts/${alertId}`;
    console.log(`[API] getAlert START - alertId=${alertId}, url=${url}`);
    const res = await fetch(url, {
        credentials: "include"
    });
    console.log(`[API] getAlert response - status=${res.status}, ok=${res.ok}`);
    if (!res.ok) {
        const errorText = await res.text().catch(()=>res.statusText);
        console.error(`[API] getAlert FAILED - alertId=${alertId}, status=${res.status}, error=${errorText}`);
        throw new Error(errorText);
    }
    const data = await res.json();
    console.log(`[API] getAlert SUCCESS - alertId=${alertId}, query="${data.query}", region="${data.region}", articleCount=${data.articleCount}, articlesReturned=${data.articles?.length || 0}`);
    if (data.articles && data.articles.length > 0) {
        console.log(`[API] getAlert ARTICLES SAMPLE:`, data.articles.slice(0, 2).map((a)=>({
                id: a.id,
                title: a.title,
                locationCount: a.locationCount
            })));
    }
    return data;
}
async function createAlert(input) {
    const url = `${getBase()}/api/alerts`;
    console.log(`[API] createAlert START - query="${input.query}", region="${input.region}", frequency=${input.frequency || 'MANUAL'}, maxArticles=${input.maxArticles || 20}`);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(input)
    });
    console.log(`[API] createAlert response - status=${res.status}, ok=${res.ok}`);
    if (!res.ok) {
        const errorText = await res.text().catch(()=>res.statusText);
        console.error(`[API] createAlert FAILED - status=${res.status}, error=${errorText}`);
        throw new Error(errorText);
    }
    const data = await res.json();
    console.log(`[API] createAlert SUCCESS - alertId=${data.id}, query="${data.query}", region="${data.region}"`);
    return data;
}
async function updateAlert(alertId, input) {
    const res = await fetch(`${getBase()}/api/alerts/${alertId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function deleteAlert(alertId) {
    const res = await fetch(`${getBase()}/api/alerts/${alertId}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function runAlert(alertId) {
    const url = `${getBase()}/api/alerts/${alertId}/run`;
    console.log(`[API] runAlert START - alertId=${alertId}, url=${url}`);
    const res = await fetch(url, {
        method: "POST",
        credentials: "include"
    });
    console.log(`[API] runAlert response - status=${res.status}, ok=${res.ok}`);
    if (!res.ok) {
        const errorText = await res.text().catch(()=>res.statusText);
        console.error(`[API] runAlert FAILED - alertId=${alertId}, status=${res.status}, error=${errorText}`);
        throw new Error(errorText);
    }
    const data = await res.json();
    console.log(`[API] runAlert SUCCESS - alertId=${alertId}, jobId=${data.jobId}, message="${data.message}"`);
    return data;
}
async function getAlertsLocations(alertIds) {
    const params = alertIds?.length ? `?alertIds=${alertIds.join(",")}` : "";
    const url = `${getBase()}/api/alerts/locations${params}`;
    console.log(`[API] getAlertsLocations START - alertIds=${JSON.stringify(alertIds)}, url=${url}`);
    const res = await fetch(url, {
        credentials: "include"
    });
    console.log(`[API] getAlertsLocations response - status=${res.status}, ok=${res.ok}`);
    if (!res.ok) {
        const errorText = await res.text().catch(()=>res.statusText);
        console.error(`[API] getAlertsLocations FAILED - status=${res.status}, error=${errorText}`);
        throw new Error(errorText);
    }
    const data = await res.json();
    console.log(`[API] getAlertsLocations SUCCESS - featureCount=${data.features?.length || 0}, type=${data.type}`);
    if (data.features && data.features.length > 0) {
        console.log(`[API] getAlertsLocations SAMPLE FEATURES (first 3):`, data.features.slice(0, 3).map((f)=>({
                mention: f.properties.mention,
                articleTitle: f.properties.articleTitle,
                coords: f.geometry.coordinates
            })));
    } else {
        console.warn(`[API] getAlertsLocations WARNING - NO FEATURES RETURNED! This means no map pins will show.`);
    }
    return data;
}
async function chatWithArticles(alertId, message) {
    const url = `${getBase()}/api/alerts/${alertId}/chat`;
    console.log(`[API] chatWithArticles START - alertId=${alertId}, messageLength=${message.length}, url=${url}`);
    console.log(`[API] chatWithArticles body - message="${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"`);
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                message
            })
        });
        console.log(`[API] chatWithArticles response received - status=${res.status}, ok=${res.ok}, contentType=${res.headers.get('content-type')}`);
        if (!res.ok) {
            const errorText = await res.text().catch(()=>res.statusText);
            console.error(`[API] chatWithArticles FAILED - alertId=${alertId}, status=${res.status}, error="${errorText.substring(0, 200)}"`);
            throw new Error(errorText);
        }
        const data = await res.json();
        console.log(`[API] chatWithArticles SUCCESS - alertId=${alertId}, agentId=${data.agentId}, responseLength=${data.response?.length || 0}`);
        console.log(`[API] chatWithArticles response preview - "${data.response?.substring(0, 150)}${data.response?.length > 150 ? '...' : ''}"`);
        return data;
    } catch (error) {
        console.error(`[API] chatWithArticles ERROR - alertId=${alertId}, error=${error instanceof Error ? error.message : String(error)}`);
        throw error;
    }
}
async function getPreferences() {
    const res = await fetch(`${getBase()}/api/preferences`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function updatePreferences(input) {
    const res = await fetch(`${getBase()}/api/preferences`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function resetPreferences() {
    const res = await fetch(`${getBase()}/api/preferences`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText));
    return res.json();
}
async function textToSpeech(text, voice = "nova") {
    const url = `${getBase()}/api/alerts/tts`;
    console.log(`[API] textToSpeech START - textLength=${text.length}, voice=${voice}`);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            text,
            voice
        })
    });
    if (!res.ok) {
        const errorText = await res.text().catch(()=>res.statusText);
        console.error(`[API] textToSpeech FAILED - status=${res.status}, error=${errorText}`);
        throw new Error(errorText);
    }
    const blob = await res.blob();
    console.log(`[API] textToSpeech SUCCESS - blobSize=${blob.size} bytes, type=${blob.type}`);
    return blob;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/AgentInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentInput",
    ()=>AgentInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
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
function AgentInput({ className, selectedAlertId, onAfterMapAgentResponse, onVoiceClick }) {
    _s();
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [askInput, setAskInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastResponse, setLastResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { speak: speakText } = useSpeechSynthesis();
    const { isSupported: sttSupported, isListening, transcript, interimTranscript, error: sttError, start: startListening, stop: stopListening, reset: resetTranscript } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"])({
        continuous: true
    });
    const ensureAgents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AgentInput.useCallback[ensureAgents]": async ()=>{
            if (agents) return agents;
            const ids = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgents"])();
            setAgents(ids);
            return ids;
        }
    }["AgentInput.useCallback[ensureAgents]"], [
        agents
    ]);
    const submitMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AgentInput.useCallback[submitMessage]": async (userText)=>{
            const text = userText.trim();
            if (!text) return;
            setLoading(true);
            setError(null);
            setLastResponse("");
            try {
                // If an alert is selected, use article chat instead of workflow agents
                if (selectedAlertId) {
                    console.log(`[AgentInput] Using article chat for alert ${selectedAlertId}`);
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatWithArticles"])(selectedAlertId, text);
                    setLastResponse(response.response);
                    return;
                }
                // Otherwise use the standard research workflow
                const ids = await ensureAgents();
                const researchResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendAgentMessage"])(ids.researchAgentId, text);
                const researchContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastAssistantContent"])(researchResponse);
                if (researchContent) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateResearchBlock"])(ids.researchBlockId, researchContent);
                    const mapResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendAgentMessage"])(ids.mapAgentId, MAP_PROMPT);
                    const mapContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastAssistantContent"])(mapResponse);
                    setLastResponse(mapContent || researchContent);
                    await onAfterMapAgentResponse?.();
                } else {
                    setLastResponse((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastAssistantContent"])(researchResponse) || "No reply from research agent.");
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally{
                setLoading(false);
            }
        }
    }["AgentInput.useCallback[submitMessage]"], [
        ensureAgents,
        onAfterMapAgentResponse,
        selectedAlertId
    ]);
    const handleAskSubmit = ()=>{
        submitMessage(askInput);
        setAskInput("");
    };
    const handleToggleMic = ()=>{
        if (isListening) {
            // Just stop listening, don't auto-send - let user review and hit Send
            stopListening();
            const full = (transcript + " " + interimTranscript).trim();
            if (full) {
                setAskInput(full);
            }
        } else {
            resetTranscript();
            setAskInput("");
            startListening();
        }
    };
    const handleSendWhileListening = ()=>{
        stopListening();
        const full = (transcript + " " + interimTranscript).trim() || askInput.trim();
        if (full) {
            setAskInput("");
            submitMessage(full);
        }
    };
    const liveTranscript = (transcript + " " + interimTranscript).trim();
    const showMic = sttSupported !== false; // show slot when unknown or supported (avoids layout shift)
    const micReady = sttSupported === true;
    const isArticleChatMode = !!selectedAlertId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("space-y-6", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                "aria-label": "Research query",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "ask-input",
                        className: "sr-only",
                        children: "Ask a research question"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 sm:flex-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "ask-input",
                                        type: "text",
                                        placeholder: isListening ? liveTranscript || "Listening…" : isArticleChatMode ? "Ask about the selected alert's articles…" : "Search events, places, or ask a question…",
                                        value: askInput,
                                        onChange: (e)=>setAskInput(e.target.value),
                                        onKeyDown: (e)=>e.key === "Enter" && handleAskSubmit(),
                                        disabled: loading || isListening,
                                        className: "min-h-[48px] touch-manipulation pl-9 text-base shadow-sm sm:min-h-[52px] sm:pl-10 sm:text-base",
                                        "aria-describedby": showMic ? "ask-mic-hint" : undefined,
                                        "aria-live": isListening ? "polite" : undefined,
                                        "aria-atomic": isListening
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            showMic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: isListening ? "destructive" : "outline",
                                size: "icon",
                                className: "min-h-[48px] min-w-[48px] shrink-0 touch-manipulation sm:min-h-[52px] sm:min-w-[52px]",
                                onClick: handleToggleMic,
                                disabled: loading || !micReady,
                                "aria-label": !micReady ? "Voice input loading" : isListening ? "Stop listening and send" : "Speak your question",
                                "aria-pressed": isListening,
                                "aria-busy": !micReady,
                                children: isListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                    className: "size-4",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                    lineNumber: 184,
                                    columnNumber: 30
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                    className: "size-4",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                    lineNumber: 184,
                                    columnNumber: 74
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            isArticleChatMode && onVoiceClick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: onVoiceClick,
                                disabled: loading,
                                className: "min-h-[48px] shrink-0 touch-manipulation px-4 sm:min-h-[52px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                        className: "size-4 mr-1.5",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this),
                                    "Voice"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this),
                            !isArticleChatMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: isListening ? handleSendWhileListening : handleAskSubmit,
                                disabled: loading || !askInput.trim() && !isListening && !liveTranscript,
                                className: "min-h-[48px] shrink-0 touch-manipulation px-5 sm:min-h-[52px]",
                                children: loading ? "Researching…" : isListening ? "Send" : "Research"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    showMic && micReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "ask-mic-hint",
                        className: "text-xs text-muted-foreground",
                        children: isListening ? "Hit Send when done, or tap mic to stop without sending." : "Use the mic to speak your question."
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    sttError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-destructive",
                        role: "alert",
                        children: sttError
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                lineNumber: 224,
                columnNumber: 9
            }, this),
            lastResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5 sm:py-5",
                "aria-label": isArticleChatMode ? "Chat Response" : "Findings",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm font-medium text-foreground",
                                children: [
                                    isArticleChatMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                        className: "size-4 shrink-0 text-muted-foreground",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                        lineNumber: 240,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "size-4 shrink-0 text-muted-foreground",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this),
                                    isArticleChatMode ? "Chat Response" : "Findings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                className: "h-8 gap-1.5 text-muted-foreground hover:text-foreground",
                                onClick: ()=>speakText(lastResponse),
                                "aria-label": "Speak findings aloud",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                        className: "size-4",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                        lineNumber: 254,
                                        columnNumber: 15
                                    }, this),
                                    "Speak"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground/90",
                        children: lastResponse
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
                lineNumber: 233,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/AgentInput.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(AgentInput, "zWo4Yum92NYobnut26+Wt2VTznA=", true, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"]
    ];
});
_c = AgentInput;
var _c;
__turbopack_context__.k.register(_c, "AgentInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/auth/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtectedRoute",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ProtectedRoute({ children }) {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            if (!loading && !user) {
                router.replace("/login");
            }
        }
    }["ProtectedRoute.useEffect"], [
        user,
        loading,
        router
    ]);
    // Show loading state while checking auth (inherits bg-background from layout)
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen min-h-[100dvh] items-center justify-center bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-muted-foreground",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/auth/ProtectedRoute.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/auth/ProtectedRoute.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    // Don't render children if not authenticated
    if (!user) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ProtectedRoute, "Zr2WDa/YWeMetzDhcnOimt0LiKE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserHeader",
    ()=>UserHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function UserHeader() {
    _s();
    const { user, logout, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (!user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "border-b border-border bg-card px-4 py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-2xl items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-muted-foreground",
                    children: [
                        "Signed in as",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium text-foreground",
                            children: user.email
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    onClick: logout,
                    disabled: loading,
                    children: "Sign out"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(UserHeader, "Wu+csSnf+1aKI+hP/dR6ZNNX/Cc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = UserHeader;
var _c;
__turbopack_context__.k.register(_c, "UserHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/auth/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/auth/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$UserHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/calendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>Calendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$day$2d$picker$2f$dist$2f$esm$2f$DayPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/react-day-picker/dist/esm/DayPicker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$day$2d$picker$2f$dist$2f$esm$2f$DayPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DayPicker"], {
        showOutsideDays: showOutsideDays,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-3", className),
        classNames: {
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            month_caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            button_previous: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
                variant: "outline"
            }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"),
            button_next: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
                variant: "outline"
            }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"),
            month_grid: "w-full border-collapse space-y-1",
            weekdays: "flex",
            weekday: "text-zinc-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-zinc-400",
            week: "flex w-full mt-2",
            day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-100/50 [&:has([aria-selected])]:bg-zinc-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-zinc-800/50 dark:[&:has([aria-selected])]:bg-zinc-800",
            day_button: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
                variant: "ghost"
            }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
            range_end: "day-range-end",
            selected: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900 hover:text-zinc-50 focus:bg-zinc-900 focus:text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 dark:focus:bg-zinc-50 dark:focus:text-zinc-900",
            today: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
            outside: "day-outside text-zinc-500 aria-selected:bg-zinc-100/50 aria-selected:text-zinc-500 dark:text-zinc-400 dark:aria-selected:bg-zinc-800/50 dark:aria-selected:text-zinc-400",
            disabled: "text-zinc-500 opacity-50 dark:text-zinc-400",
            range_middle: "aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50",
            hidden: "invisible",
            ...classNames
        },
        components: {
            Chevron: ({ orientation })=>{
                const Icon = orientation === "left" ? __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"] : __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/calendar.tsx",
                    lineNumber: 61,
                    columnNumber: 18
                }, void 0);
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/calendar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = Calendar;
Calendar.displayName = "Calendar";
;
var _c;
__turbopack_context__.k.register(_c, "Calendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover,
    "PopoverContent",
    ()=>PopoverContent,
    "PopoverTrigger",
    ()=>PopoverTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-popover/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Popover = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const PopoverTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const PopoverContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, align = "center", sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            align: align,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-50 w-72 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/ui/popover.tsx",
            lineNumber: 17,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/popover.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = PopoverContent;
PopoverContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "PopoverContent$React.forwardRef");
__turbopack_context__.k.register(_c1, "PopoverContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Select = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const SelectGroup = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"];
const SelectValue = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"];
const SelectTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "h-4 w-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                    lineNumber: 29,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = SelectTrigger;
SelectTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const SelectScrollUpButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
            lineNumber: 47,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = SelectScrollUpButton;
SelectScrollUpButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"].displayName;
const SelectScrollDownButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 56,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = SelectScrollDownButton;
SelectScrollDownButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"].displayName;
const SelectContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, children, position = "popper", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
            lineNumber: 75,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 74,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = SelectContent;
SelectContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const SelectLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 106,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = SelectLabel;
SelectLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"].displayName;
const SelectItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                    lineNumber: 127,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                lineNumber: 126,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
                lineNumber: 132,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 118,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = SelectItem;
SelectItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"].displayName;
const SelectSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/select.tsx",
        lineNumber: 141,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = SelectSeparator;
SelectSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "SelectTrigger$React.forwardRef");
__turbopack_context__.k.register(_c1, "SelectTrigger");
__turbopack_context__.k.register(_c2, "SelectScrollUpButton");
__turbopack_context__.k.register(_c3, "SelectScrollDownButton");
__turbopack_context__.k.register(_c4, "SelectContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "SelectContent");
__turbopack_context__.k.register(_c6, "SelectLabel$React.forwardRef");
__turbopack_context__.k.register(_c7, "SelectLabel");
__turbopack_context__.k.register(_c8, "SelectItem$React.forwardRef");
__turbopack_context__.k.register(_c9, "SelectItem");
__turbopack_context__.k.register(_c10, "SelectSeparator$React.forwardRef");
__turbopack_context__.k.register(_c11, "SelectSeparator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Label;
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Form",
    ()=>Form,
    "FormControl",
    ()=>FormControl,
    "FormDescription",
    ()=>FormDescription,
    "FormField",
    ()=>FormField,
    "FormItem",
    ()=>FormItem,
    "FormLabel",
    ()=>FormLabel,
    "FormMessage",
    ()=>FormMessage,
    "useFormField",
    ()=>useFormField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/label.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const Form = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormProvider"];
const FormFieldContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({});
const FormField = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormFieldContext.Provider, {
        value: {
            name: props.name
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
            ...props
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = FormField;
const useFormField = ()=>{
    _s();
    const fieldContext = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FormFieldContext);
    const itemContext = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FormItemContext);
    const { getFieldState, formState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    };
};
_s(useFormField, "eRzki+X5SldVDcAh3BokmSZW9NU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"]
    ];
});
const FormItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({});
const FormItem = /*#__PURE__*/ _s1(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = _s1(({ className, ...props }, ref)=>{
    _s1();
    const id = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormItemContext.Provider, {
        value: {
            id
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("space-y-2", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "WhsuKpSQZEWeFcB7gWlfDRQktoQ=")), "WhsuKpSQZEWeFcB7gWlfDRQktoQ=");
_c2 = FormItem;
FormItem.displayName = "FormItem";
const FormLabel = /*#__PURE__*/ _s2(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c3 = _s2(({ className, ...props }, ref)=>{
    _s2();
    const { error, formItemId } = useFormField();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(error && "text-red-500 dark:text-red-900", className),
        htmlFor: formItemId,
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "Z4R+rKjylfAcqmbRnqWEg1TfTcg=", false, function() {
    return [
        useFormField
    ];
})), "Z4R+rKjylfAcqmbRnqWEg1TfTcg=", false, function() {
    return [
        useFormField
    ];
});
_c4 = FormLabel;
FormLabel.displayName = "FormLabel";
const FormControl = /*#__PURE__*/ _s3(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = _s3(({ ...props }, ref)=>{
    _s3();
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"], {
        ref: ref,
        id: formItemId,
        "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "mI3rlmONcPPBVtOc6UefMrXAJ6w=", false, function() {
    return [
        useFormField
    ];
})), "mI3rlmONcPPBVtOc6UefMrXAJ6w=", false, function() {
    return [
        useFormField
    ];
});
_c6 = FormControl;
FormControl.displayName = "FormControl";
const FormDescription = /*#__PURE__*/ _s4(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = _s4(({ className, ...props }, ref)=>{
    _s4();
    const { formDescriptionId } = useFormField();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        id: formDescriptionId,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-zinc-500 dark:text-zinc-400", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "573aRXA8dloSrMaQM9SdAF4A9NI=", false, function() {
    return [
        useFormField
    ];
})), "573aRXA8dloSrMaQM9SdAF4A9NI=", false, function() {
    return [
        useFormField
    ];
});
_c8 = FormDescription;
FormDescription.displayName = "FormDescription";
const FormMessage = /*#__PURE__*/ _s5(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c9 = _s5(({ className, children, ...props }, ref)=>{
    _s5();
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        id: formMessageId,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium text-red-500 dark:text-red-900", className),
        ...props,
        children: body
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/form.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "WONNS8VCMr8LShuUovb8QgOmMVY=", false, function() {
    return [
        useFormField
    ];
})), "WONNS8VCMr8LShuUovb8QgOmMVY=", false, function() {
    return [
        useFormField
    ];
});
_c10 = FormMessage;
FormMessage.displayName = "FormMessage";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "FormField");
__turbopack_context__.k.register(_c1, "FormItem$React.forwardRef");
__turbopack_context__.k.register(_c2, "FormItem");
__turbopack_context__.k.register(_c3, "FormLabel$React.forwardRef");
__turbopack_context__.k.register(_c4, "FormLabel");
__turbopack_context__.k.register(_c5, "FormControl$React.forwardRef");
__turbopack_context__.k.register(_c6, "FormControl");
__turbopack_context__.k.register(_c7, "FormDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "FormDescription");
__turbopack_context__.k.register(_c9, "FormMessage$React.forwardRef");
__turbopack_context__.k.register(_c10, "FormMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/lib/validations/alert.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FREQUENCY_OPTIONS",
    ()=>FREQUENCY_OPTIONS,
    "alertFrequencySchema",
    ()=>alertFrequencySchema,
    "createAlertSchema",
    ()=>createAlertSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const alertFrequencySchema = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'DAILY',
    'WEEKLY',
    'BIWEEKLY',
    'MONTHLY',
    'MANUAL'
]);
const createAlertSchema = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    query: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, 'Query must be at least 2 characters'),
    region: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, 'Region is required'),
    maxArticles: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1, 'At least 1 article').max(50, 'Maximum 50 articles'),
    frequency: alertFrequencySchema,
    fromDate: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date().optional()
});
const FREQUENCY_OPTIONS = [
    {
        value: 'MANUAL',
        label: 'Manual only'
    },
    {
        value: 'DAILY',
        label: 'Daily'
    },
    {
        value: 'WEEKLY',
        label: 'Weekly'
    },
    {
        value: 'BIWEEKLY',
        label: 'Biweekly'
    },
    {
        value: 'MONTHLY',
        label: 'Monthly'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateAlertForm",
    ()=>CreateAlertForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/calendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$validations$2f$alert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/validations/alert.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
function CreateAlertForm({ onCreated, onCancel }) {
    _s();
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$validations$2f$alert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAlertSchema"]),
        defaultValues: {
            query: '',
            region: '',
            maxArticles: 20,
            frequency: 'MANUAL',
            fromDate: undefined
        }
    });
    const onSubmit = async (data)=>{
        console.log(`[FORM] CreateAlertForm onSubmit START - query="${data.query}", region="${data.region}", frequency=${data.frequency}, maxArticles=${data.maxArticles}`);
        setError(null);
        setSubmitting(true);
        try {
            const input = {
                query: data.query.trim(),
                region: data.region.trim(),
                maxArticles: data.maxArticles,
                frequency: data.frequency,
                isActive: true
            };
            console.log(`[FORM] CreateAlertForm submitting - input=`, input);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAlert"])(input);
            console.log(`[FORM] CreateAlertForm SUCCESS`);
            onCreated();
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to create alert';
            console.error(`[FORM] CreateAlertForm FAILED - error=${errorMsg}`);
            setError(errorMsg);
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
        ...form,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: form.handleSubmit(onSubmit),
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: "query",
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    children: "Search Query"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "e.g., robberies, car accidents",
                                        disabled: submitting,
                                        ...field
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: "region",
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    children: "Region"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "e.g., Savannah, GA",
                                        disabled: submitting,
                                        ...field
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormDescription"], {
                                    children: "City, state, or area to search for news"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                            control: form.control,
                            name: "maxArticles",
                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                            children: "Max Articles"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: 1,
                                                max: 50,
                                                disabled: submitting,
                                                ...field,
                                                onChange: (e)=>field.onChange(parseInt(e.target.value) || 20)
                                            }, void 0, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                            control: form.control,
                            name: "frequency",
                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                            children: "Frequency"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            disabled: submitting,
                                            onValueChange: field.onChange,
                                            defaultValue: field.value,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                            placeholder: "Select frequency"
                                                        }, void 0, false, {
                                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 21
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 19
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$validations$2f$alert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FREQUENCY_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: option.value,
                                                            children: option.label
                                                        }, option.value, false, {
                                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 23
                                                        }, void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 19
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 152,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: "fromDate",
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            className: "flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    children: "Initial Search Period"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    disabled: submitting,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground'),
                                                    children: [
                                                        field.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(field.value, 'PPP') : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Pick a start date (optional)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                            className: "ml-auto h-4 w-4 opacity-50"
                                                        }, void 0, false, {
                                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 21
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                            className: "w-auto p-0",
                                            align: "start",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Calendar"], {
                                                mode: "single",
                                                selected: field.value,
                                                onSelect: field.onChange,
                                                disabled: (date)=>date > new Date(),
                                                initialFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormDescription"], {
                                    children: "Search for articles from this date. Defaults to today."
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-red-600 dark:text-red-400",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                    lineNumber: 221,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 justify-end pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            onClick: onCancel,
                            disabled: submitting,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            disabled: submitting,
                            children: submitting ? 'Creating...' : 'Create Alert'
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(CreateAlertForm, "aUrTQpv0o8c+RtwAysTXAqwd4v8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = CreateAlertForm;
var _c;
__turbopack_context__.k.register(_c, "CreateAlertForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
        lineNumber: 21,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-950", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
                                lineNumber: 48,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
                                lineNumber: 49,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
                        lineNumber: 47,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
                lineNumber: 38,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
        lineNumber: 74,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
        lineNumber: 88,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-zinc-500 dark:text-zinc-400", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/dialog.tsx",
        lineNumber: 103,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateAlertDialog",
    ()=>CreateAlertDialog,
    "CreateAlertDialogTrigger",
    ()=>CreateAlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function CreateAlertDialog({ open, onOpenChange, onCreated }) {
    const handleCreated = ()=>{
        onOpenChange(false);
        onCreated();
    };
    const handleCancel = ()=>{
        onOpenChange(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[425px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Create News Alert"
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Set up a recurring search for news articles in a specific region."
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateAlertForm"], {
                    onCreated: handleCreated,
                    onCancel: handleCancel
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = CreateAlertDialog;
function CreateAlertDialogTrigger({ onOpenChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: ()=>onOpenChange(true),
        size: "sm",
        children: "New Alert"
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c1 = CreateAlertDialogTrigger;
var _c, _c1;
__turbopack_context__.k.register(_c, "CreateAlertDialog");
__turbopack_context__.k.register(_c1, "CreateAlertDialogTrigger");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/card.tsx",
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
"[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertList",
    ()=>AlertList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function formatDate(dateStr) {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function formatFrequency(freq) {
    const map = {
        DAILY: 'Daily',
        WEEKLY: 'Weekly',
        BIWEEKLY: 'Biweekly',
        MONTHLY: 'Monthly',
        MANUAL: 'Manual'
    };
    return map[freq] || freq;
}
function AlertList({ alerts, onRefresh, onSelect }) {
    _s();
    const [loadingId, setLoadingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleToggle = async (alert)=>{
        setLoadingId(alert.id);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAlert"])(alert.id, {
                isActive: !alert.isActive
            });
            onRefresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update alert');
        } finally{
            setLoadingId(null);
        }
    };
    const handleDelete = async (alertId)=>{
        if (!confirm('Are you sure you want to delete this alert? All associated articles will be deleted.')) {
            return;
        }
        setLoadingId(alertId);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteAlert"])(alertId);
            onRefresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete alert');
        } finally{
            setLoadingId(null);
        }
    };
    const handleRun = async (alertId)=>{
        setLoadingId(alertId);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runAlert"])(alertId);
            // Refresh after a short delay to show updated status
            setTimeout(onRefresh, 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to run alert');
        } finally{
            setLoadingId(null);
        }
    };
    if (alerts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8 text-zinc-500 dark:text-zinc-400",
            children: "No alerts yet. Create one to get started."
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-red-600 dark:text-red-400 mb-2",
                children: error
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this),
            alerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: `cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 ${!alert.isActive ? 'opacity-60' : ''}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            className: "pb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-base font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400",
                                        onClick: ()=>onSelect(alert.id),
                                        children: alert.query
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs px-2 py-0.5 rounded-full ${alert.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`,
                                            children: alert.isActive ? 'Active' : 'Paused'
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-zinc-600 dark:text-zinc-400 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: alert.region
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-2",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: formatFrequency(alert.frequency)
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-2",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                alert.articleCount,
                                                " articles"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-zinc-500 dark:text-zinc-500 mb-3",
                                    children: [
                                        "Last run: ",
                                        formatDate(alert.lastRunAt),
                                        alert.nextRunAt && alert.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mx-2",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 19
                                                }, this),
                                                "Next: ",
                                                formatDate(alert.nextRunAt)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "outline",
                                            onClick: ()=>handleRun(alert.id),
                                            disabled: loadingId === alert.id,
                                            children: "Run Now"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "ghost",
                                            onClick: ()=>handleToggle(alert),
                                            disabled: loadingId === alert.id,
                                            children: alert.isActive ? 'Pause' : 'Resume'
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "ghost",
                                            className: "text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950",
                                            onClick: ()=>handleDelete(alert.id),
                                            disabled: loadingId === alert.id,
                                            children: "Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, alert.id, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(AlertList, "92YqVwPtFIYINyxa8P2gK3SDhqo=");
_c = AlertList;
var _c;
__turbopack_context__.k.register(_c, "AlertList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDetail",
    ()=>AlertDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const FREQUENCY_OPTIONS = [
    {
        value: 'MANUAL',
        label: 'Manual only'
    },
    {
        value: 'DAILY',
        label: 'Daily'
    },
    {
        value: 'WEEKLY',
        label: 'Weekly'
    },
    {
        value: 'BIWEEKLY',
        label: 'Biweekly'
    },
    {
        value: 'MONTHLY',
        label: 'Monthly'
    }
];
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}
function AlertDetail({ alertId, onBack, onRefresh }) {
    _s();
    const [alert, setAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Edit state
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editQuery, setEditQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editRegion, setEditRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editMaxArticles, setEditMaxArticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [editFrequency, setEditFrequency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('MANUAL');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AlertDetail.useEffect": ()=>{
            loadAlert();
        }
    }["AlertDetail.useEffect"], [
        alertId
    ]);
    const loadAlert = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlert"])(alertId);
            setAlert(data);
            setEditQuery(data.query);
            setEditRegion(data.region);
            setEditMaxArticles(data.maxArticles);
            setEditFrequency(data.frequency);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load alert');
        } finally{
            setLoading(false);
        }
    };
    const handleSave = async ()=>{
        if (!alert) return;
        setSaving(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAlert"])(alertId, {
                query: editQuery,
                region: editRegion,
                maxArticles: editMaxArticles,
                frequency: editFrequency
            });
            setEditing(false);
            loadAlert();
            onRefresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save alert');
        } finally{
            setSaving(false);
        }
    };
    const handleRun = async ()=>{
        setSaving(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runAlert"])(alertId);
            setTimeout(()=>{
                loadAlert();
                onRefresh();
            }, 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to run alert');
        } finally{
            setSaving(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
            lineNumber: 111,
            columnNumber: 7
        }, this);
    }
    if (error && !alert) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-600 dark:text-red-400 mb-4",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: onBack,
                    children: "Go Back"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this);
    }
    if (!alert) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    onClick: onBack,
                    children: "← Back"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-red-600 dark:text-red-400 mb-2",
                children: error
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    children: editing ? 'Edit Alert' : alert.query
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                !editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "outline",
                                            onClick: ()=>setEditing(true),
                                            children: "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            onClick: handleRun,
                                            disabled: saving,
                                            children: "Run Now"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Query"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: editQuery,
                                            onChange: (e)=>setEditQuery(e.target.value),
                                            className: "w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 161,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Region"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: editRegion,
                                            onChange: (e)=>setEditRegion(e.target.value),
                                            className: "w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium mb-1",
                                                    children: "Max Articles"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 1,
                                                    max: 50,
                                                    value: editMaxArticles,
                                                    onChange: (e)=>setEditMaxArticles(parseInt(e.target.value) || 20),
                                                    className: "w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium mb-1",
                                                    children: "Frequency"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editFrequency,
                                                    onChange: (e)=>setEditFrequency(e.target.value),
                                                    className: "w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600",
                                                    children: FREQUENCY_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: opt.value,
                                                            children: opt.label
                                                        }, opt.value, false, {
                                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 justify-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setEditing(false),
                                            disabled: saving,
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleSave,
                                            disabled: saving,
                                            children: saving ? 'Saving...' : 'Save'
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Region:"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 216,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        alert.region
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Max Articles:"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        alert.maxArticles
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Frequency:"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this),
                                        ' ',
                                        FREQUENCY_OPTIONS.find((o)=>o.value === alert.frequency)?.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Status:"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, this),
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: alert.isActive ? 'text-green-600' : 'text-zinc-500',
                                            children: alert.isActive ? 'Active' : 'Paused'
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 227,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this),
                                alert.lastRunAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Last Run:"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 233,
                                            columnNumber: 19
                                        }, this),
                                        " ",
                                        formatDate(alert.lastRunAt)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, this),
                                alert.nextRunAt && alert.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: "Next Run:"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 238,
                                            columnNumber: 19
                                        }, this),
                                        " ",
                                        formatDate(alert.nextRunAt)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base",
                            children: [
                                "Articles (",
                                alert.articles.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: alert.articles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-500 dark:text-zinc-400",
                            children: "No articles yet. Run the alert to fetch articles."
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: alert.articles.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-zinc-200 dark:border-zinc-700 pb-3 last:border-b-0 last:pb-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: article.url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "font-medium text-blue-600 hover:underline dark:text-blue-400",
                                            children: article.title
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 265,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-zinc-500 dark:text-zinc-400 mt-1",
                                            children: [
                                                article.source,
                                                " • ",
                                                formatDate(article.publishedAt),
                                                article.locationCount > 0 && ` • ${article.locationCount} locations`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 273,
                                            columnNumber: 19
                                        }, this),
                                        article.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2",
                                            children: article.summary
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                            lineNumber: 278,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, article.id, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                                    lineNumber: 261,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(AlertDetail, "mICjoRDNEBf29iSEy4H4sBhHjR4=");
_c = AlertDetail;
var _c;
__turbopack_context__.k.register(_c, "AlertDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertSelector",
    ()=>AlertSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
'use client';
;
;
;
function AlertSelector({ alerts, selectedAlertId, onSelect, disabled }) {
    const processingCount = alerts.filter((a)=>a.processingStatus === 'PROCESSING').length;
    console.log(`[SELECTOR] AlertSelector RENDER - alertCount=${alerts.length}, selectedAlertId=${selectedAlertId}, disabled=${disabled}, processingCount=${processingCount}`);
    const handleValueChange = (value)=>{
        // Don't allow selecting processing alerts
        const alert = alerts.find((a)=>a.id === value);
        if (alert?.processingStatus === 'PROCESSING') {
            console.log(`[SELECTOR] handleValueChange - blocked, alert is processing`);
            return;
        }
        console.log(`[SELECTOR] handleValueChange - value=${value}`);
        onSelect(value === 'all' ? null : value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
        value: selectedAlertId ?? 'all',
        onValueChange: handleValueChange,
        disabled: disabled,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                className: "w-[250px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                    placeholder: "Select an alert"
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                        value: "all",
                        children: "All Alerts"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    alerts.map((alert)=>{
                        const isProcessing = alert.processingStatus === 'PROCESSING';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: alert.id,
                            disabled: isProcessing,
                            className: isProcessing ? 'opacity-60' : '',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2 truncate",
                                children: [
                                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-3 w-3 animate-spin text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                                        lineNumber: 62,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: isProcessing ? 'text-muted-foreground' : '',
                                        children: [
                                            alert.query,
                                            " - ",
                                            alert.region,
                                            isProcessing && ' (Processing...)'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this)
                        }, alert.id, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = AlertSelector;
var _c;
__turbopack_context__.k.register(_c, "AlertSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/sheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sheet",
    ()=>Sheet,
    "SheetClose",
    ()=>SheetClose,
    "SheetContent",
    ()=>SheetContent,
    "SheetDescription",
    ()=>SheetDescription,
    "SheetFooter",
    ()=>SheetFooter,
    "SheetHeader",
    ()=>SheetHeader,
    "SheetOverlay",
    ()=>SheetOverlay,
    "SheetPortal",
    ()=>SheetPortal,
    "SheetTitle",
    ()=>SheetTitle,
    "SheetTrigger",
    ()=>SheetTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const Sheet = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const SheetTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const SheetClose = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const SheetPortal = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const SheetOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c = SheetOverlay;
SheetOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const sheetVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out dark:bg-zinc-950", {
    variants: {
        side: {
            top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
        }
    },
    defaultVariants: {
        side: "right"
    }
});
const SheetContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = ({ side = "right", className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sheetVariants({
                    side
                }), className),
                ...props,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
                                lineNumber: 68,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
                                lineNumber: 69,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
                        lineNumber: 67,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
                lineNumber: 62,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = SheetContent;
SheetContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const SheetHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
        lineNumber: 81,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = SheetHeader;
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = SheetFooter;
SheetFooter.displayName = "SheetFooter";
const SheetTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-zinc-950 dark:text-zinc-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
        lineNumber: 109,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = SheetTitle;
SheetTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const SheetDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-zinc-500 dark:text-zinc-400", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/sheet.tsx",
        lineNumber: 121,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c8 = SheetDescription;
SheetDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "SheetOverlay");
__turbopack_context__.k.register(_c1, "SheetContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "SheetContent");
__turbopack_context__.k.register(_c3, "SheetHeader");
__turbopack_context__.k.register(_c4, "SheetFooter");
__turbopack_context__.k.register(_c5, "SheetTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "SheetTitle");
__turbopack_context__.k.register(_c7, "SheetDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "SheetDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/skeleton.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PipecatChat",
    ()=>PipecatChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/phone-off.js [app-client] (ecmascript) <export default as PhoneOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$pipecat$2d$ai$2f$client$2d$js$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@pipecat-ai/client-js/dist/index.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$pipecat$2d$ai$2f$daily$2d$transport$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@pipecat-ai/daily-transport/dist/index.module.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PipecatChat({ alertId, onClose }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMicEnabled, setIsMicEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isConnecting, setIsConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const clientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize Pipecat client
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PipecatChat.useEffect": ()=>{
            const initClient = {
                "PipecatChat.useEffect.initClient": async ()=>{
                    try {
                        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$pipecat$2d$ai$2f$client$2d$js$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PipecatClient"]({
                            transport: new __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$pipecat$2d$ai$2f$daily$2d$transport$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DailyTransport"](),
                            enableMic: false,
                            enableCam: false,
                            autoSubscribeAudio: true
                        });
                        // Handle incoming messages from the bot
                        client.on('message', {
                            "PipecatChat.useEffect.initClient": (message)=>{
                                if (message.type === 'text') {
                                    setMessages({
                                        "PipecatChat.useEffect.initClient": (prev)=>[
                                                ...prev,
                                                {
                                                    role: 'assistant',
                                                    content: message.data,
                                                    timestamp: Date.now()
                                                }
                                            ]
                                    }["PipecatChat.useEffect.initClient"]);
                                }
                            }
                        }["PipecatChat.useEffect.initClient"]);
                        client.on('connected', {
                            "PipecatChat.useEffect.initClient": ()=>{
                                console.log('[PIPECAT] Connected to bot');
                                setIsConnected(true);
                                setIsConnecting(false);
                            }
                        }["PipecatChat.useEffect.initClient"]);
                        client.on('disconnected', {
                            "PipecatChat.useEffect.initClient": ()=>{
                                console.log('[PIPECAT] Disconnected from bot');
                                setIsConnected(false);
                                setIsConnecting(false);
                                setIsMicEnabled(false);
                            }
                        }["PipecatChat.useEffect.initClient"]);
                        client.on('error', {
                            "PipecatChat.useEffect.initClient": (error)=>{
                                console.error('[PIPECAT] Error:', error);
                                setIsConnecting(false);
                            }
                        }["PipecatChat.useEffect.initClient"]);
                        clientRef.current = client;
                    } catch (error) {
                        console.error('[PIPECAT] Failed to initialize client:', error);
                    }
                }
            }["PipecatChat.useEffect.initClient"];
            initClient();
            return ({
                "PipecatChat.useEffect": ()=>{
                    if (clientRef.current?.isConnected()) {
                        clientRef.current.disconnect();
                    }
                }
            })["PipecatChat.useEffect"];
        }
    }["PipecatChat.useEffect"], []);
    // Auto-scroll to latest message
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PipecatChat.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["PipecatChat.useEffect"], [
        messages
    ]);
    const connect = async ()=>{
        if (!clientRef.current || isConnecting) return;
        setIsConnecting(true);
        try {
            await clientRef.current.startBotAndConnect({
                endpoint: `${("TURBOPACK compile-time value", "http://localhost:3001") || '/api'}/pipecat/connect`,
                requestData: {
                    alertId
                }
            });
        } catch (error) {
            console.error('[PIPECAT] Connection failed:', error);
            setIsConnecting(false);
        }
    };
    const disconnect = async ()=>{
        if (!clientRef.current) return;
        try {
            await clientRef.current.disconnect();
            setIsMicEnabled(false);
        } catch (error) {
            console.error('[PIPECAT] Disconnect failed:', error);
        }
    };
    const toggleMic = async ()=>{
        if (!clientRef.current || !isConnected) return;
        try {
            if (isMicEnabled) {
                await clientRef.current.disableMic();
                setIsMicEnabled(false);
            } else {
                await clientRef.current.enableMic();
                setIsMicEnabled(true);
            }
        } catch (error) {
            console.error('[PIPECAT] Mic toggle failed:', error);
        }
    };
    const sendMessage = async ()=>{
        if (!input.trim() || !clientRef.current || !isConnected) return;
        const userMessage = input.trim();
        // Add user message to display
        setMessages((prev)=>[
                ...prev,
                {
                    role: 'user',
                    content: userMessage,
                    timestamp: Date.now()
                }
            ]);
        setInput('');
        setIsLoading(true);
        try {
            // Send message to bot via text transport
            await clientRef.current.sendMessage(userMessage);
        } catch (error) {
            console.error('[PIPECAT] Failed to send message:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-zinc-50 dark:bg-zinc-950",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-sm",
                                children: "Voice Chat Assistant"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500 dark:text-zinc-400",
                                children: isConnected ? 'Connected' : 'Disconnected'
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: toggleMic,
                                    size: "sm",
                                    variant: isMicEnabled ? 'default' : 'outline',
                                    className: "text-xs",
                                    children: [
                                        isMicEnabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                            className: "h-3.5 w-3.5 mr-1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                            className: "h-3.5 w-3.5 mr-1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, this),
                                        isMicEnabled ? 'Mic On' : 'Mic Off'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: disconnect,
                                    size: "sm",
                                    variant: "destructive",
                                    className: "text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOff$3e$__["PhoneOff"], {
                                            className: "h-3.5 w-3.5 mr-1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        "End Call"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: connect,
                            size: "sm",
                            disabled: isConnecting,
                            className: "text-xs bg-teal-600 hover:bg-teal-700",
                            children: isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-3.5 w-3.5 mr-1.5 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                        lineNumber: 220,
                                        columnNumber: 19
                                    }, this),
                                    "Connecting..."
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        className: "h-3.5 w-3.5 mr-1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                        lineNumber: 225,
                                        columnNumber: 19
                                    }, this),
                                    "Start Call"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-3",
                children: [
                    messages.length === 0 && !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-zinc-500 dark:text-zinc-400 mb-3",
                                    children: "Connect to start voice chat"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: connect,
                                    disabled: isConnecting,
                                    className: "bg-teal-600 hover:bg-teal-700",
                                    children: isConnecting ? 'Connecting...' : 'Start Voice Chat'
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this),
                    messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-xs lg:max-w-md text-sm rounded-lg p-3 ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "whitespace-pre-wrap break-words",
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs opacity-70 mt-1 block",
                                        children: new Date(msg.timestamp).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this)),
                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg p-3 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Thinking..."
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-zinc-200 dark:border-zinc-800 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: input,
                            onChange: (e)=>setInput(e.target.value),
                            onKeyDown: handleKeyDown,
                            placeholder: "Type or speak...",
                            disabled: isLoading,
                            className: "flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: sendMessage,
                            disabled: !input.trim() || isLoading,
                            className: "bg-teal-600 hover:bg-teal-700 text-white",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                lineNumber: 307,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                                lineNumber: 309,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                            lineNumber: 301,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                    lineNumber: 291,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
                lineNumber: 290,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(PipecatChat, "k+GdvP9JMXhNf16E6AAklQfOeys=");
_c = PipecatChat;
var _c;
__turbopack_context__.k.register(_c, "PipecatChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArticlePanel",
    ()=>ArticlePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$PipecatChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/PipecatChat.tsx [app-client] (ecmascript)");
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
;
function ArticlePanel({ open, onOpenChange, alert, loading }) {
    _s();
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [chatLoading, setChatLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPipecatChat, setShowPipecatChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    console.log(`[PANEL] ArticlePanel RENDER - open=${open}, loading=${loading}, alertId=${alert?.id}, articleCount=${alert?.articles?.length || 0}`);
    if (!loading && alert?.articles && alert.articles.length === 0) {
        console.warn(`[PANEL] ArticlePanel NO ARTICLES - query="${alert.query}", region="${alert.region}"`);
    }
    // Scroll to bottom when new messages arrive
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArticlePanel.useEffect": ()=>{
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
    }["ArticlePanel.useEffect"], [
        chatMessages
    ]);
    // Reset chat when alert changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArticlePanel.useEffect": ()=>{
            setChatMessages([]);
            setChatInput('');
        }
    }["ArticlePanel.useEffect"], [
        alert?.id
    ]);
    const handleSendMessage = async ()=>{
        console.log(`[PANEL] handleSendMessage START - chatInput="${chatInput}", alertId=${alert?.id}, chatLoading=${chatLoading}`);
        if (!chatInput.trim() || !alert?.id || chatLoading) {
            console.log(`[PANEL] handleSendMessage EARLY RETURN - trim=${!!chatInput.trim()}, hasAlertId=${!!alert?.id}, chatLoading=${chatLoading}`);
            return;
        }
        const userMessage = chatInput.trim();
        console.log(`[PANEL] handleSendMessage - userMessage="${userMessage.substring(0, 50)}..."`);
        setChatInput('');
        setChatMessages((prev)=>{
            console.log(`[PANEL] adding user message, new count=${prev.length + 1}`);
            return [
                ...prev,
                {
                    role: 'user',
                    content: userMessage
                }
            ];
        });
        setChatLoading(true);
        console.log(`[PANEL] calling API for alertId=${alert.id}`);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatWithArticles"])(alert.id, userMessage);
            console.log(`[PANEL] API returned agentId=${response.agentId}, responseLength=${response.response.length}`);
            setChatMessages((prev)=>{
                console.log(`[PANEL] adding assistant message, new count=${prev.length + 1}`);
                return [
                    ...prev,
                    {
                        role: 'assistant',
                        content: response.response
                    }
                ];
            });
        } catch (error) {
            console.error('[PANEL] Chat API error:', error instanceof Error ? error.message : String(error));
            console.error('[PANEL] Full error:', error);
            setChatMessages((prev)=>{
                console.log(`[PANEL] adding error message`);
                return [
                    ...prev,
                    {
                        role: 'assistant',
                        content: 'Sorry, I encountered an error. Please try again.'
                    }
                ];
            });
        } finally{
            setChatLoading(false);
            console.log(`[PANEL] handleSendMessage DONE`);
        }
    };
    const handleKeyDown = (e)=>{
        console.log(`[PANEL] handleKeyDown - key=${e.key}, shiftKey=${e.shiftKey}`);
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            className: "w-full sm:max-w-md flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-48"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                console.log(`[PANEL] SheetTitle displaying - query="${alert?.query}"`),
                                                alert?.query ?? 'Alert Articles'
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-4 w-32"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                console.log(`[PANEL] SheetDescription displaying - region="${alert?.region}"`),
                                                alert?.region ?? ''
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            alert && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>setShowPipecatChat(!showPipecatChat),
                                variant: showPipecatChat ? 'default' : 'outline',
                                size: "sm",
                                className: "ml-2 shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                    lineNumber: 142,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                showPipecatChat && alert?.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$PipecatChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PipecatChat"], {
                    alertId: alert.id,
                    onClose: ()=>setShowPipecatChat(false)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                    lineNumber: 150,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto mt-6 space-y-4",
                            ref: chatContainerRef,
                            children: [
                                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        console.log(`[PANEL] ArticlePanel LOADING state`),
                                        Array.from({
                                            length: 3
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleSkeleton, {}, i, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                lineNumber: 159,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true) : alert?.articles && alert.articles.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        console.log(`[PANEL] ArticlePanel DISPLAYING ${alert.articles.length} articles`),
                                        alert.articles.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArticleCard, {
                                                article: article
                                            }, article.id, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                lineNumber: 166,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        console.log(`[PANEL] ArticlePanel EMPTY state - no articles found`),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-zinc-500 dark:text-zinc-400 text-center py-8",
                                            children: "No articles found for this alert."
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true),
                                chatMessages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-zinc-500 dark:text-zinc-400 font-medium",
                                            children: "Chat"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 181,
                                            columnNumber: 19
                                        }, this),
                                        chatMessages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-sm rounded-lg p-3 ${msg.role === 'user' ? 'bg-zinc-100 dark:bg-zinc-800 ml-4' : 'bg-teal-50 dark:bg-teal-900/20 mr-4'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1",
                                                        children: msg.role === 'user' ? 'You' : 'Assistant'
                                                    }, void 0, false, {
                                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "whitespace-pre-wrap",
                                                        children: msg.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                lineNumber: 183,
                                                columnNumber: 21
                                            }, this)),
                                        chatLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-teal-50 dark:bg-teal-900/20 mr-4 rounded-lg p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1",
                                                    children: "Assistant"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm text-zinc-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "h-4 w-4 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Thinking..."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 198,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                    lineNumber: 180,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this),
                        alert && !loading && alert.articles && alert.articles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-zinc-600 dark:text-zinc-400 mb-2",
                                    children: "Ask about these articles"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                    lineNumber: 215,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: chatInput,
                                                    onChange: (e)=>setChatInput(e.target.value),
                                                    onKeyDown: handleKeyDown,
                                                    placeholder: "Ask a question...",
                                                    disabled: chatLoading,
                                                    className: "w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 219,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleSendMessage,
                                            disabled: !chatInput.trim() || chatLoading,
                                            className: "bg-teal-600 hover:bg-teal-700 text-white shrink-0",
                                            children: chatLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                lineNumber: 237,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                                lineNumber: 239,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                    lineNumber: 218,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                            lineNumber: 214,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(ArticlePanel, "qpoo4/ifmW2IiJEaoX7UthrCeuk=");
_c = ArticlePanel;
function ArticleCard({ article }) {
    const publishedDate = article.publishedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(article.publishedAt), 'MMM d, yyyy') : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-medium text-sm leading-tight line-clamp-2",
                        children: article.title
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon-xs",
                        asChild: true,
                        className: "shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: article.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": "Open article",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                            lineNumber: 269,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            article.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3",
                children: article.summary
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: article.source
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    publishedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            publishedDate
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    article.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this),
                            article.author
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this),
                    article.locationCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this),
                            article.locationCount,
                            " location",
                            article.locationCount !== 1 ? 's' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this),
            article.sentiment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `inline-block text-xs px-2 py-0.5 rounded-full ${article.sentiment === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : article.sentiment === 'negative' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`,
                children: article.sentiment
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 311,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
_c1 = ArticleCard;
function ArticleSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-4 w-full"
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-4 w-3/4"
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "h-12 w-full"
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-3 w-16"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-3 w-20"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-3 w-14"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_c2 = ArticleSkeleton;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ArticlePanel");
__turbopack_context__.k.register(_c1, "ArticleCard");
__turbopack_context__.k.register(_c2, "ArticleSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/hooks/useTTS.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTTS",
    ()=>useTTS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useTTS(options) {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[cleanup]": ()=>{
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current = null;
            }
            if (audioUrlRef.current) {
                URL.revokeObjectURL(audioUrlRef.current);
                audioUrlRef.current = null;
            }
        }
    }["useTTS.useCallback[cleanup]"], []);
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[speak]": async (text)=>{
            if (!text.trim()) {
                console.log("[useTTS] No text to speak");
                return;
            }
            console.log(`[useTTS] Starting TTS for text: "${text.substring(0, 50)}..."`);
            cleanup();
            setIsLoading(true);
            setError(null);
            try {
                console.log("[useTTS] Calling textToSpeech API...");
                const audioBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textToSpeech"])(text, options?.voice ?? "nova");
                console.log(`[useTTS] Got audio blob: size=${audioBlob.size}, type=${audioBlob.type}`);
                const audioUrl = URL.createObjectURL(audioBlob);
                audioUrlRef.current = audioUrl;
                console.log(`[useTTS] Created blob URL: ${audioUrl}`);
                const audio = new Audio(audioUrl);
                audioRef.current = audio;
                audio.onplay = ({
                    "useTTS.useCallback[speak]": ()=>{
                        console.log("[useTTS] Audio playing");
                        setIsPlaying(true);
                        options?.onStart?.();
                    }
                })["useTTS.useCallback[speak]"];
                audio.onended = ({
                    "useTTS.useCallback[speak]": ()=>{
                        console.log("[useTTS] Audio ended");
                        setIsPlaying(false);
                        options?.onEnd?.();
                        cleanup();
                    }
                })["useTTS.useCallback[speak]"];
                audio.onerror = ({
                    "useTTS.useCallback[speak]": (e)=>{
                        console.error("[useTTS] Audio error:", e);
                        const err = new Error("Failed to play audio");
                        setError(err.message);
                        setIsPlaying(false);
                        options?.onError?.(err);
                        cleanup();
                    }
                })["useTTS.useCallback[speak]"];
                console.log("[useTTS] Attempting to play audio...");
                await audio.play();
                console.log("[useTTS] audio.play() succeeded");
            } catch (err) {
                console.error("[useTTS] Error:", err);
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error.message);
                options?.onError?.(error);
            } finally{
                setIsLoading(false);
            }
        }
    }["useTTS.useCallback[speak]"], [
        cleanup,
        options
    ]);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[stop]": ()=>{
            cleanup();
            setIsPlaying(false);
        }
    }["useTTS.useCallback[stop]"], [
        cleanup
    ]);
    return {
        speak,
        stop,
        isLoading,
        isPlaying,
        error
    };
}
_s(useTTS, "dNO4fG5U/10prYM3ySE0+V5DSJ4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioWaveform",
    ()=>AudioWaveform,
    "WaveformIndicator",
    ()=>WaveformIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function AudioWaveform({ state, className, barCount = 5 }) {
    const bars = Array.from({
        length: barCount
    }, (_, i)=>i);
    const getBarClasses = (index)=>{
        const baseDelay = index * 0.1;
        switch(state){
            case "listening":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-red-500 dark:bg-red-400", "animate-[waveform_0.5s_ease-in-out_infinite]");
            case "speaking":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-emerald-500 dark:bg-emerald-400", "animate-[waveform_0.4s_ease-in-out_infinite]");
            case "thinking":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-amber-500 dark:bg-amber-400", "animate-[pulse_1s_ease-in-out_infinite]");
            default:
                return "bg-zinc-300 dark:bg-zinc-600";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-label": state === "listening" ? "Listening for speech" : state === "speaking" ? "Speaking response" : state === "thinking" ? "Processing" : "Idle",
        className: "jsx-57a60a3ba3456ce" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center gap-1", className) || ""),
        children: [
            bars.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        animationDelay: `${i * 0.1}s`,
                        height: state === "idle" ? "8px" : undefined
                    },
                    className: "jsx-57a60a3ba3456ce" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-1 rounded-full transition-all duration-150", state === "idle" ? "h-2" : "h-4", getBarClasses(i)) || "")
                }, i, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "57a60a3ba3456ce",
                children: "@keyframes waveform{0%,to{height:8px}50%{height:24px}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = AudioWaveform;
function WaveformIndicator({ state, label, className }) {
    const defaultLabels = {
        idle: "Ready",
        listening: "Listening...",
        speaking: "Speaking...",
        thinking: "Thinking..."
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AudioWaveform, {
                state: state
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium", state === "listening" && "text-red-600 dark:text-red-400", state === "speaking" && "text-emerald-600 dark:text-emerald-400", state === "thinking" && "text-amber-600 dark:text-amber-400", state === "idle" && "text-zinc-500 dark:text-zinc-400"),
                children: label ?? defaultLabels[state]
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c1 = WaveformIndicator;
var _c, _c1;
__turbopack_context__.k.register(_c, "AudioWaveform");
__turbopack_context__.k.register(_c1, "WaveformIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceChatPanel",
    ()=>VoiceChatPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/hooks/useSpeechRecognition.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useTTS$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/hooks/useTTS.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$AudioWaveform$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/AudioWaveform.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
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
;
function VoiceChatPanel({ open, onOpenChange, alertId, alertQuery }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [autoSpeak, setAutoSpeak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { isSupported: sttSupported, isListening, transcript, interimTranscript, error: sttError, start: startListening, stop: stopListening, reset: resetTranscript } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"])({
        continuous: true
    });
    const { speak, stop: stopSpeaking, isLoading: ttsLoading, isPlaying: isSpeaking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useTTS$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTTS"])({
        voice: "nova"
    });
    // Determine waveform state
    const getWaveformState = ()=>{
        if (isListening) return "listening";
        if (isSpeaking) return "speaking";
        if (isProcessing || ttsLoading) return "thinking";
        return "idle";
    };
    const waveformState = getWaveformState();
    // Send message to chat API
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VoiceChatPanel.useCallback[sendMessage]": async (text)=>{
            if (!alertId || !text.trim()) return;
            const userMessage = {
                role: "user",
                content: text.trim(),
                timestamp: new Date()
            };
            setMessages({
                "VoiceChatPanel.useCallback[sendMessage]": (prev)=>[
                        ...prev,
                        userMessage
                    ]
            }["VoiceChatPanel.useCallback[sendMessage]"]);
            setIsProcessing(true);
            setError(null);
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatWithArticles"])(alertId, text.trim());
                const assistantMessage = {
                    role: "assistant",
                    content: response.response,
                    timestamp: new Date()
                };
                setMessages({
                    "VoiceChatPanel.useCallback[sendMessage]": (prev)=>[
                            ...prev,
                            assistantMessage
                        ]
                }["VoiceChatPanel.useCallback[sendMessage]"]);
                // Auto-speak response if enabled
                if (autoSpeak && response.response) {
                    speak(response.response);
                }
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : String(err);
                setError(errorMsg);
            } finally{
                setIsProcessing(false);
            }
        }
    }["VoiceChatPanel.useCallback[sendMessage]"], [
        alertId,
        autoSpeak,
        speak
    ]);
    // Handle mic toggle
    const handleMicToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VoiceChatPanel.useCallback[handleMicToggle]": ()=>{
            if (isListening) {
                stopListening();
                const fullTranscript = (transcript + " " + interimTranscript).trim();
                if (fullTranscript) {
                    sendMessage(fullTranscript);
                }
                resetTranscript();
            } else {
                // Stop any playing audio before listening
                stopSpeaking();
                resetTranscript();
                startListening();
            }
        }
    }["VoiceChatPanel.useCallback[handleMicToggle]"], [
        isListening,
        stopListening,
        transcript,
        interimTranscript,
        sendMessage,
        resetTranscript,
        stopSpeaking,
        startListening
    ]);
    // Clear chat when alert changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceChatPanel.useEffect": ()=>{
            setMessages([]);
            setError(null);
        }
    }["VoiceChatPanel.useEffect"], [
        alertId
    ]);
    // Live transcript
    const liveTranscript = (transcript + " " + interimTranscript).trim();
    if (!alertId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
            open: open,
            onOpenChange: onOpenChange,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                side: "right",
                className: "w-[320px] sm:w-[380px] flex flex-col",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                            children: "Voice Chat"
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                            children: "Select an alert to start voice chat with its articles."
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "w-[320px] sm:w-[380px] flex flex-col p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-4 py-3 border-b",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-sm font-semibold",
                                    children: "Voice Chat"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                alertQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground truncate max-w-[200px]",
                                    children: alertQuery
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            onClick: ()=>setAutoSpeak(!autoSpeak),
                            className: "h-8 w-8",
                            title: autoSpeak ? "Disable auto-speak" : "Enable auto-speak",
                            children: autoSpeak ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-4 px-4 border-b bg-zinc-50 dark:bg-zinc-900",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$AudioWaveform$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WaveformIndicator"], {
                        state: waveformState
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-4 py-3 space-y-3",
                    children: [
                        messages.length === 0 && !isListening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-sm text-muted-foreground py-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Click the microphone to ask a question"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs",
                                    children: "about your alert's articles"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this),
                        messages.map((message, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg px-3 py-2 text-sm", message.role === "user" ? "bg-zinc-100 dark:bg-zinc-800 ml-8" : "bg-emerald-50 dark:bg-emerald-950 mr-8 border border-emerald-200 dark:border-emerald-800"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "whitespace-pre-wrap",
                                    children: message.content
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)),
                        isListening && liveTranscript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg px-3 py-2 text-sm bg-red-50 dark:bg-red-950 ml-8 border border-red-200 dark:border-red-800 opacity-70",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "whitespace-pre-wrap",
                                children: liveTranscript
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this),
                        isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg px-3 py-2 text-sm bg-amber-50 dark:bg-amber-950 mr-8 border border-amber-200 dark:border-amber-800",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-amber-700 dark:text-amber-300",
                                children: "Thinking..."
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                                lineNumber: 231,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this),
                (error || sttError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-2 bg-red-50 dark:bg-red-950 border-t border-red-200 dark:border-red-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-600 dark:text-red-400",
                        children: error || sttError
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-t flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleMicToggle,
                        disabled: !sttSupported || isProcessing || ttsLoading,
                        variant: isListening ? "destructive" : "default",
                        size: "lg",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full h-16 w-16 shadow-lg", isListening && "animate-pulse"),
                        children: isListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                            className: "h-6 w-6"
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 258,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                            className: "h-6 w-6"
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                            lineNumber: 260,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 pb-4 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: !sttSupported ? "Speech recognition not supported" : isListening ? "Tap to stop and send" : isProcessing ? "Getting response..." : isSpeaking ? "Playing response..." : "Tap to speak"
                    }, void 0, false, {
                        fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
            lineNumber: 164,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_s(VoiceChatPanel, "ARWUJopKoXDSqz8GLpjguc81++M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useSpeechRecognition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useTTS$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTTS"]
    ];
});
_c = VoiceChatPanel;
var _c;
__turbopack_context__.k.register(_c, "VoiceChatPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/components/alerts/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/CreateAlertForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$AlertList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/AlertList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$AlertDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/AlertDetail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$AlertSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$ArticlePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$VoiceChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/hooks/useAlerts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAlerts",
    ()=>useAlerts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const POLLING_INTERVAL = 3000; // Poll every 3 seconds when processing
function useAlerts() {
    _s();
    const [alerts, setAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAlertId, setSelectedAlertId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAlert, setSelectedAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locations, setLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [locationsLoading, setLocationsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pollingIntervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Check if any alerts are processing
    const hasProcessingAlerts = alerts.some((a)=>a.processingStatus === 'PROCESSING');
    const loadAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAlerts.useCallback[loadAlerts]": async ()=>{
            console.log(`[HOOK] loadAlerts START`);
            setLoading(true);
            setError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listAlerts"])();
                console.log(`[HOOK] loadAlerts SUCCESS - count=${data.length}, processingCount=${data.filter({
                    "useAlerts.useCallback[loadAlerts]": (a)=>a.processingStatus === 'PROCESSING'
                }["useAlerts.useCallback[loadAlerts]"]).length}`);
                setAlerts(data);
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Failed to load alerts';
                console.error(`[HOOK] loadAlerts FAILED - error=${errorMsg}`);
                setError(errorMsg);
                setAlerts([]);
            } finally{
                setLoading(false);
            }
        }
    }["useAlerts.useCallback[loadAlerts]"], []);
    const loadLocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAlerts.useCallback[loadLocations]": async (alertIds)=>{
            console.log(`[HOOK] loadLocations START - alertIds=${JSON.stringify(alertIds)}`);
            setLocationsLoading(true);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlertsLocations"])(alertIds);
                console.log(`[HOOK] loadLocations SUCCESS - featureCount=${data.features.length}`);
                setLocations(data);
            } catch (err) {
                console.error(`[HOOK] loadLocations FAILED - error=${err instanceof Error ? err.message : String(err)}`);
                // Silently fail - user may not have alerts or be logged in
                setLocations({
                    type: 'FeatureCollection',
                    features: []
                });
            } finally{
                setLocationsLoading(false);
            }
        }
    }["useAlerts.useCallback[loadLocations]"], []);
    const selectAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAlerts.useCallback[selectAlert]": async (alertId)=>{
            console.log(`[HOOK] selectAlert START - alertId=${alertId}`);
            setSelectedAlertId(alertId);
            if (alertId === null) {
                console.log(`[HOOK] selectAlert DESELECTING - loading all locations`);
                setSelectedAlert(null);
                // Load all locations when deselecting
                await loadLocations();
            } else {
                console.log(`[HOOK] selectAlert SELECTING - loading alert detail and locations`);
                // Load specific alert details and its locations
                try {
                    const [alertDetail] = await Promise.all([
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlert"])(alertId),
                        loadLocations([
                            alertId
                        ])
                    ]);
                    console.log(`[HOOK] selectAlert SUCCESS - alertId=${alertId}, query="${alertDetail.query}"`);
                    setSelectedAlert(alertDetail);
                } catch (err) {
                    console.error(`[HOOK] selectAlert FAILED - alertId=${alertId}, error=${err instanceof Error ? err.message : String(err)}`);
                    setSelectedAlert(null);
                }
            }
        }
    }["useAlerts.useCallback[selectAlert]"], [
        loadLocations
    ]);
    const refreshAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAlerts.useCallback[refreshAll]": async ()=>{
            console.log(`[HOOK] refreshAll START - selectedAlertId=${selectedAlertId}`);
            await Promise.all([
                loadAlerts(),
                loadLocations(selectedAlertId ? [
                    selectedAlertId
                ] : undefined)
            ]);
            console.log(`[HOOK] refreshAll SUCCESS`);
        }
    }["useAlerts.useCallback[refreshAll]"], [
        loadAlerts,
        loadLocations,
        selectedAlertId
    ]);
    // Initial load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAlerts.useEffect": ()=>{
            console.log(`[HOOK] useAlerts INITIAL LOAD`);
            loadAlerts();
            loadLocations();
        }
    }["useAlerts.useEffect"], [
        loadAlerts,
        loadLocations
    ]);
    // Polling effect for processing alerts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAlerts.useEffect": ()=>{
            // Clear any existing polling
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
            // Start polling if we have processing alerts
            if (hasProcessingAlerts) {
                console.log(`[HOOK] Starting polling for processing alerts`);
                pollingIntervalRef.current = setInterval({
                    "useAlerts.useEffect": async ()=>{
                        console.log(`[HOOK] Polling for alert updates...`);
                        try {
                            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listAlerts"])();
                            const stillProcessing = data.filter({
                                "useAlerts.useEffect.stillProcessing": (a)=>a.processingStatus === 'PROCESSING'
                            }["useAlerts.useEffect.stillProcessing"]);
                            console.log(`[HOOK] Poll result - total=${data.length}, stillProcessing=${stillProcessing.length}`);
                            setAlerts(data);
                            // If an alert just finished processing and is currently selected, reload it
                            if (selectedAlertId) {
                                const selectedAlertData = data.find({
                                    "useAlerts.useEffect.selectedAlertData": (a)=>a.id === selectedAlertId
                                }["useAlerts.useEffect.selectedAlertData"]);
                                if (selectedAlertData && selectedAlertData.processingStatus !== 'PROCESSING') {
                                    console.log(`[HOOK] Selected alert finished processing, reloading details and locations`);
                                    const [alertDetail] = await Promise.all([
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlert"])(selectedAlertId),
                                        loadLocations([
                                            selectedAlertId
                                        ])
                                    ]);
                                    setSelectedAlert(alertDetail);
                                }
                            }
                            // If no more processing alerts, also refresh locations
                            if (stillProcessing.length === 0) {
                                console.log(`[HOOK] All alerts finished processing, refreshing locations`);
                                await loadLocations(selectedAlertId ? [
                                    selectedAlertId
                                ] : undefined);
                            }
                        } catch (err) {
                            console.error(`[HOOK] Polling error:`, err);
                        }
                    }
                }["useAlerts.useEffect"], POLLING_INTERVAL);
            }
            return ({
                "useAlerts.useEffect": ()=>{
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                }
            })["useAlerts.useEffect"];
        }
    }["useAlerts.useEffect"], [
        hasProcessingAlerts,
        selectedAlertId,
        loadLocations
    ]);
    return {
        alerts,
        selectedAlertId,
        selectedAlert,
        locations,
        loading,
        locationsLoading,
        error,
        hasProcessingAlerts,
        loadAlerts,
        selectAlert,
        loadLocations,
        refreshAll
    };
}
_s(useAlerts, "X3maGcUcocOEx2kYKGarPFBDQYU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/lib/map-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_FIT_BOUNDS_OPTIONS",
    ()=>DEFAULT_FIT_BOUNDS_OPTIONS,
    "calculateBounds",
    ()=>calculateBounds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$turf$2f$bbox$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@turf/bbox/dist/esm/index.js [app-client] (ecmascript)");
;
function calculateBounds(geojson) {
    if (!geojson.features || geojson.features.length === 0) {
        return null;
    }
    // Filter to ensure we have valid Point geometries
    const validFeatures = geojson.features.filter((f)=>f.geometry?.type === 'Point' && Array.isArray(f.geometry.coordinates) && f.geometry.coordinates.length >= 2);
    if (validFeatures.length === 0) {
        return null;
    }
    // If only one point, return a small bounding box around it
    if (validFeatures.length === 1) {
        const [lng, lat] = validFeatures[0].geometry.coordinates;
        const padding = 0.01; // ~1km padding
        return [
            [
                lng - padding,
                lat - padding
            ],
            [
                lng + padding,
                lat + padding
            ]
        ];
    }
    // bbox returns [west, south, east, north] = [minLng, minLat, maxLng, maxLat]
    const [minLng, minLat, maxLng, maxLat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$turf$2f$bbox$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        type: 'FeatureCollection',
        features: validFeatures
    });
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
const DEFAULT_FIT_BOUNDS_OPTIONS = {
    padding: 50,
    maxZoom: 14,
    duration: 500
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/repos/map-searcher/client/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/map/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$map$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/map/map-container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$LocationPins$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/map/LocationPins.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$AgentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/AgentInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/auth/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$UserHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/auth/UserHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/CreateAlertDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$AlertSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/AlertSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$ArticlePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/ArticlePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$VoiceChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/alerts/VoiceChatPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useAlerts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/hooks/useAlerts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/lib/map-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
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
;
function Home() {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [createDialogOpen, setCreateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [articlePanelOpen, setArticlePanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceChatOpen, setVoiceChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { alerts, selectedAlertId, selectedAlert, locations, loading, locationsLoading, hasProcessingAlerts, selectAlert, refreshAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useAlerts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAlerts"])();
    // Fit map to bounds when locations change
    const fitMapToBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[fitMapToBounds]": ()=>{
            console.log(`[PAGE] fitMapToBounds - locations=${locations?.features.length || 0}, mapRef=${!!mapRef.current}`);
            if (!locations || !mapRef.current) {
                console.log(`[PAGE] fitMapToBounds SKIPPED - no locations or mapRef`);
                return;
            }
            const bounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBounds"])(locations);
            console.log(`[PAGE] fitMapToBounds - bounds=${bounds ? `[${bounds[0]}, ${bounds[1]}, ${bounds[2]}, ${bounds[3]}]` : 'null'}`);
            if (bounds) {
                console.log(`[PAGE] fitMapToBounds FITTING map to bounds`);
                mapRef.current.fitBounds(bounds, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$lib$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FIT_BOUNDS_OPTIONS"]);
            }
        }
    }["Home.useCallback[fitMapToBounds]"], [
        locations
    ]);
    // Fit bounds when an alert is selected and locations load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            console.log(`[PAGE] fitBounds effect - selectedAlertId=${selectedAlertId}, featureCount=${locations?.features.length || 0}`);
            if (selectedAlertId && locations && locations.features.length > 0) {
                console.log(`[PAGE] fitBounds effect CALLING fitMapToBounds`);
                fitMapToBounds();
            }
        }
    }["Home.useEffect"], [
        selectedAlertId,
        locations,
        fitMapToBounds
    ]);
    const handleAlertSelect = (alertId)=>{
        console.log(`[PAGE] handleAlertSelect - alertId=${alertId}`);
        selectAlert(alertId);
        if (alertId) {
            console.log(`[PAGE] handleAlertSelect OPENING article panel`);
            setArticlePanelOpen(true);
        }
    };
    const handleAlertCreated = ()=>{
        console.log(`[PAGE] handleAlertCreated - refreshing all data`);
        refreshAll();
    };
    const hasLocations = locations && locations.features.length > 0;
    const hasAlerts = alerts.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProtectedRoute"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen min-h-[100dvh] flex-col bg-zinc-50 font-sans dark:bg-black",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$auth$2f$UserHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserHeader"], {}, void 0, false, {
                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    id: "main-content",
                    className: "mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-8",
                    "aria-label": "Main content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-3 sm:mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50",
                                    children: "Weave Hacks – Voice"
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateAlertDialogTrigger"], {
                                    onOpenChange: setCreateDialogOpen
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        hasAlerts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$AlertSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertSelector"], {
                                            alerts: alerts,
                                            selectedAlertId: selectedAlertId,
                                            onSelect: handleAlertSelect,
                                            disabled: loading
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        selectedAlertId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: ()=>setArticlePanelOpen(true),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    className: "h-4 w-4 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 21
                                                }, this),
                                                "Articles"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                hasProcessingAlerts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Processing alerts... Results will appear when ready."
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$map$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                            ref: mapRef,
                            className: "h-[280px] w-full min-h-[220px] rounded-lg border border-zinc-200 overflow-hidden sm:h-[400px] sm:min-h-[300px] dark:border-zinc-800",
                            interactiveLayerIds: __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$LocationPins$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCATION_PINS_LAYER_IDS"],
                            children: !locationsLoading && hasLocations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$map$2f$LocationPins$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocationPins"], {
                                data: locations
                            }, void 0, false, {
                                fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        selectedAlertId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mt-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-zinc-600 sm:text-base dark:text-zinc-400",
                                            children: "Chat with your alert's articles below."
                                        }, void 0, false, {
                                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this),
                                        hasLocations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-zinc-500 dark:text-zinc-400",
                                            children: [
                                                locations.features.length,
                                                " location",
                                                locations.features.length !== 1 ? "s" : "",
                                                " on map"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$AgentInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgentInput"], {
                                    selectedAlertId: selectedAlertId,
                                    onVoiceClick: ()=>setVoiceChatOpen(true)
                                }, void 0, false, {
                                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$CreateAlertDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateAlertDialog"], {
                            open: createDialogOpen,
                            onOpenChange: setCreateDialogOpen,
                            onCreated: handleAlertCreated
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$ArticlePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArticlePanel"], {
                            open: articlePanelOpen,
                            onOpenChange: setArticlePanelOpen,
                            alert: selectedAlert,
                            loading: locationsLoading && selectedAlertId !== null
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$components$2f$alerts$2f$VoiceChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VoiceChatPanel"], {
                            open: voiceChatOpen,
                            onOpenChange: setVoiceChatOpen,
                            alertId: selectedAlertId,
                            alertQuery: selectedAlert?.query
                        }, void 0, false, {
                            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/repos/map-searcher/client/src/app/page.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(Home, "0jn7ytl7OfcnpaaFavXhQJfhEY0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$src$2f$hooks$2f$useAlerts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAlerts"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=repos_map-searcher_client_src_8d3ee79a._.js.map