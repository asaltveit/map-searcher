'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { AlertListItem } from '@/lib/api';

interface AlertSelectorProps {
  alerts: AlertListItem[];
  selectedAlertId: string | null;
  onSelect: (alertId: string | null) => void;
  disabled?: boolean;
}

export function AlertSelector({
  alerts,
  selectedAlertId,
  onSelect,
  disabled,
}: AlertSelectorProps) {
  const processingCount = alerts.filter(a => a.processingStatus === 'PROCESSING').length;
  console.log(`[SELECTOR] AlertSelector RENDER - alertCount=${alerts.length}, selectedAlertId=${selectedAlertId}, disabled=${disabled}, processingCount=${processingCount}`);

  const handleValueChange = (value: string) => {
    // Don't allow selecting processing alerts
    const alert = alerts.find(a => a.id === value);
    if (alert?.processingStatus === 'PROCESSING') {
      console.log(`[SELECTOR] handleValueChange - blocked, alert is processing`);
      return;
    }
    console.log(`[SELECTOR] handleValueChange - value=${value}`);
    onSelect(value === 'all' ? null : value);
  };

  return (
    <Select
      value={selectedAlertId ?? 'all'}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select an alert" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Alerts</SelectItem>
        {alerts.map((alert) => {
          const isProcessing = alert.processingStatus === 'PROCESSING';
          return (
            <SelectItem
              key={alert.id}
              value={alert.id}
              disabled={isProcessing}
              className={isProcessing ? 'opacity-60' : ''}
            >
              <span className="flex items-center gap-2 truncate">
                {isProcessing && (
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                )}
                <span className={isProcessing ? 'text-muted-foreground' : ''}>
                  {alert.query} - {alert.region}
                  {isProcessing && ' (Processing...)'}
                </span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
