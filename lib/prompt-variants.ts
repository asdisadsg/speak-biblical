import {
  buildPlainPrompt,
  buildUserPrompt,
  PLAIN_SYSTEM_PROMPT,
  SYSTEM_PROMPT,
  type PlainMode,
  type ZhouliDirection,
  type ZhouliLevel,
  type ZhouliMode,
} from "./prompt.ts";
import type { AnalyticsConfig } from "./analytics.ts";

export type PromptVariant = "A" | "B";

const BIBLICAL_VARIANT_B_SYSTEM_PROMPT = `${SYSTEM_PROMPT}

实验变体 B：进一步压低固定套话频率。优先从原句事件或判断直接起笔；若使用“看哪、于是、凡、岂”等标志，同一篇不要反复堆叠。譬喻必须服务原意，不能代替原意。`;

const PLAIN_VARIANT_B_SYSTEM_PROMPT = `${PLAIN_SYSTEM_PROMPT}

实验变体 B：优先用最短的自然表达还原原意；只有原文确有隐含对象或社交关系时才补充潜台词。`;

export function selectExperimentVariant(
  config: AnalyticsConfig,
  bucket: number | undefined,
): PromptVariant {
  if (!config.abTestEnabled || config.abTestBPercent <= 0) return "A";
  if (config.abTestBPercent >= 100) return "B";
  if (bucket === undefined || !Number.isInteger(bucket) || bucket < 0 || bucket > 99) {
    return "A";
  }
  return bucket < config.abTestBPercent ? "B" : "A";
}

export function selectRandomExperimentVariant(
  config: AnalyticsConfig,
  random: () => number = Math.random,
): PromptVariant {
  if (!config.abTestEnabled) return "A";
  const bucket = Math.min(99, Math.max(0, Math.floor(random() * 100)));
  return selectExperimentVariant(config, bucket);
}

export function getPromptSet(
  direction: ZhouliDirection,
  requestedVariant: PromptVariant,
  config: AnalyticsConfig,
  input?: { text?: string; mode?: ZhouliMode; level?: ZhouliLevel; plainMode?: PlainMode },
) {
  const variant = config.abTestEnabled ? requestedVariant : "A";
  const isPlain = direction === "to_plain";
  const sourceText = input?.text ?? "";
  const userPrompt = isPlain
    ? sourceText && input?.level && input.plainMode
      ? buildPlainPrompt(sourceText, input.level, input.plainMode)
      : ""
    : sourceText && input?.level && input.mode
      ? buildUserPrompt(sourceText, input.mode, input.level)
      : "";

  return {
    variant,
    promptVersion: variant === "B" ? config.promptVersionB : config.promptVersionA,
    systemPrompt:
      variant === "B"
        ? isPlain
          ? PLAIN_VARIANT_B_SYSTEM_PROMPT
          : BIBLICAL_VARIANT_B_SYSTEM_PROMPT
        : isPlain
          ? PLAIN_SYSTEM_PROMPT
          : SYSTEM_PROMPT,
    userPrompt,
  };
}
