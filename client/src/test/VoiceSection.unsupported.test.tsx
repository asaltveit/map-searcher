/**
 * Tests for VoiceSection when speech recognition is not supported.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { VoiceSection } from "@/components/voice/VoiceSection";

vi.mock("@/hooks/useSpeechRecognition", () => ({
  useSpeechRecognition: () => ({
    isSupported: false,
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

describe("VoiceSection (unsupported STT)", () => {
  it("renders message when speech recognition is not supported", () => {
    render(<VoiceSection />);
    expect(
      screen.getByText(/speech recognition is not supported/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/try chrome or edge/i)).toBeInTheDocument();
  });

  it("still renders a region with title", () => {
    render(<VoiceSection />);
    const region = document.querySelector('[role="region"][aria-labelledby="voice-section-title"]');
    expect(region).toBeInTheDocument();
    expect(screen.getByText("Voice input")).toBeInTheDocument();
  });
});
