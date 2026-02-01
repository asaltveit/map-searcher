"use client";

import { useState, useCallback } from "react";
import { VoiceSection } from "@/components/voice/VoiceSection";
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

const MAP_PROMPT =
  "Update the map using the research in your context. Add layers for any places or routes mentioned.";

export function AgentInput({ className }: { className?: string }) {
  const [agents, setAgents] = useState<AgentIds | null>(null);
  const [askInput, setAskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

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
        } else {
          setLastResponse(getLastAssistantContent(researchResponse) || "No reply from research agent.");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    },
    [ensureAgents]
  );

  const handleAskSubmit = () => {
    submitMessage(askInput);
    setAskInput("");
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <label htmlFor="ask-input" className="text-sm font-medium">
          Ask research & map
        </label>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <Input
            id="ask-input"
            type="text"
            placeholder="e.g. Museums in Portland, or route from A to B"
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskSubmit()}
            disabled={loading}
            className="min-h-[44px] flex-1 touch-manipulation"
            aria-describedby="ask-hint"
          />
          <Button
            type="button"
            onClick={handleAskSubmit}
            disabled={loading || !askInput.trim()}
            className="min-h-[44px] shrink-0 touch-manipulation"
          >
            {loading ? "Sending…" : "Send"}
          </Button>
        </div>
        <p id="ask-hint" className="text-xs text-muted-foreground">
          Or use the mic below to speak your request; it will be sent when you stop listening.
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {lastResponse && (
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm">
          <p className="font-medium text-muted-foreground">Last response</p>
          <p className="mt-1 whitespace-pre-wrap">{lastResponse}</p>
        </div>
      )}

      <VoiceSection
        onTranscript={submitMessage}
        textToSpeak={lastResponse || undefined}
        className="w-full max-w-xl"
      />
    </div>
  );
}
