"use client";

import { cn } from "@/lib/utils";

export type WaveformState = "idle" | "listening" | "speaking" | "thinking" | "preparing";

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
      case "preparing":
        return cn(
          "bg-cyan-500 dark:bg-cyan-400",
          "animate-[voicePrep_1.2s_ease-in-out_infinite]"
        );
      default:
        return "bg-zinc-300 dark:bg-zinc-600";
    }
  };

  return (
    <div
      className={cn(
        "flex items-end justify-center gap-1 h-6",  // Fixed height container, items-end for bottom alignment
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
              : state === "preparing"
                ? "Preparing voice"
                : "Idle"
      }
    >
      {bars.map((i) => (
        <div
          key={i}
          className={cn(
            "w-1 h-6 rounded-full origin-bottom",  // Fixed height, transform origin at bottom
            getBarClasses(i)
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            transform: state === "idle" ? "scaleY(0.33)" : undefined,  // 8px / 24px
          }}
        />
      ))}

      <style jsx>{`
        @keyframes waveform {
          0%, 100% {
            transform: scaleY(0.33);
          }
          50% {
            transform: scaleY(1);
          }
        }
        @keyframes voicePrep {
          0%, 100% {
            transform: scaleY(0.25);
            opacity: 0.6;
          }
          50% {
            transform: scaleY(0.6);
            opacity: 1;
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
    preparing: "Starting voice...",
  };

  return (
    <div className={cn("flex items-end gap-3", className)}>
      <AudioWaveform state={state} />
      <span
        className={cn(
          "text-sm font-medium",
          state === "listening" && "text-red-600 dark:text-red-400",
          state === "speaking" && "text-emerald-600 dark:text-emerald-400",
          state === "thinking" && "text-amber-600 dark:text-amber-400",
          state === "preparing" && "text-cyan-600 dark:text-cyan-400",
          state === "idle" && "text-zinc-500 dark:text-zinc-400"
        )}
      >
        {label ?? defaultLabels[state]}
      </span>
    </div>
  );
}
