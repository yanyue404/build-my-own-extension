# Build-My-Own-Extension

油猴脚本与 Chrome 浏览器扩展实践仓库，包含「解除复制限制」「GitHub 目录导航」等工具。

## 项目结构

```text
.
├─ scripts/                         # 油猴 / 篡改猴脚本
│  ├─ copy                          # 文本选中复制
│  ├─ copy-currency                 # 通用解除复制/右键/键盘限制
│  ├─ site-modify                   # 站点行为与样式修改
│  └─ github-toc                    # GitHub README / Issue / Wiki 目录导航
├─ extensions/                      # Chrome 浏览器扩展
│  ├─ force-copy                    # Force Copy
│  └─ clipboard2markdown            # 剪贴板富文本转 Markdown
├─ shared/
│  └─ copy-runtime                  # 油猴与扩展共用的复制运行时
├─ dist/                            # 生产打包出口（不入库）
│  ├─ userscripts/
│  └─ extensions/
└─ tooling/                         # 构建脚本
```

## 快速开始

```bash
pnpm install
```

## 开发与构建

### 油猴脚本

```bash
pnpm run dev:scripts
pnpm run build:scripts
```

- 出口：`dist/userscripts/`
- 产物：`copy.user.js`、`copy-currency.user.js`、`site-modify.user.js`、`github-toc.user.js`

Tampermonkey 开发时加载 `dist/userscripts/*.user.js`。

### Chrome 扩展

Force Copy：

```bash
pnpm run dev:extension:force-copy
pnpm run build:extension:force-copy
```

- 开发/生产加载目录：`dist/extensions/force-copy`
- 在 `chrome://extensions` 开启开发者模式后，「加载已解压的扩展程序」

Clipboard to Markdown：

```bash
pnpm run build:extension:clipboard2markdown
```

- 加载目录：`dist/extensions/clipboard2markdown`

一次打出全部产物：

```bash
pnpm run build
```

会生成：

- `dist/userscripts/`
- `dist/extensions/force-copy/`
- `dist/extensions/clipboard2markdown/`

## 共享代码

`shared/copy-runtime` 承载油猴与 Force Copy 都用到的能力：

- 事件常量
- 剪贴板 `copy`
- 复制按钮实例
- 类型判断
- 动态插入/移除 CSS

油猴包通过本地 re-export 使用；扩展直接 `import { ... } from "copy-runtime"`。

## 致谢

- [Tampermonkey Documentation](https://www.tampermonkey.net/documentation.php)
- [WindrunnerMax/TKScript](https://github.com/WindrunnerMax/TKScript)
- [xcanwin/Unlimit-Web](https://github.com/xcanwin/Unlimit-Web/)
