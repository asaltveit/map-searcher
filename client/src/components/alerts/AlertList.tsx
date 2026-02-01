'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type AlertListItem,
  updateAlert,
  deleteAlert,
  runAlert,
} from '@/lib/api';

interface AlertListProps {
  alerts: AlertListItem[];
  onRefresh: () => void;
  onSelect: (alertId: string) => void;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatFrequency(freq: string): string {
  const map: Record<string, string> = {
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    BIWEEKLY: 'Biweekly',
    MONTHLY: 'Monthly',
    MANUAL: 'Manual',
  };
  return map[freq] || freq;
}

export function AlertList({ alerts, onRefresh, onSelect }: AlertListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async (alert: AlertListItem) => {
    setLoadingId(alert.id);
    setError(null);
    try {
      await updateAlert(alert.id, { isActive: !alert.isActive });
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update alert');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (alertId: string) => {
    if (!confirm('Are you sure you want to delete this alert? All associated articles will be deleted.')) {
      return;
    }
    setLoadingId(alertId);
    setError(null);
    try {
      await deleteAlert(alertId);
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete alert');
    } finally {
      setLoadingId(null);
    }
  };

  const handleRun = async (alertId: string) => {
    setLoadingId(alertId);
    setError(null);
    try {
      await runAlert(alertId);
      // Refresh after a short delay to show updated status
      setTimeout(onRefresh, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run alert');
    } finally {
      setLoadingId(null);
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
        No alerts yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</div>
      )}
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
            !alert.isActive ? 'opacity-60' : ''
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle
                className="text-base font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => onSelect(alert.id)}
              >
                {alert.query}
              </CardTitle>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    alert.isActive
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  {alert.isActive ? 'Active' : 'Paused'}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              <span className="font-medium">{alert.region}</span>
              <span className="mx-2">•</span>
              <span>{formatFrequency(alert.frequency)}</span>
              <span className="mx-2">•</span>
              <span>{alert.articleCount} articles</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-500 mb-3">
              Last run: {formatDate(alert.lastRunAt)}
              {alert.nextRunAt && alert.isActive && (
                <>
                  <span className="mx-2">•</span>
                  Next: {formatDate(alert.nextRunAt)}
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRun(alert.id)}
                disabled={loadingId === alert.id}
              >
                Run Now
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleToggle(alert)}
                disabled={loadingId === alert.id}
              >
                {alert.isActive ? 'Pause' : 'Resume'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                onClick={() => handleDelete(alert.id)}
                disabled={loadingId === alert.id}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
