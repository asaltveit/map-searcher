/**
 * Tests for useSpeechRecognition hook.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

describe("useSpeechRecognition", () => {
  let mockRecognition: {
    start: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
    continuous: boolean;
    lang: string;
    interimResults: boolean;
    onresult: ((e: SpeechRecognitionEvent) => void) | null;
    onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
  };

  beforeEach(() => {
    mockRecognition = {
      start: vi.fn(),
      stop: vi.fn(),
      continuous: false,
      lang: "",
      interimResults: false,
      onresult: null,
      onerror: null,
      onend: null,
    };
    (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition = vi.fn(
      () => mockRecognition
    );
    delete (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
  });

  afterEach(() => {
    delete (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition;
    vi.restoreAllMocks();
  });

  it("reports isSupported true when SpeechRecognition is available", async () => {
    const { result } = renderHook(() => useSpeechRecognition());
    await waitFor(() => {
      expect(result.current.isSupported).toBe(true);
    });
  });

  it("start() sets isListening and calls recognition.start()", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => {
      result.current.start();
    });
    expect(result.current.isListening).toBe(true);
    expect(mockRecognition.start).toHaveBeenCalled();
    expect(mockRecognition.continuous).toBe(true);
    expect(mockRecognition.lang).toBe("en-US");
    expect(mockRecognition.interimResults).toBe(true);
  });

  it("stop() clears isListening and calls recognition.stop()", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => {
      result.current.start();
    });
    expect(result.current.isListening).toBe(true);
    act(() => {
      result.current.stop();
    });
    expect(result.current.isListening).toBe(false);
    expect(mockRecognition.stop).toHaveBeenCalled();
  });

  it("reset() clears transcript and interimTranscript", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => {
      result.current.start();
    });
    // Simulate a final result via minimal mock
    const mockResult = {
      length: 1,
      isFinal: true,
      0: { transcript: "hello", confidence: 1 },
      item: () => ({ transcript: "hello", confidence: 1 }),
    };
    const mockResults = {
      length: 1,
      resultIndex: 0,
      0: mockResult,
      item: () => mockResult,
    };
    act(() => {
      mockRecognition.onresult?.({
        resultIndex: 0,
        results: mockResults as unknown as SpeechRecognitionResultList,
      } as SpeechRecognitionEvent);
    });
    expect(result.current.transcript).toBe("hello");
    act(() => {
      result.current.reset();
    });
    expect(result.current.transcript).toBe("");
    expect(result.current.interimTranscript).toBe("");
  });

  it("onerror with not-allowed sets error message", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => {
      result.current.start();
    });
    act(() => {
      mockRecognition.onerror?.({ error: "not-allowed" } as SpeechRecognitionErrorEvent);
    });
    expect(result.current.error).toBe("Microphone access was denied.");
    expect(result.current.isListening).toBe(false);
  });

  it("onend sets isListening to false", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => {
      result.current.start();
    });
    expect(result.current.isListening).toBe(true);
    act(() => {
      mockRecognition.onend?.();
    });
    expect(result.current.isListening).toBe(false);
  });

  it("accepts options for continuous and lang", () => {
    const { result } = renderHook(() =>
      useSpeechRecognition({ continuous: false, lang: "fr-FR" })
    );
    act(() => {
      result.current.start();
    });
    expect(mockRecognition.continuous).toBe(false);
    expect(mockRecognition.lang).toBe("fr-FR");
  });
});
