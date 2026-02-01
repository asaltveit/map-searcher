'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  listAlerts,
  getAlertsLocations,
  getAlert,
  type AlertListItem,
  type AlertDetail,
  type GeoJsonFeatureCollection,
} from '@/lib/api';

const POLLING_INTERVAL = 3000; // Poll every 3 seconds when processing

interface UseAlertsState {
  alerts: AlertListItem[];
  selectedAlertId: string | null;
  selectedAlert: AlertDetail | null;
  locations: GeoJsonFeatureCollection | null;
  loading: boolean;
  locationsLoading: boolean;
  error: string | null;
  hasProcessingAlerts: boolean;
}

interface UseAlertsActions {
  loadAlerts: () => Promise<void>;
  selectAlert: (alertId: string | null) => void;
  loadLocations: (alertIds?: string[]) => Promise<void>;
  refreshAll: () => Promise<void>;
}

export function useAlerts(): UseAlertsState & UseAlertsActions {
  const [alerts, setAlerts] = useState<AlertListItem[]>([]);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertDetail | null>(null);
  const [locations, setLocations] = useState<GeoJsonFeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if any alerts are processing
  const hasProcessingAlerts = alerts.some(a => a.processingStatus === 'PROCESSING');

  const loadAlerts = useCallback(async () => {
    console.log(`[HOOK] loadAlerts START`);
    setLoading(true);
    setError(null);
    try {
      const data = await listAlerts();
      console.log(`[HOOK] loadAlerts SUCCESS - count=${data.length}, processingCount=${data.filter(a => a.processingStatus === 'PROCESSING').length}`);
      setAlerts(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load alerts';
      console.error(`[HOOK] loadAlerts FAILED - error=${errorMsg}`);
      setError(errorMsg);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLocations = useCallback(async (alertIds?: string[]) => {
    console.log(`[HOOK] loadLocations START - alertIds=${JSON.stringify(alertIds)}`);
    setLocationsLoading(true);
    try {
      const data = await getAlertsLocations(alertIds);
      console.log(`[HOOK] loadLocations SUCCESS - featureCount=${data.features.length}`);
      setLocations(data);
    } catch (err) {
      console.error(`[HOOK] loadLocations FAILED - error=${err instanceof Error ? err.message : String(err)}`);
      // Silently fail - user may not have alerts or be logged in
      setLocations({ type: 'FeatureCollection', features: [] });
    } finally {
      setLocationsLoading(false);
    }
  }, []);

  const selectAlert = useCallback(async (alertId: string | null) => {
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
          getAlert(alertId),
          loadLocations([alertId]),
        ]);
        console.log(`[HOOK] selectAlert SUCCESS - alertId=${alertId}, query="${alertDetail.query}"`);
        setSelectedAlert(alertDetail);
      } catch (err) {
        console.error(`[HOOK] selectAlert FAILED - alertId=${alertId}, error=${err instanceof Error ? err.message : String(err)}`);
        setSelectedAlert(null);
      }
    }
  }, [loadLocations]);

  const refreshAll = useCallback(async () => {
    console.log(`[HOOK] refreshAll START - selectedAlertId=${selectedAlertId}`);
    await Promise.all([
      loadAlerts(),
      loadLocations(selectedAlertId ? [selectedAlertId] : undefined),
    ]);
    console.log(`[HOOK] refreshAll SUCCESS`);
  }, [loadAlerts, loadLocations, selectedAlertId]);

  // Initial load
  useEffect(() => {
    console.log(`[HOOK] useAlerts INITIAL LOAD`);
    loadAlerts();
    loadLocations();
  }, [loadAlerts, loadLocations]);

  // Polling effect for processing alerts
  useEffect(() => {
    // Clear any existing polling
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    // Start polling if we have processing alerts
    if (hasProcessingAlerts) {
      console.log(`[HOOK] Starting polling for processing alerts`);
      pollingIntervalRef.current = setInterval(async () => {
        console.log(`[HOOK] Polling for alert updates...`);
        try {
          const data = await listAlerts();
          const stillProcessing = data.filter(a => a.processingStatus === 'PROCESSING');
          console.log(`[HOOK] Poll result - total=${data.length}, stillProcessing=${stillProcessing.length}`);
          setAlerts(data);

          // If an alert just finished processing and is currently selected, reload it
          if (selectedAlertId) {
            const selectedAlertData = data.find(a => a.id === selectedAlertId);
            if (selectedAlertData && selectedAlertData.processingStatus !== 'PROCESSING') {
              console.log(`[HOOK] Selected alert finished processing, reloading details and locations`);
              const [alertDetail] = await Promise.all([
                getAlert(selectedAlertId),
                loadLocations([selectedAlertId]),
              ]);
              setSelectedAlert(alertDetail);
            }
          }

          // If no more processing alerts, also refresh locations
          if (stillProcessing.length === 0) {
            console.log(`[HOOK] All alerts finished processing, refreshing locations`);
            await loadLocations(selectedAlertId ? [selectedAlertId] : undefined);
          }
        } catch (err) {
          console.error(`[HOOK] Polling error:`, err);
        }
      }, POLLING_INTERVAL);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [hasProcessingAlerts, selectedAlertId, loadLocations]);

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
    refreshAll,
  };
}
