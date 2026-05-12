<h1 align="center">wangyun.fan</h1>

<p align="center">
  <em>王云帆 · Langya · 琅邪王</em>
</p>

<p align="center">
  个人主页 — 一份静态的、缓慢修订的自我陈述。
</p>

<p align="center">
  <a href="https://wangyun.fan">wangyun.fan</a>
</p>

<br />

## 关于

单文件静态站点，无构建工具、无框架。部署在 Cloudflare Workers 之上，由 Wrangler 直接托管 `dist/` 目录。

- **结构** — `index.html` 一份文件，承载全部内容与样式
- **构建** — `scripts/build.mjs` 将必要文件复制到 `dist/`
- **部署** — `wrangler deploy` 上传至 Cloudflare

## 开发

```bash
# 本地预览
pnpm dev          # http://localhost:8787

# 构建产物
pnpm build        # → dist/

# 部署至 Cloudflare
pnpm deploy
```

## 结构

```
.
├── index.html         # 站点本体
├── scripts/
│   └── build.mjs      # 静态资源构建
├── wrangler.jsonc     # Cloudflare 配置
└── dist/              # 构建产物
```

## 联系

<p>
  <a href="mailto:wangdaoo@yeah.net"><img src="https://img.shields.io/badge/Email-wangdaoo%40yeah.net-1f2620?style=flat-square"></a>
  <img src="https://img.shields.io/badge/WeChat-WANG__YUN__FAN-5a8a6a?style=flat-square">
</p>

<sub>Signal &gt; noise.</sub>
