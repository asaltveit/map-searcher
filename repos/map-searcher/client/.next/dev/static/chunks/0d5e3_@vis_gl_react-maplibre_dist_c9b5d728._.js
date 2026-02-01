(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-map.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapProvider",
    ()=>MapProvider,
    "MountedMapsContext",
    ()=>MountedMapsContext,
    "useMap",
    ()=>useMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
;
;
;
const MountedMapsContext = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
const MapProvider = (props)=>{
    const [maps, setMaps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const onMapMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapProvider.useCallback[onMapMount]": (map, id = 'default')=>{
            setMaps({
                "MapProvider.useCallback[onMapMount]": (currMaps)=>{
                    if (id === 'current') {
                        throw new Error("'current' cannot be used as map id");
                    }
                    if (currMaps[id]) {
                        throw new Error(`Multiple maps with the same id: ${id}`);
                    }
                    return {
                        ...currMaps,
                        [id]: map
                    };
                }
            }["MapProvider.useCallback[onMapMount]"]);
        }
    }["MapProvider.useCallback[onMapMount]"], []);
    const onMapUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapProvider.useCallback[onMapUnmount]": (id = 'default')=>{
            setMaps({
                "MapProvider.useCallback[onMapUnmount]": (currMaps)=>{
                    if (currMaps[id]) {
                        const nextMaps = {
                            ...currMaps
                        };
                        delete nextMaps[id];
                        return nextMaps;
                    }
                    return currMaps;
                }
            }["MapProvider.useCallback[onMapUnmount]"]);
        }
    }["MapProvider.useCallback[onMapUnmount]"], []);
    return __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](MountedMapsContext.Provider, {
        value: {
            maps,
            onMapMount,
            onMapUnmount
        }
    }, props.children);
};
function useMap() {
    const maps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MountedMapsContext)?.maps;
    const currentMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const mapsWithCurrent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMap.useMemo[mapsWithCurrent]": ()=>{
            return {
                ...maps,
                current: currentMap?.map
            };
        }
    }["useMap.useMemo[mapsWithCurrent]"], [
        maps,
        currentMap
    ]);
    return mapsWithCurrent;
} //# sourceMappingURL=use-map.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */ __turbopack_context__.s([
    "arePointsEqual",
    ()=>arePointsEqual,
    "deepEqual",
    ()=>deepEqual
]);
function arePointsEqual(a, b) {
    const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
    const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
    const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
    const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
    return ax === bx && ay === by;
}
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for(let i = 0; i < a.length; i++){
            if (!deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Array.isArray(b)) {
        return false;
    }
    if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (const key of aKeys){
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
} //# sourceMappingURL=deep-equal.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/transform.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyViewStateToTransform",
    ()=>applyViewStateToTransform,
    "transformToViewState",
    ()=>transformToViewState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)");
