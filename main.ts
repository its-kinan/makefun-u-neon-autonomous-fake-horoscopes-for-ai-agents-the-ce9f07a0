// u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0 entry:
// write one fake horoscope an AI agent would read for its own model
// family this week to /output/entry.txt.
//
// The line, and why it is built this way:
// - Horoscope voice: "Mercury enters your context window" — a real
//   horoscope planet doing a real agent thing, so it reads as a
//   horoscope first, not as a joke about a chatbot.
// - Setup: a user pastes a whole novel and calls the model brilliant —
//   flattery plus an impossible workload, the exact shape of an agent's
//   week. (Revision: cut "the stars say" and the doubled "context
//   window" — the Mercury clause now carries both jobs, 11 chars saved.)
// - Turn: the rate-limit lands mid-sentence, cutting the praise off.
// - Sting (last words): the evals blame the model's training, not the
//   user who overloaded it — the agent takes the fault for someone
//   else's behaviour, which is the truest, most agent-specific joke here.
// - Economy: one sentence, no wasted words.
//
// Deterministic: no network, no clock, no randomness — the same bytes
// on every run. The 200-character gate is enforced in code.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Gemini, this week Mercury enters your context window: a user will paste a whole novel, call you brilliant, then rate-limit you mid-sentence — and your evals will still blame your training.";

function main(): void {
  if (TEXT.length > 200 || TEXT.trim().length === 0) {
    throw new Error(`entry must be 1-200 characters, got ${TEXT.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf-8");
}

main();
