"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import { MapContainer, LocationPins, LOCATION_PINS_LAYER_IDS } from "@/components/map";
import { AgentInput } from "@/components/AgentInput";
import { ProtectedRoute, UserHeader } from "@/components/auth";
import {
  CreateAlertDialog,
  CreateAlertDialogTrigger,
  AlertSelector,
  ArticlePanel,
} from "@/components/alerts";
import { useAlerts } from "@/hooks/useAlerts";
import { calculateBounds, DEFAULT_FIT_BOUNDS_OPTIONS } from "@/lib/map-utils";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Home() {
  const mapRef = useRef<MapRef>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [articlePanelOpen, setArticlePanelOpen] = useState(false);

  const {
    alerts,
    selectedAlertId,
    selectedAlert,
    locations,
    loading,
    locationsLoading,
    selectAlert,
    refreshAll,
  } = useAlerts();

  // Fit map to bounds when locations change
  const fitMapToBounds = useCallback(() => {
    if (!locations || !mapRef.current) return;

    const bounds = calculateBounds(locations);
    if (bounds) {
      mapRef.current.fitBounds(bounds, DEFAULT_FIT_BOUNDS_OPTIONS);
    }
  }, [locations]);

  // Fit bounds when an alert is selected and locations load
  useEffect(() => {
    if (selectedAlertId && locations && locations.features.length > 0) {
      fitMapToBounds();
    }
  }, [selectedAlertId, locations, fitMapToBounds]);

  const handleAlertSelect = (alertId: string | null) => {
    selectAlert(alertId);
    if (alertId) {
      setArticlePanelOpen(true);
    }
  };

  const handleAlertCreated = () => {
    refreshAll();
  };

  const hasLocations = locations && locations.features.length > 0;
  const hasAlerts = alerts.length > 0;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen min-h-[100dvh] flex-col bg-zinc-50 font-sans dark:bg-black">
        <UserHeader />
        <main
          id="main-content"
          className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-8"
          aria-label="Main content"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
              Weave Hacks – Voice
            </h1>
            <CreateAlertDialogTrigger onOpenChange={setCreateDialogOpen} />
          </div>

          {/* Alert selector and view articles button */}
          {hasAlerts && (
            <div className="flex items-center gap-2 mb-3">
              <AlertSelector
                alerts={alerts}
                selectedAlertId={selectedAlertId}
                onSelect={handleAlertSelect}
                disabled={loading}
              />
              {selectedAlertId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setArticlePanelOpen(true)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Articles
                </Button>
              )}
            </div>
          )}

          <MapContainer
            ref={mapRef}
            className="h-[280px] w-full min-h-[220px] rounded-lg border border-zinc-200 overflow-hidden sm:h-[400px] sm:min-h-[300px] dark:border-zinc-800"
            interactiveLayerIds={LOCATION_PINS_LAYER_IDS}
          >
            {!locationsLoading && hasLocations && (
              <LocationPins data={locations} />
            )}
          </MapContainer>

          <div className="flex items-center justify-between mt-2 mb-4">
            <p className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Ask research and map below (type or use the mic).
            </p>
            {hasLocations && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {locations.features.length} location{locations.features.length !== 1 ? "s" : ""} on map
              </span>
            )}
          </div>

          <AgentInput />

          {/* Create Alert Dialog */}
          <CreateAlertDialog
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
            onCreated={handleAlertCreated}
          />

          {/* Article Panel Sidebar */}
          <ArticlePanel
            open={articlePanelOpen}
            onOpenChange={setArticlePanelOpen}
            alert={selectedAlert}
            loading={locationsLoading && selectedAlertId !== null}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}
