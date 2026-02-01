/**
 * Type declarations for jest-axe (used with Vitest in test runs).
 * jest-axe has no @types package. Test files are excluded from the main TS build.
 */
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
