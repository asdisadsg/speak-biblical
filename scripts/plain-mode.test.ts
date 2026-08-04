import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildPlainPrompt, buildUserPrompt, PLAIN_SYSTEM_PROMPT } from "../lib/prompt.ts";

test("plain prompt removes biblical styling without changing meaning", () => {
  const prompt = buildPlainPrompt("我如同灯在风中摇动", "standard", "direct");
  assert.match(prompt, /不继续写仿经体/);
  assert.match(prompt, /保留具体对象、动作、人称、立场和语气/);
  assert.match(PLAIN_SYSTEM_PROMPT, /不把修辞性的灯、道路、种子/);
});

test("rewrite prompt preserves modern entities and blocks fake scripture", () => {
  const prompt = buildUserPrompt("GitHub 今晚又挂了", "gentle", "light");
  assert.match(prompt, /GitHub/);
  assert.match(prompt, /不伪造真实经文、书名、章号、节号或神谕/);
});

test("wording requests remain wording requests", () => {
  const prompt = buildUserPrompt("这句话怎么回才体面", "gentle", "light");
  assert.match(prompt, /表达方式请求/);
  assert.match(prompt, /不要越过请求/);
});

test("client and API expose all reverse modes", () => {
  const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const route = readFileSync(new URL("../app/api/translate/route.ts", import.meta.url), "utf8");
  for (const mode of ["direct", "explain", "subtext", "roast"]) {
    assert.match(page, new RegExp(`id: "${mode}"`));
  }
  assert.match(route, /VALID_PLAIN_MODES/);
});