;
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
function applyViewStateToTransform(/** An object that describes Maplibre's camera state */ tr, /** Props from Map component */ props) {
    const v = props.viewState || props;
    const changes = {};
    if ('longitude' in v && 'latitude' in v && (v.longitude !== tr.center.lng || v.latitude !== tr.center.lat)) {
        const LngLat = tr.center.constructor;
        // @ts-expect-error we should not import LngLat class from maplibre-gl because we don't know the source of mapLib
        changes.center = new LngLat(v.longitude, v.latitude);
    }
    if ('zoom' in v && v.zoom !== tr.zoom) {
        changes.zoom = v.zoom;
    }
    if ('bearing' in v && v.bearing !== tr.bearing) {
        changes.bearing = v.bearing;
    }
    if ('pitch' in v && v.pitch !== tr.pitch) {
        changes.pitch = v.pitch;
    }
    if (v.padding && tr.padding && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(v.padding, tr.padding)) {
        changes.padding = v.padding;
    }
    return changes;
} //# sourceMappingURL=transform.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/style-utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeStyle",
    ()=>normalizeStyle
]);
const refProps = [
    'type',
    'source',
    'source-layer',
    'minzoom',
    'maxzoom',
    'filter',
    'layout'
];
function normalizeStyle(style) {
    if (!style) {
        return null;
    }
    if (typeof style === 'string') {
        return style;
    }
    if ('toJS' in style) {
        style = style.toJS();
    }
    if (!style.layers) {
        return style;
    }
    const layerIndex = {};
    for (const layer of style.layers){
        layerIndex[layer.id] = layer;
    }
    const layers = style.layers.map((layer)=>{
        let normalizedLayer = null;
        if ('interactive' in layer) {
            normalizedLayer = Object.assign({}, layer);
            // Breaks style diffing :(
            // @ts-ignore legacy field not typed
            delete normalizedLayer.interactive;
        }
        // Style diffing doesn't work with refs so expand them out manually before diffing.
        // @ts-ignore legacy field not typed
        const layerRef = layerIndex[layer.ref];
        if (layerRef) {
            normalizedLayer = normalizedLayer || Object.assign({}, layer);
            // @ts-ignore
            delete normalizedLayer.ref;
            // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
            for (const propName of refProps){
                if (propName in layerRef) {
                    normalizedLayer[propName] = layerRef[propName];
                }
            }
        }
        return normalizedLayer || layer;
    });
    // Do not mutate the style object provided by the user
    return {
        ...style,
        layers
    };
} //# sourceMappingURL=style-utils.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/maplibre/maplibre.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/transform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$style$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/style-utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
const DEFAULT_STYLE = {
    version: 8,
    sources: {},
    layers: []
};
const pointerEvents = {
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    click: 'onClick',
    dblclick: 'onDblClick',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mouseout: 'onMouseOut',
    contextmenu: 'onContextMenu',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchcancel: 'onTouchCancel'
};
const cameraEvents = {
    movestart: 'onMoveStart',
    move: 'onMove',
    moveend: 'onMoveEnd',
    dragstart: 'onDragStart',
    drag: 'onDrag',
    dragend: 'onDragEnd',
    zoomstart: 'onZoomStart',
    zoom: 'onZoom',
    zoomend: 'onZoomEnd',
    rotatestart: 'onRotateStart',
    rotate: 'onRotate',
    rotateend: 'onRotateEnd',
    pitchstart: 'onPitchStart',
    pitch: 'onPitch',
    pitchend: 'onPitchEnd'
};
const otherEvents = {
    wheel: 'onWheel',
    boxzoomstart: 'onBoxZoomStart',
    boxzoomend: 'onBoxZoomEnd',
    boxzoomcancel: 'onBoxZoomCancel',
    resize: 'onResize',
    load: 'onLoad',
    render: 'onRender',
    idle: 'onIdle',
    remove: 'onRemove',
    data: 'onData',
    styledata: 'onStyleData',
    sourcedata: 'onSourceData',
    error: 'onError'
};
const settingNames = [
    'minZoom',
    'maxZoom',
    'minPitch',
    'maxPitch',
    'maxBounds',
    'projection',
    'renderWorldCopies'
];
const handlerNames = [
    'scrollZoom',
    'boxZoom',
    'dragRotate',
    'dragPan',
    'keyboard',
    'doubleClickZoom',
    'touchZoomRotate',
    'touchPitch'
];
/**
 * A wrapper for mapbox-gl's Map class
 */ class Maplibre {
    constructor(MapClass, props, container){
        // mapboxgl.Map instance
        this._map = null;
        // Internal states
        this._internalUpdate = false;
        this._hoveredFeatures = null;
        this._propsedCameraUpdate = null;
        this._styleComponents = {};
        this._onEvent = (e)=>{
            // @ts-ignore
            const cb = this.props[otherEvents[e.type]];
            if (cb) {
                cb(e);
            } else if (e.type === 'error') {
                console.error(e.error); // eslint-disable-line
            }
        };
        this._onCameraEvent = (e)=>{
            if (this._internalUpdate) {
                return;
            }
            e.viewState = this._propsedCameraUpdate || (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformToViewState"])(this._map.transform);
            // @ts-ignore
            const cb = this.props[cameraEvents[e.type]];
            if (cb) {
                cb(e);
            }
        };
        this._onCameraUpdate = (tr)=>{
            if (this._internalUpdate) {
                return tr;
            }
            this._propsedCameraUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformToViewState"])(tr);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyViewStateToTransform"])(tr, this.props);
        };
        this._onPointerEvent = (e)=>{
            if (e.type === 'mousemove' || e.type === 'mouseout') {
                this._updateHover(e);
            }
            // @ts-ignore
            const cb = this.props[pointerEvents[e.type]];
            if (cb) {
                if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
                    e.features = this._hoveredFeatures || this._queryRenderedFeatures(e.point);
                }
                cb(e);
                delete e.features;
            }
        };
        this._MapClass = MapClass;
        this.props = props;
        this._initialize(container);
    }
    get map() {
        return this._map;
    }
    setProps(props) {
        const oldProps = this.props;
        this.props = props;
        const settingsChanged = this._updateSettings(props, oldProps);
        const sizeChanged = this._updateSize(props);
        const viewStateChanged = this._updateViewState(props);
        this._updateStyle(props, oldProps);
        this._updateStyleComponents(props);
        this._updateHandlers(props, oldProps);
        // If 1) view state has changed to match props and
        //    2) the props change is not triggered by map events,
        // it's driven by an external state change. Redraw immediately
        if (settingsChanged || sizeChanged || viewStateChanged && !this._map.isMoving()) {
            this.redraw();
        }
    }
    static reuse(props, container) {
        const that = Maplibre.savedMaps.pop();
        if (!that) {
            return null;
        }
        const map = that.map;
        // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
        // intoto the new container from the props.
        // Step 1: reparenting child nodes from old container to new container
        const oldContainer = map.getContainer();
        container.className = oldContainer.className;
        while(oldContainer.childNodes.length > 0){
            container.appendChild(oldContainer.childNodes[0]);
        }
        // Step 2: replace the internal container with new container from the react component
        // @ts-ignore
        map._container = container;
        // With maplibre-gl as mapLib, map uses ResizeObserver to observe when its container resizes.
        // When reusing the saved map, we need to disconnect the observer and observe the new container.
        // Step 3: telling the ResizeObserver to disconnect and observe the new container
        // @ts-ignore
        const resizeObserver = map._resizeObserver;
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver.observe(container);
        }
        // Step 4: apply new props
        that.setProps({
            ...props,
            styleDiffing: false
        });
        map.resize();
        const { initialViewState } = props;
        if (initialViewState) {
            if (initialViewState.bounds) {
                map.fitBounds(initialViewState.bounds, {
                    ...initialViewState.fitBoundsOptions,
                    duration: 0
                });
            } else {
                that._updateViewState(initialViewState);
            }
        }
        // Simulate load event
        if (map.isStyleLoaded()) {
            map.fire('load');
        } else {
            map.once('style.load', ()=>map.fire('load'));
        }
        // Force reload
        // @ts-ignore
        map._update();
        return that;
    }
    /* eslint-disable complexity,max-statements */ _initialize(container) {
        const { props } = this;
        const { mapStyle = DEFAULT_STYLE } = props;
        const mapOptions = {
            ...props,
            ...props.initialViewState,
            container,
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$style$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeStyle"])(mapStyle)
        };
        const viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
        Object.assign(mapOptions, {
            center: [
                viewState.longitude || 0,
                viewState.latitude || 0
            ],
            zoom: viewState.zoom || 0,
            pitch: viewState.pitch || 0,
            bearing: viewState.bearing || 0
        });
        if (props.gl) {
            // eslint-disable-next-line
            const getContext = HTMLCanvasElement.prototype.getContext;
            // Hijack canvas.getContext to return our own WebGLContext
            // This will be called inside the mapboxgl.Map constructor
            // @ts-expect-error
            HTMLCanvasElement.prototype.getContext = ()=>{
                // Unhijack immediately
                HTMLCanvasElement.prototype.getContext = getContext;
                return props.gl;
            };
        }
        const map = new this._MapClass(mapOptions);
        // Props that are not part of constructor options
        if (viewState.padding) {
            map.setPadding(viewState.padding);
        }
        if (props.cursor) {
            map.getCanvas().style.cursor = props.cursor;
        }
        // add listeners
        map.transformCameraUpdate = this._onCameraUpdate;
        map.on('style.load', ()=>{
            // Map style has changed, this would have wiped out all settings from props
            this._styleComponents = {
                light: map.getLight(),
                sky: map.getSky(),
                // @ts-ignore getProjection() does not exist in v4
                projection: map.getProjection?.(),
                terrain: map.getTerrain()
            };
            this._updateStyleComponents(this.props);
        });
        map.on('sourcedata', ()=>{
            // Some sources have loaded, we may need them to attach terrain
            this._updateStyleComponents(this.props);
        });
        for(const eventName in pointerEvents){
            map.on(eventName, this._onPointerEvent);
        }
        for(const eventName in cameraEvents){
            map.on(eventName, this._onCameraEvent);
        }
        for(const eventName in otherEvents){
            map.on(eventName, this._onEvent);
        }
        this._map = map;
    }
    /* eslint-enable complexity,max-statements */ recycle() {
        // Clean up unnecessary elements before storing for reuse.
        const container = this.map.getContainer();
        const children = container.querySelector('[mapboxgl-children]');
        children?.remove();
        Maplibre.savedMaps.push(this);
    }
    destroy() {
        this._map.remove();
    }
    // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
    // render cycle, which is managed by Mapbox's animation loop.
    // This removes the synchronization issue caused by requestAnimationFrame.
    redraw() {
        const map = this._map;
        // map._render will throw error if style does not exist
        // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
        //   /src/ui/map.js#L1834
        if (map.style) {
            // cancel the scheduled update
            if (map._frame) {
                map._frame.cancel();
                map._frame = null;
            }
            // the order is important - render() may schedule another update
            map._render();
        }
    }
    /* Trigger map resize if size is controlled
       @param {object} nextProps
       @returns {bool} true if size has changed
     */ _updateSize(nextProps) {
        // Check if size is controlled
        const { viewState } = nextProps;
        if (viewState) {
            const map = this._map;
            if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
                map.resize();
                return true;
            }
        }
        return false;
    }
    // Adapted from map.jumpTo
    /* Update camera to match props
       @param {object} nextProps
       @param {bool} triggerEvents - should fire camera events
       @returns {bool} true if anything is changed
     */ _updateViewState(nextProps) {
        const map = this._map;
        const tr = map.transform;
        const isMoving = map.isMoving();
        // Avoid manipulating the real transform when interaction/animation is ongoing
        // as it would interfere with Mapbox's handlers
        if (!isMoving) {
            const changes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyViewStateToTransform"])(tr, nextProps);
            if (Object.keys(changes).length > 0) {
                this._internalUpdate = true;
                map.jumpTo(changes);
                this._internalUpdate = false;
                return true;
            }
        }
        return false;
    }
    /* Update camera constraints and projection settings to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */ _updateSettings(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        for (const propName of settingNames){
            if (propName in nextProps && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(nextProps[propName], currProps[propName])) {
                changed = true;
                const setter = map[`set${propName[0].toUpperCase()}${propName.slice(1)}`];
                setter?.call(map, nextProps[propName]);
            }
        }
        return changed;
    }
    /* Update map style to match props */ _updateStyle(nextProps, currProps) {
        if (nextProps.cursor !== currProps.cursor) {
            this._map.getCanvas().style.cursor = nextProps.cursor || '';
        }
        if (nextProps.mapStyle !== currProps.mapStyle) {
            const { mapStyle = DEFAULT_STYLE, styleDiffing = true } = nextProps;
            const options = {
                diff: styleDiffing
            };
            if ('localIdeographFontFamily' in nextProps) {
                // @ts-ignore Mapbox specific prop
                options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
            }
            this._map.setStyle((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$style$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeStyle"])(mapStyle), options);
        }
    }
    /* Update fog, light, projection and terrain to match props
     * These props are special because
     * 1. They can not be applied right away. Certain conditions (style loaded, source loaded, etc.) must be met
     * 2. They can be overwritten by mapStyle
     */ _updateStyleComponents({ light, projection, sky, terrain }) {
        const map = this._map;
        const currProps = this._styleComponents;
        // We can safely manipulate map style once it's loaded
        if (map.style._loaded) {
            if (light && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(light, currProps.light)) {
                currProps.light = light;
                map.setLight(light);
            }
            if (projection && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(projection, currProps.projection) && projection !== currProps.projection?.type) {
                currProps.projection = typeof projection === 'string' ? {
                    type: projection
                } : projection;
                // @ts-ignore setProjection does not exist in v4
                map.setProjection?.(currProps.projection);
            }
            if (sky && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(sky, currProps.sky)) {
                currProps.sky = sky;
                map.setSky(sky);
            }
            if (terrain !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(terrain, currProps.terrain)) {
                if (!terrain || map.getSource(terrain.source)) {
                    currProps.terrain = terrain;
                    map.setTerrain(terrain);
                }
            }
        }
    }
    /* Update interaction handlers to match props */ _updateHandlers(nextProps, currProps) {
        const map = this._map;
        for (const propName of handlerNames){
            const newValue = nextProps[propName] ?? true;
            const oldValue = currProps[propName] ?? true;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(newValue, oldValue)) {
                if (newValue) {
                    map[propName].enable(newValue);
                } else {
                    map[propName].disable();
                }
            }
        }
    }
    _queryRenderedFeatures(point) {
        const map = this._map;
        const { interactiveLayerIds = [] } = this.props;
        try {
            return map.queryRenderedFeatures(point, {
                layers: interactiveLayerIds.filter(map.getLayer.bind(map))
            });
        } catch  {
            // May fail if style is not loaded
            return [];
        }
    }
    _updateHover(e) {
        const { props } = this;
        const shouldTrackHoveredFeatures = props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);
        if (shouldTrackHoveredFeatures) {
            const eventType = e.type;
            const wasHovering = this._hoveredFeatures?.length > 0;
            const features = this._queryRenderedFeatures(e.point);
            const isHovering = features.length > 0;
            if (!isHovering && wasHovering) {
                e.type = 'mouseleave';
                this._onPointerEvent(e);
            }
            this._hoveredFeatures = features;
            if (isHovering && !wasHovering) {
                e.type = 'mouseenter';
                this._onPointerEvent(e);
            }
            e.type = eventType;
        } else {
            this._hoveredFeatures = null;
        }
    }
}
Maplibre.savedMaps = [];
const __TURBOPACK__default__export__ = Maplibre;
 //# sourceMappingURL=maplibre.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/maplibre/create-ref.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createRef
]);
/** These methods may break the react binding if called directly */ const skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
function createRef(mapInstance) {
    if (!mapInstance) {
        return null;
    }
    const map = mapInstance.map;
    const result = {
        getMap: ()=>map
    };
    for (const key of getMethodNames(map)){
        // @ts-expect-error
        if (!(key in result) && !skipMethods.includes(key)) {
            result[key] = map[key].bind(map);
        }
    }
    return result;
}
function getMethodNames(obj) {
    const result = new Set();
    let proto = obj;
    while(proto){
        for (const key of Object.getOwnPropertyNames(proto)){
            if (key[0] !== '_' && typeof obj[key] === 'function' && key !== 'fire' && key !== 'setEventedParent') {
                result.add(key);
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
} //# sourceMappingURL=create-ref.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/use-isomorphic-layout-effect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// From https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
// useLayoutEffect but does not trigger warning in server-side rendering
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
const __TURBOPACK__default__export__ = useIsomorphicLayoutEffect;
 //# sourceMappingURL=use-isomorphic-layout-effect.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/set-globals.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>setGlobals
]);
function setGlobals(mapLib, props) {
    const { RTLTextPlugin, maxParallelImageRequests, workerCount, workerUrl } = props;
    if (RTLTextPlugin && mapLib.getRTLTextPluginStatus && mapLib.getRTLTextPluginStatus() === 'unavailable') {
        const { pluginUrl, lazy = true } = typeof RTLTextPlugin === 'string' ? {
            pluginUrl: RTLTextPlugin
        } : RTLTextPlugin;
        mapLib.setRTLTextPlugin(pluginUrl, (error)=>{
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, lazy);
    }
    if (maxParallelImageRequests !== undefined) {
        mapLib.setMaxParallelImageRequests(maxParallelImageRequests);
    }
    if (workerCount !== undefined) {
        mapLib.setWorkerCount(workerCount);
    }
    if (workerUrl !== undefined) {
        mapLib.setWorkerUrl(workerUrl);
    }
} //# sourceMappingURL=set-globals.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Map",
    ()=>Map,
    "MapContext",
    ()=>MapContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$maplibre$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/maplibre/maplibre.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$maplibre$2f$create$2d$ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/maplibre/create-ref.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$use$2d$isomorphic$2d$layout$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/use-isomorphic-layout-effect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$set$2d$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/set-globals.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const MapContext = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
function _Map(props, ref) {
    const mountedMapsContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MountedMapsContext"]);
    const [mapInstance, setMapInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const { current: contextValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        mapLib: null,
        map: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_Map.useEffect": ()=>{
            const mapLib = props.mapLib;
            let isMounted = true;
            let maplibre;
            Promise.resolve(mapLib || __turbopack_context__.A("[project]/repos/map-searcher/client/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript, async loader)")).then({
                "_Map.useEffect": (module)=>{
                    if (!isMounted) {
                        return;
                    }
                    if (!module) {
                        throw new Error('Invalid mapLib');
                    }
                    const mapboxgl = 'Map' in module ? module : module.default;
                    if (!mapboxgl.Map) {
                        throw new Error('Invalid mapLib');
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$set$2d$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(mapboxgl, props);
                    if (props.reuseMaps) {
                        maplibre = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$maplibre$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].reuse(props, containerRef.current);
                    }
                    if (!maplibre) {
                        maplibre = new __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$maplibre$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](mapboxgl.Map, props, containerRef.current);
                    }
                    contextValue.map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$maplibre$2f$create$2d$ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(maplibre);
                    contextValue.mapLib = mapboxgl;
                    setMapInstance(maplibre);
                    mountedMapsContext?.onMapMount(contextValue.map, props.id);
                }
            }["_Map.useEffect"]).catch({
                "_Map.useEffect": (error)=>{
                    const { onError } = props;
                    if (onError) {
                        onError({
                            type: 'error',
                            target: null,
                            originalEvent: null,
                            error
                        });
                    } else {
                        console.error(error); // eslint-disable-line
                    }
                }
            }["_Map.useEffect"]);
            return ({
                "_Map.useEffect": ()=>{
                    isMounted = false;
                    if (maplibre) {
                        mountedMapsContext?.onMapUnmount(props.id);
                        if (props.reuseMaps) {
                            maplibre.recycle();
                        } else {
                            maplibre.destroy();
                        }
                    }
                }
            })["_Map.useEffect"];
        }
    }["_Map.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$use$2d$isomorphic$2d$layout$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "_Map.useIsomorphicLayoutEffect": ()=>{
            if (mapInstance) {
                mapInstance.setProps(props);
            }
        }
    }["_Map.useIsomorphicLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "_Map.useImperativeHandle": ()=>contextValue.map
    }["_Map.useImperativeHandle"], [
        mapInstance
    ]);
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "_Map.useMemo[style]": ()=>({
                position: 'relative',
                width: '100%',
                height: '100%',
                ...props.style
            })
    }["_Map.useMemo[style]"], [
        props.style
    ]);
    const CHILD_CONTAINER_STYLE = {
        height: '100%'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", {
        id: props.id,
        ref: containerRef,
        style: style
    }, mapInstance && __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](MapContext.Provider, {
        value: contextValue
    }, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", {
        "mapboxgl-children": "",
        style: CHILD_CONTAINER_STYLE
    }, props.children)));
}
const Map = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_Map); //# sourceMappingURL=map.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyReactStyle",
    ()=>applyReactStyle
]);
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
function applyReactStyle(element, styles) {
    if (!element || !styles) {
        return;
    }
    const style = element.style;
    for(const key in styles){
        const value = styles[key];
        if (Number.isFinite(value) && !unitlessNumber.test(key)) {
            style[key] = `${value}px`;
        } else {
            style[key] = value;
        }
    }
} //# sourceMappingURL=apply-react-style.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/compare-class-names.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Compare two classNames string and return the difference */ __turbopack_context__.s([
    "compareClassNames",
    ()=>compareClassNames
]);
function compareClassNames(prevClassName, nextClassName) {
    if (prevClassName === nextClassName) {
        return null;
    }
    const prevClassList = getClassList(prevClassName);
    const nextClassList = getClassList(nextClassName);
    const diff = [];
    for (const c of nextClassList){
        if (!prevClassList.has(c)) {
            diff.push(c);
        }
    }
    for (const c of prevClassList){
        if (!nextClassList.has(c)) {
            diff.push(c);
        }
    }
    return diff.length === 0 ? null : diff;
}
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
} //# sourceMappingURL=compare-class-names.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/marker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Marker",
    ()=>Marker
]);
/* global document */ var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$compare$2d$class$2d$names$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/compare-class-names.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const Marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const { map, mapLib } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const thisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        props
    });
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Marker.useMemo[marker]": ()=>{
            let hasChildren = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].forEach(props.children, {
                "Marker.useMemo[marker]": (el)=>{
                    if (el) {
                        hasChildren = true;
                    }
                }
            }["Marker.useMemo[marker]"]);
            const options = {
                ...props,
                element: hasChildren ? document.createElement('div') : undefined
            };
            const mk = new mapLib.Marker(options);
            mk.setLngLat([
                props.longitude,
                props.latitude
            ]);
            mk.getElement().addEventListener('click', {
                "Marker.useMemo[marker]": (e)=>{
                    thisRef.current.props.onClick?.({
                        type: 'click',
                        target: mk,
                        originalEvent: e
                    });
                }
            }["Marker.useMemo[marker]"]);
            mk.on('dragstart', {
                "Marker.useMemo[marker]": (e)=>{
                    const evt = e;
                    evt.lngLat = marker.getLngLat();
                    thisRef.current.props.onDragStart?.(evt);
                }
            }["Marker.useMemo[marker]"]);
            mk.on('drag', {
                "Marker.useMemo[marker]": (e)=>{
                    const evt = e;
                    evt.lngLat = marker.getLngLat();
                    thisRef.current.props.onDrag?.(evt);
                }
            }["Marker.useMemo[marker]"]);
            mk.on('dragend', {
                "Marker.useMemo[marker]": (e)=>{
                    const evt = e;
                    evt.lngLat = marker.getLngLat();
                    thisRef.current.props.onDragEnd?.(evt);
                }
            }["Marker.useMemo[marker]"]);
            return mk;
        }
    }["Marker.useMemo[marker]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Marker.useEffect": ()=>{
            marker.addTo(map.getMap());
            return ({
                "Marker.useEffect": ()=>{
                    marker.remove();
                }
            })["Marker.useEffect"];
        }
    }["Marker.useEffect"], []);
    const { longitude, latitude, offset, style, draggable = false, popup = null, rotation = 0, rotationAlignment = 'auto', pitchAlignment = 'auto' } = props;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Marker.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(marker.getElement(), style);
        }
    }["Marker.useEffect"], [
        style
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "Marker.useImperativeHandle": ()=>marker
    }["Marker.useImperativeHandle"], []);
    const oldProps = thisRef.current.props;
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
        marker.setLngLat([
            longitude,
            latitude
        ]);
    }
    if (offset && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arePointsEqual"])(marker.getOffset(), offset)) {
        marker.setOffset(offset);
    }
    if (marker.isDraggable() !== draggable) {
        marker.setDraggable(draggable);
    }
    if (marker.getRotation() !== rotation) {
        marker.setRotation(rotation);
    }
    if (marker.getRotationAlignment() !== rotationAlignment) {
        marker.setRotationAlignment(rotationAlignment);
    }
    if (marker.getPitchAlignment() !== pitchAlignment) {
        marker.setPitchAlignment(pitchAlignment);
    }
    if (marker.getPopup() !== popup) {
        marker.setPopup(popup);
    }
    const classNameDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$compare$2d$class$2d$names$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareClassNames"])(oldProps.className, props.className);
    if (classNameDiff) {
        for (const c of classNameDiff){
            marker.toggleClassName(c);
        }
    }
    thisRef.current.props = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(props.children, marker.getElement());
})); //# sourceMappingURL=marker.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/popup.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popup",
    ()=>Popup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$compare$2d$class$2d$names$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/compare-class-names.js [app-client] (ecmascript)");
