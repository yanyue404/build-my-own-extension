# GitHub TOC 导航

油猴脚本：在 GitHub 的 README、Issue、Wiki、Discussion 右侧生成可嵌套的标题目录。

逻辑移植自 [GayHub](https://github.com/jawil/GayHub) 的 **TOC 导航**，不包含文件目录树、暗色主题、图片预览等其它功能。

## 功能

- 解析 `h1`–`h6` 任意层级嵌套
- 滚动时高亮当前标题，点击跳转
- 面板可拖拽、可折叠（窄屏默认收起，宽屏默认展开）
- 跟随 GitHub Turbo / Pjax 切页自动重建

## 安装

```bash
pnpm run build:scripts
```

在 Tampermonkey 中安装 `dist/userscripts/github-toc.user.js`，或开发时：

```bash
pnpm run dev:scripts
```

匹配范围：`https://github.com/*`

## 说明

GayHub 原实现依赖 `imagesloaded`、`draggabilly`、`wolfy-eventemitter`，并会改写 `Node.prototype`。本脚本改为原生拖拽 + `MutationObserver` / `turbo:load`，不引入这些依赖。
