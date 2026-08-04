# Speak Biblical Skill

`speak-biblical` 将现代中文改写成早期中文《圣经》和合本启发的半文半白译文腔，也可把这种仿写翻回直接人话。

## 使用

把 `skill-package/speak-biblical` 文件夹安装到个人 Skills 目录，或让 Codex 从本仓库读取它。新对话中可显式调用：

```text
$speak-biblical 把“产品经理今晚又改需求了”改成叙事体小节。
```

也可使用“圣经体改写”“和合本腔”“诗篇式”“箴言式”“书信式”“释白”等自然语言触发。

## 导出

在 Windows PowerShell 中运行：

```powershell
.\scripts\build-skill.ps1
```

脚本会更新：

- `public/downloads/speak-biblical-SKILL.md`
- `public/downloads/speak-biblical-skill.zip`

## 来源与许可

本项目在 Skill 的目录组织、任务拆解、篇幅档位、主体保持、安全边界和交付自检等设计上，改编并借鉴了 [Aspirin0000/zhouli-translator](https://github.com/Aspirin0000/zhouli-translator) 及其 `speak-zhouli` Skill。

原项目采用 MIT License，版权声明为 `Copyright (c) 2026 Aspirin0000`。本仓库保留了完整许可文本。本项目不隶属于原项目，原作者也未对本改编作出背书。

本项目不包含完整《圣经》译本。所有生成内容均为文体仿写，不是真实经文，不应用作引文、教义依据或正式译本。