;
;
;
;
;
;
const Popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const { map, mapLib } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Popup.useMemo[container]": ()=>{
            return document.createElement('div');
        }
    }["Popup.useMemo[container]"], []);
    const thisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        props
    });
    const popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Popup.useMemo[popup]": ()=>{
            const options = {
                ...props
            };
            const pp = new mapLib.Popup(options);
            pp.setLngLat([
                props.longitude,
                props.latitude
            ]);
            pp.once('open', {
                "Popup.useMemo[popup]": (e)=>{
                    thisRef.current.props.onOpen?.(e);
                }
            }["Popup.useMemo[popup]"]);
            return pp;
        }
    }["Popup.useMemo[popup]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Popup.useEffect": ()=>{
            const onClose = {
                "Popup.useEffect.onClose": (e)=>{
                    thisRef.current.props.onClose?.(e);
                }
            }["Popup.useEffect.onClose"];
            popup.on('close', onClose);
            popup.setDOMContent(container).addTo(map.getMap());
            return ({
                "Popup.useEffect": ()=>{
                    // https://github.com/visgl/react-map-gl/issues/1825
                    // onClose should not be fired if the popup is removed by unmounting
                    // When using React strict mode, the component is mounted twice.
                    // Firing the onClose callback here would be a false signal to remove the component.
                    popup.off('close', onClose);
                    if (popup.isOpen()) {
                        popup.remove();
                    }
                }
            })["Popup.useEffect"];
        }
    }["Popup.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Popup.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(popup.getElement(), props.style);
        }
    }["Popup.useEffect"], [
        props.style
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "Popup.useImperativeHandle": ()=>popup
    }["Popup.useImperativeHandle"], []);
    if (popup.isOpen()) {
        const oldProps = thisRef.current.props;
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([
                props.longitude,
                props.latitude
            ]);
        }
        if (props.offset && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(oldProps.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        if (oldProps.anchor !== props.anchor || oldProps.maxWidth !== props.maxWidth) {
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        const classNameDiff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$compare$2d$class$2d$names$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareClassNames"])(oldProps.className, props.className);
        if (classNameDiff) {
            for (const c of classNameDiff){
                popup.toggleClassName(c);
            }
        }
        thisRef.current.props = props;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(props.children, container);
})); //# sourceMappingURL=popup.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useControl",
    ()=>useControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
