/**
 * Tests for Input component.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders an input with default type text", () => {
    render(<Input placeholder="Enter value" />);
    const input = screen.getByPlaceholderText("Enter value");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input.getAttribute("type") ?? "text").toBe("text");
  });

  it("applies type and forwards props", () => {
    render(<Input type="email" aria-label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("accepts value and onChange", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(input).toHaveValue("hello");
  });

  it("merges className", () => {
    render(<Input className="my-class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("my-class");
  });
});
