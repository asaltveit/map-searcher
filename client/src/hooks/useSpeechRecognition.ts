"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}

function getSpeechRecognition(): typeof SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(options?: {
  continuous?: boolean;
  lang?: string;
  onResult?: (transcript: string, isFinal: boolean) => void;
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Defer support check to avoid hydration mismatch
  const [isSupported, setIsSupported] = useState<boolean | null>(() => {
    // Initialize with null on server, will be set after mount
    return typeof window === "undefined" ? null : !!getSpeechRecognition();
  });
  const recognitionRef = useRef<{ stop: () => void } | null>(null);
  const onResultRef = useRef(options?.onResult);

  // Update support state on mount if it was initialized as null
  useEffect(() => {
    if (isSupported === null) {
      // Use timeout to defer setState and avoid cascading render warning
      const timer = setTimeout(() => {
        setIsSupported(!!getSpeechRecognition());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isSupported]);

  useEffect(() => {
    onResultRef.current = options?.onResult;
  }, [options?.onResult]);

  const start = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    setError(null);
    setTranscript("");
    setInterimTranscript("");
    const recognition = new SR();
    recognition.continuous = options?.continuous ?? true;
    recognition.lang = options?.lang ?? "en-US";
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result.isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }
      if (interim) setInterimTranscript(interim);
      if (final) {
        setTranscript((prev) => (prev + final).trim());
        setInterimTranscript("");
        onResultRef.current?.(final, true);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setError("Microphone access was denied.");
      } else if (event.error === "no-speech") {
        setError("No speech detected. Try again.");
      } else {
        setError(event.error || "Speech recognition error.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [options?.continuous, options?.lang]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  };
}
