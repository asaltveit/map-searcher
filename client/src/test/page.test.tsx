/**
 * Accessibility tests for the home page (main landmark).
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Home from "@/app/page";

expect.extend(toHaveNoViolations);

describe("Home page", () => {
  it("has no axe violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has main landmark with id and aria-label", () => {
    render(<Home />);
    const main = screen.getByRole("main", { name: /main content/i });
    expect(main).toHaveAttribute("id", "main-content");
  });
});
