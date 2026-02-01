'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const handleValueChange = (value: string) => {
    onSelect(value === 'all' ? null : value);
  };

  return (
    <Select
      value={selectedAlertId ?? 'all'}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an alert" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Alerts</SelectItem>
        {alerts.map((alert) => (
          <SelectItem key={alert.id} value={alert.id}>
            <span className="truncate">
              {alert.query} - {alert.region}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