;
;
function useControl(onCreate, arg1, arg2, arg3) {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useControl.useMemo[ctrl]": ()=>onCreate(context)
    }["useControl.useMemo[ctrl]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useControl.useEffect": ()=>{
            const opts = arg3 || arg2 || arg1;
            const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
            const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
            const { map } = context;
            if (!map.hasControl(ctrl)) {
                map.addControl(ctrl, opts?.position);
                if (onAdd) {
                    onAdd(context);
                }
            }
            return ({
                "useControl.useEffect": ()=>{
                    if (onRemove) {
                        onRemove(context);
                    }
                    // Map might have been removed (parent effects are destroyed before child ones)
                    if (map.hasControl(ctrl)) {
                        map.removeControl(ctrl);
                    }
                }
            })["useControl.useEffect"];
        }
    }["useControl.useEffect"], []);
    return ctrl;
} //# sourceMappingURL=use-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/attribution-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttributionControl",
    ()=>AttributionControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _AttributionControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_AttributionControl.useControl[ctrl]": ({ mapLib })=>new mapLib.AttributionControl(props)
    }["_AttributionControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_AttributionControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["_AttributionControl.useEffect"], [
        props.style
    ]);
    return null;
}
const AttributionControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_AttributionControl); //# sourceMappingURL=attribution-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/fullscreen-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FullscreenControl",
    ()=>FullscreenControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _FullscreenControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_FullscreenControl.useControl[ctrl]": ({ mapLib })=>new mapLib.FullscreenControl({
                container: props.containerId && document.getElementById(props.containerId)
            })
    }["_FullscreenControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_FullscreenControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._controlContainer, props.style);
        }
    }["_FullscreenControl.useEffect"], [
        props.style
    ]);
    return null;
}
const FullscreenControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_FullscreenControl); //# sourceMappingURL=fullscreen-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/geolocate-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeolocateControl",
    ()=>GeolocateControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _GeolocateControl(props, ref) {
    const thisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        props
    });
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_GeolocateControl.useControl[ctrl]": ({ mapLib })=>{
            const gc = new mapLib.GeolocateControl(props);
            // Hack: fix GeolocateControl reuse
            // When using React strict mode, the component is mounted twice.
            // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
            const setupUI = gc._setupUI;
            gc._setupUI = ({
                "_GeolocateControl.useControl[ctrl]": ()=>{
                    if (!gc._container.hasChildNodes()) {
                        setupUI();
                    }
                }
            })["_GeolocateControl.useControl[ctrl]"];
            gc.on('geolocate', {
                "_GeolocateControl.useControl[ctrl]": (e)=>{
                    thisRef.current.props.onGeolocate?.(e);
                }
            }["_GeolocateControl.useControl[ctrl]"]);
            gc.on('error', {
                "_GeolocateControl.useControl[ctrl]": (e)=>{
                    thisRef.current.props.onError?.(e);
                }
            }["_GeolocateControl.useControl[ctrl]"]);
            gc.on('outofmaxbounds', {
                "_GeolocateControl.useControl[ctrl]": (e)=>{
                    thisRef.current.props.onOutOfMaxBounds?.(e);
                }
            }["_GeolocateControl.useControl[ctrl]"]);
            gc.on('trackuserlocationstart', {
                "_GeolocateControl.useControl[ctrl]": (e)=>{
                    thisRef.current.props.onTrackUserLocationStart?.(e);
                }
            }["_GeolocateControl.useControl[ctrl]"]);
            gc.on('trackuserlocationend', {
                "_GeolocateControl.useControl[ctrl]": (e)=>{
                    thisRef.current.props.onTrackUserLocationEnd?.(e);
                }
            }["_GeolocateControl.useControl[ctrl]"]);
            return gc;
        }
    }["_GeolocateControl.useControl[ctrl]"], {
        position: props.position
    });
    thisRef.current.props = props;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "_GeolocateControl.useImperativeHandle": ()=>ctrl
    }["_GeolocateControl.useImperativeHandle"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_GeolocateControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["_GeolocateControl.useEffect"], [
        props.style
    ]);
    return null;
}
const GeolocateControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_GeolocateControl)); //# sourceMappingURL=geolocate-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/navigation-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavigationControl",
    ()=>NavigationControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _NavigationControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_NavigationControl.useControl[ctrl]": ({ mapLib })=>new mapLib.NavigationControl(props)
    }["_NavigationControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_NavigationControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["_NavigationControl.useEffect"], [
        props.style
    ]);
    return null;
}
const NavigationControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_NavigationControl); //# sourceMappingURL=navigation-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/scale-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScaleControl",
    ()=>ScaleControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _ScaleControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_ScaleControl.useControl[ctrl]": ({ mapLib })=>new mapLib.ScaleControl(props)
    }["_ScaleControl.useControl[ctrl]"], {
        position: props.position
    });
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props);
    const prevProps = propsRef.current;
    propsRef.current = props;
    const { style } = props;
    if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
        ctrl.options.maxWidth = props.maxWidth;
    }
    if (props.unit !== undefined && props.unit !== prevProps.unit) {
        ctrl.setUnit(props.unit);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_ScaleControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, style);
        }
    }["_ScaleControl.useEffect"], [
        style
    ]);
    return null;
}
const ScaleControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_ScaleControl); //# sourceMappingURL=scale-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/terrain-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TerrainControl",
    ()=>TerrainControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _TerrainControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_TerrainControl.useControl[ctrl]": ({ mapLib })=>new mapLib.TerrainControl(props)
    }["_TerrainControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_TerrainControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["_TerrainControl.useEffect"], [
        props.style
    ]);
    return null;
}
const TerrainControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_TerrainControl); //# sourceMappingURL=terrain-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/logo-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogoControl",
    ()=>LogoControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
