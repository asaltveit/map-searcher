/**
 * Tests for useSpeechSynthesis hook.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

// jsdom does not define SpeechSynthesisUtterance
class MockSpeechSynthesisUtterance {
  text = "";
  lang = "en-US";
  rate = 1;
  pitch = 1;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(text?: string) {
    this.text = text ?? "";
  }
}

describe("useSpeechSynthesis", () => {
  const mockSpeak = vi.fn();
  const mockCancel = vi.fn();

  beforeEach(() => {
    mockSpeak.mockClear();
    mockCancel.mockClear();
    Object.defineProperty(window, "speechSynthesis", {
      value: { speak: mockSpeak, cancel: mockCancel },
      writable: true,
    });
    (window as unknown as { SpeechSynthesisUtterance: typeof MockSpeechSynthesisUtterance }).SpeechSynthesisUtterance =
      MockSpeechSynthesisUtterance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reports isSupported true when speechSynthesis is available", () => {
    const { result } = renderHook(() => useSpeechSynthesis());
    expect(result.current.isSupported).toBe(true);
  });

  it("speak() calls speechSynthesis.cancel then speak with utterance", () => {
    const { result } = renderHook(() => useSpeechSynthesis());
    act(() => {
      result.current.speak("Hello world");
    });
    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).toHaveBeenCalledTimes(1);
    const utterance = mockSpeak.mock.calls[0][0] as InstanceType<typeof MockSpeechSynthesisUtterance>;
    expect(utterance).toBeInstanceOf(MockSpeechSynthesisUtterance);
    expect(utterance.text).toBe("Hello world");
    expect(utterance.lang).toBe("en-US");
    expect(utterance.rate).toBe(1);
    expect(utterance.pitch).toBe(1);
  });

  it("cancel() calls speechSynthesis.cancel and sets isSpeaking false", () => {
    const { result } = renderHook(() => useSpeechSynthesis());
    act(() => {
      result.current.speak("Hi");
    });
    act(() => {
      result.current.cancel();
    });
    expect(mockCancel).toHaveBeenCalled();
    expect(result.current.isSpeaking).toBe(false);
  });

  it("accepts options for lang, rate, pitch", () => {
    const { result } = renderHook(() =>
      useSpeechSynthesis({ lang: "fr-FR", rate: 1.2, pitch: 0.9 })
    );
    act(() => {
      result.current.speak("Test");
    });
    const utterance = mockSpeak.mock.calls[0][0] as InstanceType<typeof MockSpeechSynthesisUtterance>;
    expect(utterance.lang).toBe("fr-FR");
    expect(utterance.rate).toBe(1.2);
    expect(utterance.pitch).toBe(0.9);
  });
});
