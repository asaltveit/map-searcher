"use client";

import { useState, useEffect, useCallback } from "react";
import { MapContainer } from "@/components/map";
import { AgentInput } from "@/components/AgentInput";
import { getMapState } from "@/lib/api";
import { DEMO_RESEARCH_GEOJSON } from "@/data/demo-research-geojson";
import { MapPin } from "lucide-react";

export function ResearchMapPage() {
  const [mapState, setMapState] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    getMapState()
      .then((s) => s?.geoJson && setMapState(s.geoJson))
      .catch(() => {});
  }, []);

  const onAfterMapAgentResponse = useCallback(async () => {
    const s = await getMapState();
    if (s?.geoJson) setMapState(s.geoJson);
  }, []);

  const pinsData = mapState ?? DEMO_RESEARCH_GEOJSON;

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-background font-sans">
      <main
        id="main-content"
        className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8"
        aria-label="Main content"
      >
        {/* Hero: headline + subline */}
        <section className="mb-6 sm:mb-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Current events, researched and mapped
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground sm:text-base">
            Ask about places, routes, or events in plain language. Results are researched and plotted on the map below.
          </p>
        </section>

        {/* Research query + response + voice (single flow) */}
        <AgentInput onAfterMapAgentResponse={onAfterMapAgentResponse} />

        {/* Map: findings layer */}
        <section className="mt-6 sm:mt-8" aria-label="Research map">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span>Findings on map</span>
          </div>
          <MapContainer
            className="h-[320px] w-full min-h-[260px] rounded-xl border border-border overflow-hidden shadow-sm sm:h-[420px] sm:min-h-[340px]"
            pinsData={pinsData}
          />
        </section>
      </main>
    </div>
  );
}
