'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type AlertDetail as AlertDetailType,
  type AlertFrequency,
  getAlert,
  updateAlert,
  runAlert,
} from '@/lib/api';

interface AlertDetailProps {
  alertId: string;
  onBack: () => void;
  onRefresh: () => void;
}

const FREQUENCY_OPTIONS: { value: AlertFrequency; label: string }[] = [
  { value: 'MANUAL', label: 'Manual only' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'BIWEEKLY', label: 'Biweekly' },
  { value: 'MONTHLY', label: 'Monthly' },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function AlertDetail({ alertId, onBack, onRefresh }: AlertDetailProps) {
  const [alert, setAlert] = useState<AlertDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editQuery, setEditQuery] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [editMaxArticles, setEditMaxArticles] = useState(20);
  const [editFrequency, setEditFrequency] = useState<AlertFrequency>('MANUAL');

  useEffect(() => {
    loadAlert();
  }, [alertId]);

  const loadAlert = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAlert(alertId);
      setAlert(data);
      setEditQuery(data.query);
      setEditRegion(data.region);
      setEditMaxArticles(data.maxArticles);
      setEditFrequency(data.frequency);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alert');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!alert) return;
    setSaving(true);
    setError(null);
    try {
      await updateAlert(alertId, {
        query: editQuery,
        region: editRegion,
        maxArticles: editMaxArticles,
        frequency: editFrequency,
      });
      setEditing(false);
      loadAlert();
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save alert');
    } finally {
      setSaving(false);
    }
  };

  const handleRun = async () => {
    setSaving(true);
    setError(null);
    try {
      await runAlert(alertId);
      setTimeout(() => {
        loadAlert();
        onRefresh();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run alert');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !alert) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  if (!alert) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          &larr; Back
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{editing ? 'Edit Alert' : alert.query}</CardTitle>
            {!editing && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button size="sm" onClick={handleRun} disabled={saving}>
                  Run Now
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Query</label>
                <input
                  type="text"
                  value={editQuery}
                  onChange={(e) => setEditQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <input
                  type="text"
                  value={editRegion}
                  onChange={(e) => setEditRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Max Articles</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={editMaxArticles}
                    onChange={(e) => setEditMaxArticles(parseInt(e.target.value) || 20)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Frequency</label>
                  <select
                    value={editFrequency}
                    onChange={(e) => setEditFrequency(e.target.value as AlertFrequency)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600"
                  >
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Region:</span> {alert.region}
              </p>
              <p>
                <span className="font-medium">Max Articles:</span> {alert.maxArticles}
              </p>
              <p>
                <span className="font-medium">Frequency:</span>{' '}
                {FREQUENCY_OPTIONS.find((o) => o.value === alert.frequency)?.label}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span className={alert.isActive ? 'text-green-600' : 'text-zinc-500'}>
                  {alert.isActive ? 'Active' : 'Paused'}
                </span>
              </p>
              {alert.lastRunAt && (
                <p>
                  <span className="font-medium">Last Run:</span> {formatDate(alert.lastRunAt)}
                </p>
              )}
              {alert.nextRunAt && alert.isActive && (
                <p>
                  <span className="font-medium">Next Run:</span> {formatDate(alert.nextRunAt)}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Articles section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Articles ({alert.articles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alert.articles.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">
              No articles yet. Run the alert to fetch articles.
            </p>
          ) : (
            <div className="space-y-3">
              {alert.articles.map((article) => (
                <div
                  key={article.id}
                  className="border-b border-zinc-200 dark:border-zinc-700 pb-3 last:border-b-0 last:pb-0"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {article.title}
                  </a>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {article.source} • {formatDate(article.publishedAt)}
                    {article.locationCount > 0 && ` • ${article.locationCount} locations`}
                  </div>
                  {article.summary && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
