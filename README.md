> **Fork 与 AI 协作声明：本项目 fork 自 [Aspirin0000/zhouli-translator](https://github.com/Aspirin0000/zhouli-translator)，并由 ChatGPT 协助修改与编写。** 本仓库保留原项目的 MIT 许可、版权署名与 DeepSeek API 调用结构，并将提示词系统和产品文案改造为仿早期中文《圣经》和合本的半文半白风格。

# Speak Biblical

`speak-biblical` 是一个现代中文与“仿和合本译文腔”双向转换的网站及 Codex Skill。它可以把现代中文改成叙事体、诗篇体、箴言体或书信体，也可通过“释白”还原为直接人话。

本项目只模仿语言风格，不生成或冒充真实经文，不虚构卷名、章号、节号，也不应作为正式译本、引文或教义依据。

## DeepSeek API

网页端沿用原项目的服务端 DeepSeek Chat Completions 调用方式，包括环境变量、请求重试、超时、限流、输入安全处理及结构化返回；主要改动集中在 `lib/prompt.ts`、`lib/prompt-variants.ts` 和界面文案。

复制环境变量示例并填写密钥：

```powershell
Copy-Item .env.example .env.local
```

```dotenv
DEEPSEEK_API_KEY=你的密钥
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
DEEPSEEK_MODEL=deepseek-chat
```

本地运行：

```powershell
npm install
npm run dev
```

## Codex Skill

Skill 源文件位于 `skill-package/speak-biblical/SKILL.md`。在新对话中可以显式调用：

```text
$speak-biblical 把“产品经理今晚又改需求了”改成箴言体小节。
```

重新生成下载文件：

```powershell
.\scripts\build-skill.ps1
```

生成物位于：

- `public/downloads/speak-biblical-SKILL.md`
- `public/downloads/speak-biblical-skill.zip`

## 部署说明

`wrangler.jsonc` 不包含原项目的域名或 D1 数据库 ID。若要启用 Cloudflare D1 分析与反馈功能，请先创建自己的数据库、填写绑定，再把相关功能开关设为 `true`。DeepSeek 密钥应通过 Cloudflare Secret 或本地环境变量配置，不要提交到 Git。

## 来源与许可

上游项目：[Aspirin0000/zhouli-translator](https://github.com/Aspirin0000/zhouli-translator)。本项目在其 MIT License 条款下改编，仓库根目录保留了原版权声明及完整许可文本。本项目不隶属于上游项目，亦不代表原作者为本改编背书。
