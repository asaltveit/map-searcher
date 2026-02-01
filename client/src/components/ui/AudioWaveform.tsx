"use client";

import { cn } from "@/lib/utils";

export type WaveformState = "idle" | "listening" | "speaking" | "thinking";

interface AudioWaveformProps {
  state: WaveformState;
  className?: string;
  barCount?: number;
}

export function AudioWaveform({
  state,
  className,
  barCount = 5,
}: AudioWaveformProps) {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  const getBarClasses = (index: number) => {
    const baseDelay = index * 0.1;

    switch (state) {
      case "listening":
        return cn(
          "bg-red-500 dark:bg-red-400",
          "animate-[waveform_0.5s_ease-in-out_infinite]"
        );
      case "speaking":
        return cn(
          "bg-emerald-500 dark:bg-emerald-400",
          "animate-[waveform_0.4s_ease-in-out_infinite]"
        );
      case "thinking":
        return cn(
          "bg-amber-500 dark:bg-amber-400",
          "animate-[pulse_1s_ease-in-out_infinite]"
        );
      default:
        return "bg-zinc-300 dark:bg-zinc-600";
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1",
        className
      )}
      role="status"
      aria-label={
        state === "listening"
          ? "Listening for speech"
          : state === "speaking"
            ? "Speaking response"
            : state === "thinking"
              ? "Processing"
              : "Idle"
      }
    >
      {bars.map((i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-150",
            state === "idle" ? "h-2" : "h-4",
            getBarClasses(i)
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            height: state === "idle" ? "8px" : undefined,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes waveform {
          0%, 100% {
            height: 8px;
          }
          50% {
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export function WaveformIndicator({
  state,
  label,
  className,
}: {
  state: WaveformState;
  label?: string;
  className?: string;
}) {
  const defaultLabels: Record<WaveformState, string> = {
    idle: "Ready",
    listening: "Listening...",
    speaking: "Speaking...",
    thinking: "Thinking...",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <AudioWaveform state={state} />
      <span
        className={cn(
          "text-sm font-medium",
          state === "listening" && "text-red-600 dark:text-red-400",
          state === "speaking" && "text-emerald-600 dark:text-emerald-400",
          state === "thinking" && "text-amber-600 dark:text-amber-400",
          state === "idle" && "text-zinc-500 dark:text-zinc-400"
        )}
      >
        {label ?? defaultLabels[state]}
      </span>
    </div>
  );
}
