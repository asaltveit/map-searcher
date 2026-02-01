/**
 * Tests for Button component.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "@/components/ui/button";

describe("Button", () => {
  it("renders as a button with default variant and size", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-slot", "button");
    expect(btn).toHaveAttribute("data-variant", "default");
    expect(btn).toHaveAttribute("data-size", "default");
  });

  it("applies variant and size via props", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );
    const btn = screen.getByRole("button", { name: /delete/i });
    expect(btn).toHaveAttribute("data-variant", "destructive");
    expect(btn).toHaveAttribute("data-size", "lg");
  });

  it("forwards className and other props", () => {
    render(
      <Button className="custom-class" type="submit" disabled>
        Submit
      </Button>
    );
    const btn = screen.getByRole("button", { name: /submit/i });
    expect(btn).toHaveClass("custom-class");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toBeDisabled();
  });

  it("renders with asChild as child element", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveAttribute("data-slot", "button");
  });
});

describe("buttonVariants", () => {
  it("returns a string of class names", () => {
    const classes = buttonVariants({ variant: "default", size: "default" });
    expect(typeof classes).toBe("string");
    expect(classes.length).toBeGreaterThan(0);
  });
});
