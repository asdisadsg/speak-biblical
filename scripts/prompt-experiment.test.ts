import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_ANALYTICS_CONFIG } from "../lib/analytics.ts";
import { getPromptSet, selectExperimentVariant, selectRandomExperimentVariant } from "../lib/prompt-variants.ts";

test("experiment assignment follows the configured percentage", () => {
  const config = { ...DEFAULT_ANALYTICS_CONFIG, abTestEnabled: true, abTestBPercent: 50 };
  assert.equal(selectExperimentVariant(config, 49), "B");
  assert.equal(selectExperimentVariant(config, 50), "A");
  assert.equal(selectRandomExperimentVariant(config, () => 0.1), "B");
});

test("disabled experiments use biblical variant A", () => {
  const prompts = getPromptSet("to_zhouli", "B", DEFAULT_ANALYTICS_CONFIG, {
    text: "今年你会更新漫画吗",
    mode: "gentle",
    level: "light",
  });
  assert.equal(prompts.variant, "A");
  assert.equal(prompts.promptVersion, "biblical-v1");
  assert.match(prompts.systemPrompt, /《圣经》和合本启发/);
});

test("variant B remains biblical and only adds style calibration", () => {
  const config = { ...DEFAULT_ANALYTICS_CONFIG, abTestEnabled: true };
  const prompts = getPromptSet("to_zhouli", "B", config, {
    text: "今年你会更新漫画吗",
    mode: "gentle",
    level: "light",
  });
  assert.equal(prompts.promptVersion, "biblical-v2");
  assert.match(prompts.systemPrompt, /压低固定套话频率/);
  assert.match(prompts.userPrompt, /今年你会更新漫画吗/);
});
