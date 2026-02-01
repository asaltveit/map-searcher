import { describe, it, expect } from 'vitest';
import { createAlertSchema, FREQUENCY_OPTIONS } from '@/lib/validations/alert';

describe('createAlertSchema', () => {
  it('validates a valid alert input', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
      maxArticles: 20,
      frequency: 'DAILY' as const,
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('requires all non-optional fields', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('validates with all required fields', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
      maxArticles: 20,
      frequency: 'MANUAL' as const,
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.maxArticles).toBe(20);
      expect(result.data.frequency).toBe('MANUAL');
    }
  });

  it('rejects query shorter than 2 characters', () => {
    const input = {
      query: 'a',
      region: 'Savannah, GA',
      maxArticles: 20,
      frequency: 'MANUAL' as const,
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 2 characters');
    }
  });

  it('rejects region shorter than 2 characters', () => {
    const input = {
      query: 'robberies',
      region: 'a',
      maxArticles: 20,
      frequency: 'MANUAL' as const,
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('required');
    }
  });

  it('rejects maxArticles less than 1', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
      maxArticles: 0,
      frequency: 'MANUAL' as const,
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects maxArticles greater than 50', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
      maxArticles: 51,
      frequency: 'MANUAL' as const,
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects invalid frequency', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
      maxArticles: 20,
      frequency: 'HOURLY',
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('accepts all valid frequencies', () => {
    const frequencies = ['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'MANUAL'] as const;

    for (const frequency of frequencies) {
      const input = {
        query: 'robberies',
        region: 'Savannah, GA',
        maxArticles: 20,
        frequency,
      };

      const result = createAlertSchema.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it('accepts optional fromDate', () => {
    const input = {
      query: 'robberies',
      region: 'Savannah, GA',
      maxArticles: 20,
      frequency: 'DAILY' as const,
      fromDate: new Date('2024-01-01'),
    };

    const result = createAlertSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

describe('FREQUENCY_OPTIONS', () => {
  it('has all expected options', () => {
    expect(FREQUENCY_OPTIONS).toHaveLength(5);

    const values = FREQUENCY_OPTIONS.map((opt) => opt.value);
    expect(values).toContain('MANUAL');
    expect(values).toContain('DAILY');
    expect(values).toContain('WEEKLY');
    expect(values).toContain('BIWEEKLY');
    expect(values).toContain('MONTHLY');
  });

  it('has labels for all options', () => {
    for (const option of FREQUENCY_OPTIONS) {
      expect(option.label).toBeTruthy();
      expect(typeof option.label).toBe('string');
    }
  });
});
