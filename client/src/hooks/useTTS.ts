"use client";

import { useCallback, useRef, useState } from "react";
import { textToSpeech, TTSRateLimitError, type TTSVoice } from "@/lib/api";

export interface UseTTSOptions {
  voice?: TTSVoice;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  /** If true, will use browser TTS when API fails. Default: true */
  useFallback?: boolean;
}

/**
 * Use browser's built-in speech synthesis as fallback
 */
function speakWithBrowserTTS(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: Error) => void
): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("[useTTS] Browser TTS not supported");
    onError?.(new Error("Browser TTS not supported"));
    return null;
  }

  console.log("[useTTS] Using browser TTS fallback");

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to get a good voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (v) => v.name.includes("Samantha") || v.name.includes("Google") || v.lang.startsWith("en")
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    console.log("[useTTS] Browser TTS started");
    onStart?.();
  };

  utterance.onend = () => {
    console.log("[useTTS] Browser TTS ended");
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.error("[useTTS] Browser TTS error:", e);
    onError?.(new Error("Browser TTS failed"));
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function useTTS(options?: UseTTSOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const useFallback = options?.useFallback ?? true;

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (utteranceRef.current && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }
  }, []);

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        console.log("[useTTS] No text to speak");
        return;
      }

      console.log(`[useTTS] Starting TTS for text: "${text.substring(0, 50)}..."`);
      cleanup();
      setIsLoading(true);
      setIsPreparing(false);
      setError(null);
      setUsingFallback(false);

      try {
        console.log("[useTTS] Calling textToSpeech API...");
        const audioBlob = await textToSpeech(text, options?.voice ?? "nova");
        console.log(`[useTTS] Got audio blob: size=${audioBlob.size}, type=${audioBlob.type}`);

        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;
        console.log(`[useTTS] Created blob URL: ${audioUrl}`);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          console.log("[useTTS] Audio playing");
          setIsPreparing(false);
          setIsPlaying(true);
          options?.onStart?.();
        };

        audio.onended = () => {
          console.log("[useTTS] Audio ended");
          setIsPlaying(false);
          options?.onEnd?.();
          // Delay cleanup to avoid error event from revoking blob URL
          setTimeout(cleanup, 100);
        };

        audio.onerror = (e) => {
          // Ignore errors after audio has ended (caused by cleanup)
          if (!audioRef.current) return;
          console.error("[useTTS] Audio error:", e);
          const err = new Error("Failed to play audio");
          setError(err.message);
          setIsPreparing(false);
          setIsPlaying(false);
          options?.onError?.(err);
          cleanup();
        };

        console.log("[useTTS] Attempting to play audio...");
        setIsLoading(false);
        setIsPreparing(true);
        await audio.play();
        console.log("[useTTS] audio.play() succeeded");
      } catch (err) {
        console.error("[useTTS] Error:", err);
        setIsLoading(false);
        setIsPreparing(false);

        // Check if rate limited and fallback is enabled
        if (err instanceof TTSRateLimitError && useFallback) {
          console.log("[useTTS] Rate limited - falling back to browser TTS");
          setUsingFallback(true);
          setError(null); // Clear error since we're handling it

          utteranceRef.current = speakWithBrowserTTS(
            text,
            () => {
              setIsPlaying(true);
              options?.onStart?.();
            },
            () => {
              setIsPlaying(false);
              options?.onEnd?.();
            },
            (fallbackErr) => {
              setError(fallbackErr.message);
              setIsPlaying(false);
              options?.onError?.(fallbackErr);
            }
          );
          return;
        }

        const error = err instanceof Error ? err : new Error(String(err));
        setError(error.message);
        options?.onError?.(error);
      }
    },
    [cleanup, options, useFallback]
  );

  const stop = useCallback(() => {
    cleanup();
    setIsPreparing(false);
    setIsPlaying(false);
  }, [cleanup]);

  return {
    speak,
    stop,
    isLoading,
    /** True when audio blob is received but playback hasn't started yet (buffering) */
    isPreparing,
    isPlaying,
    error,
    /** True if currently using browser TTS instead of OpenAI */
    usingFallback,
  };
}
