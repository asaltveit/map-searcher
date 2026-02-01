"use client";

import { useCallback, useRef, useState } from "react";
import { textToSpeech, type TTSVoice } from "@/lib/api";

export interface UseTTSOptions {
  voice?: TTSVoice;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useTTS(options?: UseTTSOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

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
      setError(null);

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
          setIsPlaying(false);
          options?.onError?.(err);
          cleanup();
        };

        console.log("[useTTS] Attempting to play audio...");
        await audio.play();
        console.log("[useTTS] audio.play() succeeded");
      } catch (err) {
        console.error("[useTTS] Error:", err);
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error.message);
        options?.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [cleanup, options]
  );

  const stop = useCallback(() => {
    cleanup();
    setIsPlaying(false);
  }, [cleanup]);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    error,
  };
}
