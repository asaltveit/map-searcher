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
      if (!text.trim()) return;

      cleanup();
      setIsLoading(true);
      setError(null);

      try {
        const audioBlob = await textToSpeech(text, options?.voice ?? "nova");
        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          setIsPlaying(true);
          options?.onStart?.();
        };

        audio.onended = () => {
          setIsPlaying(false);
          options?.onEnd?.();
          cleanup();
        };

        audio.onerror = () => {
          const err = new Error("Failed to play audio");
          setError(err.message);
          setIsPlaying(false);
          options?.onError?.(err);
          cleanup();
        };

        await audio.play();
      } catch (err) {
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
