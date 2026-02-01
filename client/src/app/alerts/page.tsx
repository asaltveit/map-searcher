'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertList, CreateAlertForm, AlertDetail } from '@/components/alerts';
import { listAlerts, type AlertListItem } from '@/lib/api';

type ViewMode = 'list' | 'create' | 'detail';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const loadAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const handleSelectAlert = (alertId: string) => {
    setSelectedAlertId(alertId);
    setViewMode('detail');
  };

  const handleBack = () => {
    setSelectedAlertId(null);
    setViewMode('list');
  };

  const handleCreated = () => {
    setViewMode('list');
    loadAlerts();
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              &larr; Back to Map
            </Link>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50 mt-1">
              News Alerts
            </h1>
          </div>
          {viewMode === 'list' && (
            <Button onClick={() => setViewMode('create')}>New Alert</Button>
          )}
        </div>

        {loading && viewMode === 'list' && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && viewMode === 'list' && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button onClick={loadAlerts}>Retry</Button>
          </div>
        )}

        {viewMode === 'list' && !loading && !error && (
          <AlertList
            alerts={alerts}
            onRefresh={loadAlerts}
            onSelect={handleSelectAlert}
          />
        )}

        {viewMode === 'create' && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Create New Alert</h2>
            <CreateAlertForm
              onCreated={handleCreated}
              onCancel={() => setViewMode('list')}
            />
          </div>
        )}

        {viewMode === 'detail' && selectedAlertId && (
          <AlertDetail
            alertId={selectedAlertId}
            onBack={handleBack}
            onRefresh={loadAlerts}
          />
        )}
      </main>
    </div>
  );
}
