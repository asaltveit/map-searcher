"use client";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Volume2 } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Cast for React 19 + lucide-react type compatibility
const iconProps: LucideProps = { className: "size-4", "aria-hidden": true };
const MicIcon = () => <Mic {...iconProps} />;
const MicOffIcon = () => <MicOff {...iconProps} />;
const Volume2Icon = () => <Volume2 {...iconProps} />;

type VoiceSectionProps = {
  /** When user finishes speaking (final transcript), call with the text (e.g. to submit as chat message). */
  onTranscript?: (text: string) => void;
  /** Optional text to speak (e.g. assistant reply). When set, a "Speak" control is shown. */
  textToSpeak?: string;
  className?: string;
};

export function VoiceSection({ onTranscript, textToSpeak, className }: VoiceSectionProps) {
  const [speakInput, setSpeakInput] = useState("");

  const { speak: speakText } = useSpeechSynthesis();

  const {
    isSupported: sttSupported,
    isListening,
    transcript,
    interimTranscript,
    error: sttError,
    start,
    stop,
    reset,
  } = useSpeechRecognition({ continuous: true });

  const handleToggleMic = () => {
    if (isListening) {
      stop();
      const full = (transcript + " " + interimTranscript).trim();
      if (full && onTranscript) onTranscript(full);
    } else {
      reset();
      start();
    }
  };

  const handleSpeakInput = () => {
    const t = speakInput.trim() || textToSpeak;
    if (t) speakText(t);
  };

  const displayTranscript = (transcript + " " + interimTranscript).trim() || "—";

  if (!sttSupported) {
    return (
      <Card className={cn("border-muted", className)} role="region" aria-labelledby="voice-section-title">
        <CardHeader>
          <CardTitle id="voice-section-title" className="text-lg">Voice</CardTitle>
          <CardDescription>
            Speech recognition is not supported in this browser. Try Chrome or Edge.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={cn("border-muted", className)} role="region" aria-labelledby="voice-section-title">
      <CardHeader>
        <CardTitle id="voice-section-title" className="text-lg">Voice</CardTitle>
        <CardDescription>
          Use the microphone to speak (speech-to-text), or enter text to hear it read aloud (text-to-speech).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* STT: Mic + transcript */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={isListening ? "destructive" : "default"}
              size="icon"
              onClick={handleToggleMic}
              aria-label={isListening ? "Stop listening" : "Start listening"}
              aria-pressed={isListening}
            >
              {isListening ? <MicOffIcon /> : <MicIcon />}
            </Button>
            <span className="text-sm text-muted-foreground">
              {isListening ? "Listening… (click mic to stop and send)" : "Click mic to speak"}
            </span>
          </div>
          <div
            className="min-h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm"
            role="status"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Live transcript"
          >
            {displayTranscript}
          </div>
          {sttError && (
            <p className="text-sm text-destructive" role="alert">
              {sttError}
            </p>
          )}
        </div>

        {/* TTS: input + speak */}
        <div className="space-y-2">
          <label htmlFor="voice-speak-input" className="text-sm font-medium">
            Text to speak
          </label>
          <div className="flex gap-2">
            <Input
              id="voice-speak-input"
              type="text"
              placeholder={textToSpeak ? "Or type here…" : "Enter text to hear it read aloud"}
              value={speakInput}
              onChange={(e) => setSpeakInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSpeakInput()}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSpeakInput}
              aria-label="Speak the text"
              disabled={!speakInput.trim() && !textToSpeak}
            >
              <Volume2Icon />
            </Button>
          </div>
          {textToSpeak && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => speakText(textToSpeak)}
              className="w-full"
            >
              Speak last response
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
