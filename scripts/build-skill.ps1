$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$skillSource = Join-Path $repoRoot "skill-package\speak-biblical"
$downloadDir = Join-Path $repoRoot "public\downloads"
$skillCopy = Join-Path $downloadDir "speak-biblical-SKILL.md"
$zipPath = Join-Path $downloadDir "speak-biblical-skill.zip"

if (-not (Test-Path -LiteralPath (Join-Path $skillSource "SKILL.md"))) {
    throw "Skill source not found: $skillSource"
}

New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null
Copy-Item -LiteralPath (Join-Path $skillSource "SKILL.md") -Destination $skillCopy -Force

if (Test-Path -LiteralPath $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -LiteralPath $skillSource -DestinationPath $zipPath -CompressionLevel Optimal

Write-Host "Built $skillCopy"
Write-Host "Built $zipPath"
