export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-page-inner">
        <a className="privacy-back" href="/">← 返回仿和合本体</a>
        <p className="eyebrow">隐私说明 · 2026-08-04</p>
        <h1>隐私与匿名统计说明</h1>
        <p className="privacy-lead">
          本项目默认关闭匿名统计、反馈和案例提交功能。维护者启用这些功能时，应先配置自己的 Cloudflare D1 数据库并向访问者说明。
        </p>

        <section>
          <h2>DeepSeek 请求</h2>
          <p>
            当你使用真实 API 模式时，输入内容会由本项目服务端发送给 DeepSeek 以生成结果。请勿输入密码、身份信息、私人通信或其他敏感内容。
          </p>
        </section>

        <section>
          <h2>可选匿名统计</h2>
          <p>
            若部署者主动启用统计，系统可记录随机结果编号、方向、客户端版本、提示词版本、模型名、成功状态、响应时间、字数和 token 用量；默认不保存输入原文、生成原文、IP 地址、Cookie、设备指纹或精确位置。
          </p>
        </section>

        <section>
          <h2>可选匿名案例</h2>
          <p>
            只有部署者启用案例功能、且访问者明确同意提交时，系统才可保存该次输入、输出和反馈原因。请勿在案例中包含个人隐私。
          </p>
        </section>

        <section>
          <h2>联系维护者</h2>
          <p>
            问题与删除请求请提交至{" "}
            <a href="https://github.com/asdisadsg/speak-biblical/issues" target="_blank" rel="noreferrer">
              GitHub Issues
            </a>
            ，只需提供结果编号，不要再次粘贴敏感内容。
          </p>
        </section>
      </div>
    </main>
  );
}
