# clipboard2markdown（浏览器扩展版）

将富文本或 HTML 粘贴后，立即转换为 Markdown。  
本目录基于原项目 `clipboard2markdown` 源码改造为可直接加载的浏览器扩展。

## 来源

- 上游仓库：<https://github.com/euangoddard/clipboard2markdown>
- 在线演示：<http://euangoddard.github.io/clipboard2markdown/>

## 功能

- 本地转换：在浏览器内完成转换，不依赖后端服务
- 支持多次粘贴：每次粘贴都会继续写入输出区域
- 保留原有规则：继续使用 `to-markdown` + pandoc 风格转换器

## 目录说明

- `manifest.json`：扩展清单（Manifest V3）
- `index.html`：扩展弹窗/页面入口
- `clipboard2markdown.js`：粘贴监听与转换逻辑
- `to-markdown.js`：Markdown 转换库

## 如何安装（开发者模式）

先构建：

```bash
pnpm --filter clipboard2markdown-extension run build
```

以 Chrome / Edge 为例：

1. 打开扩展管理页（`chrome://extensions` 或 `edge://extensions`）
2. 开启右上角“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择构建产物目录：`dist/extensions/clipboard2markdown`
5. 点击工具栏扩展图标，打开 `Clipboard to Markdown`

## 使用方式

1. 在任意页面复制富文本内容（`Ctrl+C` / `Cmd+C`）
2. 打开扩展弹窗并粘贴（`Ctrl+V` / `Cmd+V`）
3. 在输出框获得 Markdown 结果
4. 全选并复制结果（`Ctrl+A` + `Ctrl+C`）

## 许可

本目录遵循 MIT License，详见 `LICENSE`。  
原项目作者与版权信息保留在许可证中。
