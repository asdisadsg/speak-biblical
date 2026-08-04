import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const globals = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("uses portable CJK serif fallbacks without missing bundled font files", () => {
  assert.match(globals, /--serif:.*Songti SC.*STSong.*SimSun/);
  assert.doesNotMatch(globals, /url\("\/fonts\/zhouli-serif/);
  assert.match(page, /document\.fonts\.ready/);
});
