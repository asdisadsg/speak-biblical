import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("README begins with upstream fork and ChatGPT collaboration declarations", () => {
  const readme = read("README.md");
  assert.match(readme.split(/\r?\n/, 1)[0], /fork 自 \[Aspirin0000\/zhouli-translator\]/);
  assert.match(readme.split(/\r?\n/, 1)[0], /由 ChatGPT 协助修改与编写/);
  assert.match(readme, /DeepSeek Chat Completions/);
});

test("website presents biblical rewrite and plain-language directions", () => {
  const page = read("app/page.tsx");
  assert.match(page, /title: "仿写"/);
  assert.match(page, /title: "释白"/);
  assert.match(page, /title: "叙事体"/);
  assert.match(page, /title: "诗篇体"/);
  assert.match(page, /title: "箴言体"/);
  assert.match(page, /title: "书信体"/);
});

test("metadata and package describe speak-biblical", () => {
  assert.match(read("app/layout.tsx"), /仿和合本体/);
  assert.equal(JSON.parse(read("package.json")).name, "speak-biblical");
});

test("published Skill matches its source and documents reverse translation", () => {
  const source = read("skill-package/speak-biblical/SKILL.md");
  assert.match(source, /释白/);
  assert.match(source, /翻回/);
  assert.match(source, /Aspirin0000/);
  assert.equal(read("public/downloads/speak-biblical-SKILL.md"), source);
});
