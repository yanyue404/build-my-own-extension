# Build-My-Own-Extension

油猴脚本与浏览器扩展实践仓库，包含“解除复制限制”“富文本转 Markdown”等工具。

## 项目内容

### 油猴脚本（Userscript）

- `packages/copy`：[文本选中复制](./packages/copy/README.md)，用于解除常见网站复制限制
- `packages/site-modify`：站点行为/样式修改脚本
- `packages/copy-currency`：copy 通用版脚本

### 浏览器扩展（Extension）

- `packages/force-copy`：Force Copy 扩展（Chrome / Firefox）
- `packages/clipboard2markdown`：Clipboard to Markdown 扩展（将富文本或 HTML 粘贴后，立即转换为 Markdown）

## 快速开始

```bash
pnpm install
```

## 开发与构建

### 油猴脚本

```bash
pnpm run dev
pnpm run build
```

- 输出目录：`.output`
- 通过 Rollup 打包的脚本：`copy`、`site-modify`、`copy-currency`

### 浏览器扩展

Force Copy：

```bash
# Chromium
pnpm run build:force-copy

# Gecko (Firefox)
pnpm run build:force-copy:gecko
```

Clipboard to Markdown：

- 目录：`packages/clipboard2markdown`
- 当前为静态扩展目录（已包含 `manifest.json`）
- 开发调试时可直接在浏览器扩展管理页“加载已解压的扩展程序”

## 目录结构（简）

```text
.
├─ packages/
│  ├─ copy
│  ├─ copy-currency
│  ├─ site-modify
│  ├─ force-copy
│  └─ clipboard2markdown
├─ rollup.config.js
└─ README.md
```

## 致谢

- [Tampermonkey Documentation](https://www.tampermonkey.net/documentation.php)
- [WindrunnerMax/TKScript](https://github.com/WindrunnerMax/TKScript)
- [xcanwin/Unlimit-Web](https://github.com/xcanwin/Unlimit-Web/)