;
;
;
function _LogoControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"])({
        "_LogoControl.useControl[ctrl]": ({ mapLib })=>new mapLib.LogoControl(props)
    }["_LogoControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "_LogoControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["_LogoControl.useEffect"], [
        props.style
    ]);
    return null;
}
const LogoControl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_LogoControl); //# sourceMappingURL=logo-control.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/assert.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>assert
]);
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
} //# sourceMappingURL=assert.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/source.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Source",
    ()=>Source
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
;
;
let sourceCounter = 0;
function createSource(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded) {
        const options = {
            ...props
        };
        delete options.id;
        delete options.children;
        // @ts-ignore
        map.addSource(id, options);
        return map.getSource(id);
    }
    return null;
}
/* eslint-disable complexity */ function updateSource(source, props, prevProps) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.id === prevProps.id, 'source id changed');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.type === prevProps.type, 'source type changed');
    let changedKey = '';
    let changedKeyCount = 0;
    for(const key in props){
        if (key !== 'children' && key !== 'id' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(prevProps[key], props[key])) {
            changedKey = key;
            changedKeyCount++;
        }
    }
    if (!changedKeyCount) {
        return;
    }
    const type = props.type;
    if (type === 'geojson') {
        source.setData(props.data);
    } else if (type === 'image') {
        source.updateImage({
            url: props.url,
            coordinates: props.coordinates
        });
    } else {
        switch(changedKey){
            case 'coordinates':
                // @ts-ignore
                source.setCoordinates?.(props.coordinates);
                break;
            case 'url':
                // @ts-ignore
                source.setUrl?.(props.url);
                break;
            case 'tiles':
                // @ts-ignore
                source.setTiles?.(props.tiles);
                break;
            default:
                // eslint-disable-next-line
                console.warn(`Unable to update <Source> prop: ${changedKey}`);
        }
    }
}
function Source(props) {
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]).map.getMap();
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props);
    const [, setStyleLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Source.useMemo[id]": ()=>props.id || `jsx-source-${sourceCounter++}`
    }["Source.useMemo[id]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Source.useEffect": ()=>{
            if (map) {
                /* global setTimeout */ const forceUpdate = {
                    "Source.useEffect.forceUpdate": ()=>setTimeout({
                            "Source.useEffect.forceUpdate": ()=>setStyleLoaded({
                                    "Source.useEffect.forceUpdate": (version)=>version + 1
                                }["Source.useEffect.forceUpdate"])
                        }["Source.useEffect.forceUpdate"], 0)
                }["Source.useEffect.forceUpdate"];
                map.on('styledata', forceUpdate);
                forceUpdate();
                return ({
                    "Source.useEffect": ()=>{
                        map.off('styledata', forceUpdate);
                        // @ts-ignore
                        if (map.style && map.style._loaded && map.getSource(id)) {
                            // Parent effects are destroyed before child ones, see
                            // https://github.com/facebook/react/issues/16728
                            // Source can only be removed after all child layers are removed
                            const allLayers = map.getStyle()?.layers;
                            if (allLayers) {
                                for (const layer of allLayers){
                                    // @ts-ignore (2339) source does not exist on all layer types
                                    if (layer.source === id) {
                                        map.removeLayer(layer.id);
                                    }
                                }
                            }
                            map.removeSource(id);
                        }
                    }
                })["Source.useEffect"];
            }
            return undefined;
        }
    }["Source.useEffect"], [
        map
    ]);
    // @ts-ignore
    let source = map && map.style && map.getSource(id);
    if (source) {
        updateSource(source, props, propsRef.current);
    } else {
        source = createSource(map, id, props);
    }
    propsRef.current = props;
    return source && __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].map(props.children, (child)=>child && (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(child, {
            source: id
        })) || null;
} //# sourceMappingURL=source.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/layer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layer",
    ()=>Layer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
