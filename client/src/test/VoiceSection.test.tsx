/**
 * Accessibility and security tests for VoiceSection.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { VoiceSection } from "@/components/voice/VoiceSection";

// Mock speech hooks so we get the "supported" UI
vi.mock("@/hooks/useSpeechRecognition", () => ({
  useSpeechRecognition: () => ({
    isSupported: true,
    isListening: false,
    transcript: "",
    interimTranscript: "",
    error: null,
    start: vi.fn(),
    stop: vi.fn(),
    reset: vi.fn(),
  }),
}));

vi.mock("@/hooks/useSpeechSynthesis", () => ({
  useSpeechSynthesis: () => ({
    isSupported: true,
    isSpeaking: false,
    speak: vi.fn(),
    cancel: vi.fn(),
  }),
}));

describe("VoiceSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has no axe violations when STT is supported", async () => {
    const { container } = render(<VoiceSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a region with aria-labelledby pointing to the title", () => {
    render(<VoiceSection />);
    const region = document.querySelector('[role="region"][aria-labelledby="voice-section-title"]');
    expect(region).toBeInTheDocument();
    const title = document.getElementById("voice-section-title");
    expect(title).toHaveTextContent("Voice");
  });

  it("has a live region for the transcript with aria-label", () => {
    render(<VoiceSection />);
    const live = document.querySelector('[role="status"][aria-live="polite"][aria-label="Live transcript"]');
    expect(live).toBeInTheDocument();
  });

  it("associates the text-to-speech input with its label", () => {
    render(<VoiceSection />);
    const input = screen.getByLabelText(/text to speak/i);
    expect(input).toHaveAttribute("id", "voice-speak-input");
  });

  it("mic button has accessible name and aria-pressed", () => {
    render(<VoiceSection />);
    const mic = screen.getByRole("button", { name: /start listening/i });
    expect(mic).toHaveAttribute("aria-pressed", "false");
  });

  it("speak button has accessible name", () => {
    render(<VoiceSection />);
    const speak = screen.getByRole("button", { name: /speak the text/i });
    expect(speak).toBeInTheDocument();
  });

  it("shows Speak last response button when textToSpeak is provided", () => {
    render(<VoiceSection textToSpeak="Hello from the assistant" />);
    const speakLast = screen.getByRole("button", { name: /speak last response/i });
    expect(speakLast).toBeInTheDocument();
  });
});
