/**
 * Accessibility tests for the home page (main landmark).
 */
import type { ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "../app/page";

// Mock react-map-gl/maplibre
vi.mock("react-map-gl/maplibre", () => ({
  default: function MockMap({ children }: { children?: ReactNode }) {
    return <div data-testid="map">{children}</div>;
  },
  NavigationControl: function MockNavigationControl() {
    return null;
  },
  Source: function MockSource({ children }: { children?: ReactNode }) {
    return <>{children}</>;
  },
  Layer: function MockLayer() {
    return null;
  },
  Popup: function MockPopup({ children }: { children?: ReactNode }) {
    return <div>{children}</div>;
  },
  useMap: () => ({ current: null }),
}));

vi.mock("../../node_modules/maplibre-gl/dist/maplibre-gl.css", () => ({}));

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock useAlerts hook
vi.mock("../hooks/useAlerts", () => ({
  useAlerts: () => ({
    alerts: [],
    selectedAlertId: null,
    selectedAlert: null,
    locations: null,
    loading: false,
    locationsLoading: false,
    hasProcessingAlerts: false,
    selectAlert: vi.fn(),
    refreshAll: vi.fn(),
  }),
}));

// Mock useAuth hook to provide authenticated state
vi.mock("../contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  useAuth: () => ({
    user: { id: "1", email: "test@example.com", name: "Test User" },
    loading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    refreshUser: vi.fn(),
  }),
}));

function renderWithAuth(ui: ReactNode) {
  return render(ui);
}

describe("Home page", () => {
  it("has no axe violations", async () => {
    const { container } = renderWithAuth(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has main landmark with id and aria-label", () => {
    renderWithAuth(<Home />);
    const main = screen.getByRole("main", { name: /main content/i });
    expect(main).toHaveAttribute("id", "main-content");
  });
});
