import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertSelector } from '@/components/alerts/AlertSelector';
import type { AlertListItem } from '@/lib/api';

// Mock pointer capture for Radix UI components in jsdom
beforeAll(() => {
  Element.prototype.hasPointerCapture = vi.fn(() => false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
});

const mockAlerts: AlertListItem[] = [
  {
    id: '1',
    query: 'robberies',
    region: 'Savannah, GA',
    frequency: 'DAILY',
    isActive: true,
    articleCount: 5,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    query: 'car accidents',
    region: 'Atlanta, GA',
    frequency: 'WEEKLY',
    isActive: true,
    articleCount: 10,
    createdAt: '2024-01-02T00:00:00Z',
  },
];

describe('AlertSelector', () => {
  it('renders with "All Alerts" selected by default', () => {
    render(
      <AlertSelector
        alerts={mockAlerts}
        selectedAlertId={null}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('All Alerts');
  });

  it('renders with specific alert selected', () => {
    render(
      <AlertSelector
        alerts={mockAlerts}
        selectedAlertId="1"
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('robberies - Savannah, GA');
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <AlertSelector
        alerts={mockAlerts}
        selectedAlertId={null}
        onSelect={vi.fn()}
        disabled
      />
    );

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders when no alerts', () => {
    render(
      <AlertSelector
        alerts={[]}
        selectedAlertId={null}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all alerts in the trigger display', () => {
    const { rerender } = render(
      <AlertSelector
        alerts={mockAlerts}
        selectedAlertId={null}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('All Alerts');

    rerender(
      <AlertSelector
        alerts={mockAlerts}
        selectedAlertId="2"
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('car accidents - Atlanta, GA');
  });
});
