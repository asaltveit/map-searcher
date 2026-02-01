import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

// jest-axe exports toHaveNoViolations as { toHaveNoViolations(results) {...} } for expect.extend()
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});
