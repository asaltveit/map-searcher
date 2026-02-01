'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  listAlerts,
  getAlertsLocations,
  getAlert,
  type AlertListItem,
  type AlertDetail,
  type GeoJsonFeatureCollection,
} from '@/lib/api';

interface UseAlertsState {
  alerts: AlertListItem[];
  selectedAlertId: string | null;
  selectedAlert: AlertDetail | null;
  locations: GeoJsonFeatureCollection | null;
  loading: boolean;
  locationsLoading: boolean;
  error: string | null;
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

  const loadAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alerts');
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLocations = useCallback(async (alertIds?: string[]) => {
    setLocationsLoading(true);
    try {
      const data = await getAlertsLocations(alertIds);
      setLocations(data);
    } catch {
      // Silently fail - user may not have alerts or be logged in
      setLocations({ type: 'FeatureCollection', features: [] });
    } finally {
      setLocationsLoading(false);
    }
  }, []);

  const selectAlert = useCallback(async (alertId: string | null) => {
    setSelectedAlertId(alertId);

    if (alertId === null) {
      setSelectedAlert(null);
      // Load all locations when deselecting
      await loadLocations();
    } else {
      // Load specific alert details and its locations
      try {
        const [alertDetail] = await Promise.all([
          getAlert(alertId),
          loadLocations([alertId]),
        ]);
        setSelectedAlert(alertDetail);
      } catch {
        setSelectedAlert(null);
      }
    }
  }, [loadLocations]);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      loadAlerts(),
      loadLocations(selectedAlertId ? [selectedAlertId] : undefined),
    ]);
  }, [loadAlerts, loadLocations, selectedAlertId]);

  // Initial load
  useEffect(() => {
    loadAlerts();
    loadLocations();
  }, [loadAlerts, loadLocations]);

  return {
    alerts,
    selectedAlertId,
    selectedAlert,
    locations,
    loading,
    locationsLoading,
    error,
    loadAlerts,
    selectAlert,
    loadLocations,
    refreshAll,
  };
}
