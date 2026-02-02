"use client";

import { useState, useCallback, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTTS } from "@/hooks/useTTS";
import { chatWithArticles } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { WaveformIndicator, type WaveformState } from "@/components/ui/AudioWaveform";
import { cn } from "@/lib/utils";
import { Mic, Volume2, VolumeX } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface VoiceChatPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertId: string | null;
  alertQuery?: string;
}

export function VoiceChatPanel({
  open,
  onOpenChange,
  alertId,
  alertQuery,
}: VoiceChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const {
    isSupported: sttSupported,
    isListening,
    transcript,
    interimTranscript,
    error: sttError,
    start: startListening,
    stop: stopListening,
    reset: resetTranscript,
  } = useSpeechRecognition({ continuous: true });

  const {
    speak,
    stop: stopSpeaking,
    isLoading: ttsLoading,
    isPreparing: ttsPreparing,
    isPlaying: isSpeaking,
  } = useTTS({ voice: "nova" });

  // Determine waveform state
  const getWaveformState = (): WaveformState => {
    if (isListening) return "listening";
    if (isSpeaking) return "speaking";
    if (ttsPreparing) return "preparing";
    if (isProcessing || ttsLoading) return "thinking";
    return "idle";
  };

  const waveformState = getWaveformState();

  // Send message to chat API
  const sendMessage = useCallback(
    async (text: string) => {
      if (!alertId || !text.trim()) return;

      const userMessage: Message = {
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);
      setError(null);

      try {
        const response = await chatWithArticles(alertId, text.trim());

        const assistantMessage: Message = {
          role: "assistant",
          content: response.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Auto-speak response if enabled
        if (autoSpeak && response.response) {
          speak(response.response);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(errorMsg);
      } finally {
        setIsProcessing(false);
      }
    },
    [alertId, autoSpeak, speak]
  );

  // Handle mic toggle
  const handleMicToggle = useCallback(() => {
    if (isListening) {
      stopListening();
      const fullTranscript = (transcript + " " + interimTranscript).trim();
      if (fullTranscript) {
        sendMessage(fullTranscript);
      }
      resetTranscript();
    } else {
      // Stop any playing audio before listening
      stopSpeaking();
      resetTranscript();
      startListening();
    }
  }, [
    isListening,
    stopListening,
    transcript,
    interimTranscript,
    sendMessage,
    resetTranscript,
    stopSpeaking,
    startListening,
  ]);

  // Clear chat when alert changes
  useEffect(() => {
    setMessages([]);
    setError(null);
  }, [alertId]);

  // Live transcript
  const liveTranscript = (transcript + " " + interimTranscript).trim();

  if (!alertId) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-[320px] sm:w-[380px] flex flex-col"
        >
          <SheetHeader>
            <SheetTitle>Voice Chat</SheetTitle>
            <SheetDescription>
              Select an alert to start voice chat with its articles.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[380px] flex flex-col p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <h2 className="text-sm font-semibold">Voice Chat</h2>
            {alertQuery && (
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                {alertQuery}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAutoSpeak(!autoSpeak)}
            className="h-8 w-8"
            title={autoSpeak ? "Disable auto-speak" : "Enable auto-speak"}
          >
            {autoSpeak ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Waveform indicator */}
        <div className="flex items-center justify-center py-4 px-4 border-b bg-zinc-50 dark:bg-zinc-900">
          <WaveformIndicator state={waveformState} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.length === 0 && !isListening && (
            <div className="text-center text-sm text-muted-foreground py-8">
              <p>Click the microphone to ask a question</p>
              <p className="mt-1 text-xs">about your alert&apos;s articles</p>
            </div>
          )}

          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "bg-zinc-100 dark:bg-zinc-800 ml-8"
                  : "bg-emerald-50 dark:bg-emerald-950 mr-8 border border-emerald-200 dark:border-emerald-800"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}

          {/* Live transcript while listening */}
          {isListening && liveTranscript && (
            <div className="rounded-lg px-3 py-2 text-sm bg-red-50 dark:bg-red-950 ml-8 border border-red-200 dark:border-red-800 opacity-70">
              <p className="whitespace-pre-wrap">{liveTranscript}</p>
            </div>
          )}

          {/* Processing indicator */}
          {isProcessing && (
            <div className="rounded-lg px-3 py-2 text-sm bg-amber-50 dark:bg-amber-950 mr-8 border border-amber-200 dark:border-amber-800">
              <p className="text-amber-700 dark:text-amber-300">Thinking...</p>
            </div>
          )}
        </div>

        {/* Error display */}
        {(error || sttError) && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-950 border-t border-red-200 dark:border-red-800">
            <p className="text-xs text-red-600 dark:text-red-400">
              {error || sttError}
            </p>
          </div>
        )}

        {/* Mic button */}
        <div className="p-4 border-t flex justify-center">
          <Button
            onClick={handleMicToggle}
            disabled={!sttSupported || isProcessing || ttsLoading || ttsPreparing}
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={cn(
              "rounded-full h-16 shadow-lg",
              isListening ? "w-auto px-6" : "w-16"
            )}
          >
            {isListening ? (
              <span className="font-bold">Send!!</span>
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="px-4 pb-4 text-center">
          <p className="text-xs text-muted-foreground">
            {!sttSupported
              ? "Speech recognition not supported"
              : isListening
                ? "Tap to stop and send"
                : isProcessing
                  ? "Getting response..."
                  : ttsPreparing
                    ? "Starting voice..."
                    : isSpeaking
                      ? "Playing response..."
                      : "Tap to speak"}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
