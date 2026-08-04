import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const root = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).trim();
const rawFiles = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
  cwd: root,
});
const trackedFiles = rawFiles.toString("utf8").split("\0").filter(Boolean);

const binaryExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".webp",
  ".woff",
  ".woff2",
  ".zip",
]);

const checks = [
  {
    name: "OpenAI/DeepSeek-style API key",
    pattern: /sk-(?!your-key-here\b)[A-Za-z0-9_-]{20,}/g,
  },
  {
    name: "literal bearer token",
    pattern: /Bearer\s+(?!\$\{apiKey\}\b|YOUR_|your-)[A-Za-z0-9._-]{30,}/g,
  },
  {
    name: "private key block",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g,
  },
  {
    name: "Cloudflare credential assignment",
    pattern:
      /\b(?:CLOUDFLARE_API_TOKEN|CF_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|CF_ACCOUNT_ID)\s*=\s*(?!your-|xxx|<)[^\s#]+/gi,
  },
];

const findings = [];
let scanned = 0;

for (const file of trackedFiles) {
  const ext = path.extname(file).toLowerCase();
  if (binaryExtensions.has(ext)) continue;

  const absolutePath = path.join(root, file);
  const buffer = await fs.readFile(absolutePath);
  if (buffer.includes(0)) continue;

  const text = buffer.toString("utf8");
  scanned += 1;

  for (const check of checks) {
    check.pattern.lastIndex = 0;
    for (const match of text.matchAll(check.pattern)) {
      const line = text.slice(0, match.index).split(/\r?\n/).length;
      findings.push(`${file}:${line} ${check.name}`);
    }
  }
}

if (findings.length > 0) {
  console.error("Public audit failed. Review these potential secrets:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log(
  `Public audit passed: scanned ${scanned} tracked text files, no obvious secrets found.`,
);
