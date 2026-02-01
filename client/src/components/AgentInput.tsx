"use client";

import { useState, useCallback } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAgents,
  sendAgentMessage,
  updateResearchBlock,
  getLastAssistantContent,
  type AgentIds,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { Search, FileText, Mic, MicOff, Volume2 } from "lucide-react";

const MAP_PROMPT =
  "Update the map using the research in your context. Add layers for any places or routes mentioned.";

export function AgentInput({
  className,
  onAfterMapAgentResponse,
}: {
  className?: string;
  /** Called after map agent responds so the client can refetch map state and update the map. */
  onAfterMapAgentResponse?: () => Promise<void>;
}) {
  const [agents, setAgents] = useState<AgentIds | null>(null);
  const [askInput, setAskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { speak: speakText } = useSpeechSynthesis();
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

  const ensureAgents = useCallback(async (): Promise<AgentIds> => {
    if (agents) return agents;
    const ids = await getAgents();
    setAgents(ids);
    return ids;
  }, [agents]);

  const submitMessage = useCallback(
    async (userText: string) => {
      const text = userText.trim();
      if (!text) return;
      setLoading(true);
      setError(null);
      setLastResponse("");
      try {
        const ids = await ensureAgents();
        const researchResponse = await sendAgentMessage(ids.researchAgentId, text);
        const researchContent = getLastAssistantContent(researchResponse);
        if (researchContent) {
          await updateResearchBlock(ids.researchBlockId, researchContent);
          const mapResponse = await sendAgentMessage(ids.mapAgentId, MAP_PROMPT);
          const mapContent = getLastAssistantContent(mapResponse);
          setLastResponse(mapContent || researchContent);
          await onAfterMapAgentResponse?.();
        } else {
          setLastResponse(getLastAssistantContent(researchResponse) || "No reply from research agent.");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    },
    [ensureAgents, onAfterMapAgentResponse]
  );

  const handleAskSubmit = () => {
    submitMessage(askInput);
    setAskInput("");
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
      const full = (transcript + " " + interimTranscript).trim();
      if (full) {
        setAskInput(full);
        submitMessage(full);
      }
    } else {
      resetTranscript();
      setAskInput("");
      startListening();
    }
  };

  const liveTranscript = (transcript + " " + interimTranscript).trim();
  const showMic = sttSupported !== false; // show slot when unknown or supported (avoids layout shift)
  const micReady = sttSupported === true;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Research query bar: text + voice in one row */}
      <section className="space-y-2" aria-label="Research query">
        <label htmlFor="ask-input" className="sr-only">
          Ask a research question
        </label>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="ask-input"
              type="text"
              placeholder={
                isListening
                  ? (liveTranscript || "Listening…")
                  : "Search events, places, or ask a question…"
              }
              value={askInput}
              onChange={(e) => setAskInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskSubmit()}
              disabled={loading || isListening}
              className="min-h-[48px] touch-manipulation pl-9 text-base shadow-sm sm:min-h-[52px] sm:pl-10 sm:text-base"
              aria-describedby={showMic ? "ask-mic-hint" : undefined}
              aria-live={isListening ? "polite" : undefined}
              aria-atomic={isListening}
            />
          </div>
          {showMic && (
            <Button
              type="button"
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              className="min-h-[48px] min-w-[48px] shrink-0 touch-manipulation sm:min-h-[52px] sm:min-w-[52px]"
              onClick={handleToggleMic}
              disabled={loading || !micReady}
              aria-label={
                !micReady
                  ? "Voice input loading"
                  : isListening
                    ? "Stop listening and send"
                    : "Speak your question"
              }
              aria-pressed={isListening}
              aria-busy={!micReady}
            >
              {isListening ? <MicOff className="size-4" aria-hidden /> : <Mic className="size-4" aria-hidden />}
            </Button>
          )}
          <Button
            type="button"
            onClick={handleAskSubmit}
            disabled={loading || !askInput.trim()}
            className="min-h-[48px] shrink-0 touch-manipulation px-5 sm:min-h-[52px]"
          >
            {loading ? "Researching…" : "Research"}
          </Button>
        </div>
        {showMic && micReady && (
          <p id="ask-mic-hint" className="text-xs text-muted-foreground">
            {isListening ? "Tap the mic again to stop and send." : "Use the mic to speak your question."}
          </p>
        )}
        {sttError && (
          <p className="text-xs text-destructive" role="alert">
            {sttError}
          </p>
        )}
      </section>

      {error && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {lastResponse && (
        <section
          className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5 sm:py-5"
          aria-label="Findings"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              Findings
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => speakText(lastResponse)}
              aria-label="Speak findings aloud"
            >
              <Volume2 className="size-4" aria-hidden />
              Speak
            </Button>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{lastResponse}</p>
        </section>
      )}
    </div>
  );
}
