/**
 * Tests for Card components.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card", () => {
  it("renders Card with data-slot", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveTextContent("Content");
  });

  it("merges className", () => {
    render(
      <Card className="custom-card" data-testid="card">
        Content
      </Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("custom-card");
  });
});

describe("CardHeader", () => {
  it("renders with data-slot card-header", () => {
    render(
      <Card>
        <CardHeader data-testid="header">Header</CardHeader>
      </Card>
    );
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-slot", "card-header");
    expect(header).toHaveTextContent("Header");
  });
});

describe("CardTitle", () => {
  it("renders with data-slot card-title", () => {
    render(
      <Card>
        <CardTitle data-testid="title">Title</CardTitle>
      </Card>
    );
    const title = screen.getByTestId("title");
    expect(title).toHaveAttribute("data-slot", "card-title");
    expect(title).toHaveTextContent("Title");
  });
});

describe("CardDescription", () => {
  it("renders with data-slot card-description", () => {
    render(
      <Card>
        <CardDescription data-testid="desc">Description</CardDescription>
      </Card>
    );
    const desc = screen.getByTestId("desc");
    expect(desc).toHaveAttribute("data-slot", "card-description");
    expect(desc).toHaveTextContent("Description");
  });
});

describe("CardContent", () => {
  it("renders with data-slot card-content", () => {
    render(
      <Card>
        <CardContent data-testid="content">Body</CardContent>
      </Card>
    );
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-slot", "card-content");
    expect(content).toHaveTextContent("Body");
  });
});

describe("CardFooter", () => {
  it("renders with data-slot card-footer", () => {
    render(
      <Card>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>
    );
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
    expect(footer).toHaveTextContent("Footer");
  });
});

describe("Card composition", () => {
  it("renders full card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
