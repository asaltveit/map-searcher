import { z } from 'zod';

export const alertFrequencySchema = z.enum(['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'MANUAL']);

export type AlertFrequency = z.infer<typeof alertFrequencySchema>;

export const createAlertSchema = z.object({
  query: z.string().min(2, 'Query must be at least 2 characters'),
  region: z.string().min(2, 'Region is required'),
  maxArticles: z.number().min(1, 'At least 1 article').max(50, 'Maximum 50 articles'),
  frequency: alertFrequencySchema,
  fromDate: z.date().optional(),
});

export type CreateAlertFormData = z.infer<typeof createAlertSchema>;

export const FREQUENCY_OPTIONS: { value: AlertFrequency; label: string }[] = [
  { value: 'MANUAL', label: 'Manual only' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'BIWEEKLY', label: 'Biweekly' },
  { value: 'MONTHLY', label: 'Monthly' },
];
