# 匿名质量统计

统计、反馈与匿名案例功能沿用上游项目的数据结构，但在本 fork 的 `wrangler.jsonc` 中默认关闭。启用前必须创建并绑定你自己的 Cloudflare D1 数据库；不要复用上游项目的数据库 ID、域名或服务绑定。

建议的提示词实验配置：

```dotenv
ANALYTICS_ENABLED=true
FEEDBACK_UI_ENABLED=true
CASE_SUBMISSION_ENABLED=true
AB_TEST_ENABLED=true
AB_TEST_B_PERCENT=50
PROMPT_VERSION_A=biblical-v1
PROMPT_VERSION_B=biblical-v2
```

Worker 会为每次生成独立随机分配提示词版本。客户端不能指定实验桶。分析时应分别查看仿写、释白和客户端来源，不应混合计算不同方向的反馈率。

默认生成统计不保存输入或输出原文。只有访问者主动同意提交匿名案例时，才会写入 `submitted_cases`；案例应按迁移文件规定设置删除期限。
