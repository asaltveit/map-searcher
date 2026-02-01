/**
 * Tests for MapContainer component.
 */
import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MapContainer } from "@/components/map/map-container";
import { DEFAULT_VIEW_STATE, MAP_STYLES } from "@/lib/map-config";

vi.mock("react-map-gl/maplibre", () => ({
  default: function MockMap({
    children,
    initialViewState,
    mapStyle,
  }: {
    children?: ReactNode;
    initialViewState: object;
    mapStyle: string;
  }) {
    return (
      <div data-testid="map" data-initial-view-state={JSON.stringify(initialViewState)} data-map-style={mapStyle}>
        {children}
      </div>
    );
  },
  NavigationControl: function MockNavigationControl({ position }: { position?: string }) {
    return <div data-testid="navigation-control" data-position={position} />;
  },
}));

vi.mock("maplibre-gl/dist/maplibre-gl.css", () => ({}));

describe("MapContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a wrapper with relative class", () => {
    const { container } = render(<MapContainer />);
    const wrapper = container.querySelector(".relative");
    expect(wrapper).not.toBeNull();
    if (!wrapper) return;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("relative");
  });

  it("merges custom className", () => {
    const { container } = render(<MapContainer className="h-[400px] w-full" />);
    const wrapper = container.querySelector(".relative");
    expect(wrapper).not.toBeNull();
    if (!wrapper) return;
    expect(wrapper).toHaveClass("relative", "h-[400px]", "w-full");
  });

  it("renders the map with default view state and liberty style", () => {
    render(<MapContainer />);
    const map = screen.getByTestId("map");
    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute("data-initial-view-state", JSON.stringify(DEFAULT_VIEW_STATE));
    expect(map).toHaveAttribute("data-map-style", MAP_STYLES.liberty);
  });

  it("renders NavigationControl with top-right position", () => {
    render(<MapContainer />);
    const control = screen.getByTestId("navigation-control");
    expect(control).toBeInTheDocument();
    expect(control).toHaveAttribute("data-position", "top-right");
  });

  it("renders children inside the map", () => {
    render(
      <MapContainer>
        <span data-testid="child">Marker</span>
      </MapContainer>
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Marker");
  });
});
