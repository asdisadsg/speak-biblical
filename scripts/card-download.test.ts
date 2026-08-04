import assert from "node:assert/strict";
import test from "node:test";
import { buildCardDownloadFilename } from "../lib/cardDownload.ts";

test("builds distinct biblical card filenames", () => {
  const date = new Date("2026-07-02T16:50:12.000Z");
  const first = buildCardDownloadFilename("仿写-成章", date, "第一篇结果");
  const second = buildCardDownloadFilename("仿写-成章", date, "第二篇结果");
  assert.match(first, /^仿和合本体-仿写-成章-20260703-005012-[a-z0-9]{6}\.png$/);
  assert.notEqual(first, second);
});

test("sanitizes unsafe filename characters", () => {
  const value = buildCardDownloadFilename("长章/非法:*?", new Date("2026-07-02T16:50:12Z"), "结果");
  assert.equal(/[\\/:*?"<>|]/.test(value), false);
});
