/**
 * Type declarations for jest-axe (used with Vitest in test runs).
 * jest-axe has no @types package. Vitest expect.extend() expects an object of matchers.
 */
/// <reference types="vitest" />
declare module "jest-axe" {
  export interface AxeResults {
    violations: unknown[];
    passes: unknown[];
    incomplete: unknown[];
    inapplicable: unknown[];
  }

  export function axe(
    container: Element | Document,
    options?: unknown
  ): Promise<AxeResults>;

  export function toHaveNoViolations(
    results: AxeResults
  ): { message: () => string; pass: boolean };
}

declare module "vitest" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