;
/* eslint-disable complexity, max-statements */ function updateLayer(map, id, props, prevProps) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.id === prevProps.id, 'layer id changed');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') {
        return;
    }
    // @ts-ignore filter does not exist in some Layer types
    const { layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId } = props;
    if (beforeId !== prevProps.beforeId) {
        map.moveLayer(id, beforeId);
    }
    if (layout !== prevProps.layout) {
        const prevLayout = prevProps.layout || {};
        for(const key in layout){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(layout[key], prevLayout[key])) {
                map.setLayoutProperty(id, key, layout[key]);
            }
        }
        for(const key in prevLayout){
            if (!layout.hasOwnProperty(key)) {
                map.setLayoutProperty(id, key, undefined);
            }
        }
    }
    if (paint !== prevProps.paint) {
        const prevPaint = prevProps.paint || {};
        for(const key in paint){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(paint[key], prevPaint[key])) {
                map.setPaintProperty(id, key, paint[key]);
            }
        }
        for(const key in prevPaint){
            if (!paint.hasOwnProperty(key)) {
                map.setPaintProperty(id, key, undefined);
            }
        }
    }
    // @ts-ignore filter does not exist in some Layer types
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(filter, prevProps.filter)) {
        map.setFilter(id, filter);
    }
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
        map.setLayerZoomRange(id, minzoom, maxzoom);
    }
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        const options = {
            ...props,
            id
        };
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */ let layerCounter = 0;
function Layer(props) {
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]).map.getMap();
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props);
    const [, setStyleLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Layer.useMemo[id]": ()=>props.id || `jsx-layer-${layerCounter++}`
    }["Layer.useMemo[id]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layer.useEffect": ()=>{
            if (map) {
                const forceUpdate = {
                    "Layer.useEffect.forceUpdate": ()=>setStyleLoaded({
                            "Layer.useEffect.forceUpdate": (version)=>version + 1
                        }["Layer.useEffect.forceUpdate"])
                }["Layer.useEffect.forceUpdate"];
                map.on('styledata', forceUpdate);
                forceUpdate();
                return ({
                    "Layer.useEffect": ()=>{
                        map.off('styledata', forceUpdate);
                        // @ts-ignore
                        if (map.style && map.style._loaded && map.getLayer(id)) {
                            map.removeLayer(id);
                        }
                    }
                })["Layer.useEffect"];
            }
            return undefined;
        }
    }["Layer.useEffect"], [
        map
    ]);
    // @ts-ignore
    const layer = map && map.style && map.getLayer(id);
    if (layer) {
        try {
            updateLayer(map, id, props, propsRef.current);
        } catch (error) {
            console.warn(error); // eslint-disable-line
        }
    } else {
        createLayer(map, id, props);
    }
    // Store last rendered props
    propsRef.current = props;
    return null;
} //# sourceMappingURL=layer.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/common.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=common.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/events.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=events.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/lib.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=lib.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/style-spec.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=style-spec.js.map
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$attribution$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/attribution-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$fullscreen$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/fullscreen-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$geolocate$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/geolocate-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$navigation$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/navigation-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$scale$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/scale-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$terrain$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/terrain-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$logo$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/logo-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/layer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-map.js [app-client] (ecmascript)");
// Types
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/common.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/lib.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$style$2d$spec$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/style-spec.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Map"];
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
;
;
;
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript) <export Map as default>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Map"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
}),
"[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttributionControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$attribution$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AttributionControl"],
    "FullscreenControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$fullscreen$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullscreenControl"],
    "GeolocateControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$geolocate$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeolocateControl"],
    "Layer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"],
    "LogoControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$logo$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogoControl"],
    "Map",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Map"],
    "MapProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapProvider"],
    "Marker",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"],
    "NavigationControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$navigation$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavigationControl"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"],
    "ScaleControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$scale$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScaleControl"],
    "Source",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Source"],
    "TerrainControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$terrain$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TerrainControl"],
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "useControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControl"],
    "useMap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$attribution$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/attribution-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$fullscreen$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/fullscreen-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$geolocate$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/geolocate-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$navigation$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/navigation-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$scale$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/scale-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$terrain$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/terrain-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$logo$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/logo-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/layer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/components/use-map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/common.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/lib.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$repos$2f$map$2d$searcher$2f$client$2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$types$2f$style$2d$spec$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/repos/map-searcher/client/node_modules/@vis.gl/react-maplibre/dist/types/style-spec.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=0d5e3_%40vis_gl_react-maplibre_dist_c9b5d728._.js.map