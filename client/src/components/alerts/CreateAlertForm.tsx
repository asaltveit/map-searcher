'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createAlert, type AlertFrequency, type CreateAlertInput } from '@/lib/api';

interface CreateAlertFormProps {
  onCreated: () => void;
  onCancel: () => void;
}

const FREQUENCY_OPTIONS: { value: AlertFrequency; label: string }[] = [
  { value: 'MANUAL', label: 'Manual only' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'BIWEEKLY', label: 'Biweekly' },
  { value: 'MONTHLY', label: 'Monthly' },
];

export function CreateAlertForm({ onCreated, onCancel }: CreateAlertFormProps) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [maxArticles, setMaxArticles] = useState(20);
  const [frequency, setFrequency] = useState<AlertFrequency>('MANUAL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!query.trim() || !region.trim()) {
      setError('Query and region are required');
      return;
    }

    setLoading(true);
    try {
      const input: CreateAlertInput = {
        query: query.trim(),
        region: region.trim(),
        maxArticles,
        frequency,
        isActive: true,
      };
      await createAlert(input);
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="query" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Search Query
        </label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., robberies, car accidents"
          className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="region" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Region
        </label>
        <input
          id="region"
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="e.g., Savannah, GA"
          className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="maxArticles" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Max Articles
          </label>
          <input
            id="maxArticles"
            type="number"
            min={1}
            max={50}
            value={maxArticles}
            onChange={(e) => setMaxArticles(parseInt(e.target.value) || 20)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Frequency
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as AlertFrequency)}
            className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
            disabled={loading}
          >
            {FREQUENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <div className="flex gap-3 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Alert'}
        </Button>
      </div>
    </form>
  );
}
