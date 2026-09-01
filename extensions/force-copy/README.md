# Force Copy

Chrome 扩展：解除网页复制、键盘、右键限制。默认全部关闭，在弹窗里按站点开启。

- [Chrome Web Store](https://chrome.google.com/webstore/detail/force-copy/cceclgeciefpanebkfkogecbjjchmico)
- [GitHub Releases](https://github.com/yanyue404/build-my-own-extension/releases)

<img src="./public/misc/poster.png" width="500">

⭐ **Start**：按域名记住开关，下次打开同一站点仍生效。  
⭐ **Once**：只对当前 Tab 生效，关掉 Tab 后恢复关闭；刷新页面不会关掉。

---

## 开发

本包只面向 **Chrome MV3**。仓库重构后不再打 Firefox / Gecko。

### 命令

在仓库根目录：

```bash
pnpm install
pnpm run dev:extension:force-copy     # watch，产物同样写到 dist
pnpm run build:extension:force-copy   # 生产
```

Chrome 打开 `chrome://extensions` → 开发者模式 → 加载已解压的扩展程序 → 选择：

```text
dist/extensions/force-copy
```

### 运行时四段

```text
popup  ──PCBridge──►  content  ──CIBridge──►  inject（页面 MAIN world）
                         │
                         └──CWBridge──►  worker（service worker）
```

| 入口           | 文件          | 角色                                                            |
| -------------- | ------------- | --------------------------------------------------------------- |
| 弹窗           | `src/popup`   | React 开关面板，发指令给 content                                |
| Content Script | `src/content` | 隔离世界，转发 popup ↔ inject，同步 badge                       |
| Service Worker | `src/worker`  | 用 `scripting.registerContentScripts` 把 inject 打进 MAIN world |
| Inject         | `src/inject`  | 真正改页面：拦截复制/键盘/右键，站点适配                        |

页面脚本不能直接碰 DOM 限制，必须走 inject。worker 负责注册 inject；content 不再注入脚本。

### 目录

```text
extensions/force-copy/
├─ src/
│  ├─ popup/          弹窗 UI（Arco + React）
│  ├─ content/        Content Script
│  ├─ worker/         Service Worker
│  ├─ inject/         MAIN world 注入脚本
│  │  └─ modules/     站点适配，末项 Basic 为兜底
│  ├─ bridge/         消息通道（见下）
│  ├─ manifest/       MV3 manifest 源文件
│  ├─ utils/          扩展侧工具（chrome API、日志、热更新）
│  └─ types/
├─ public/
│  ├─ popup.html      弹窗模板
│  ├─ static/         会拷到产物 /static（图标）
│  ├─ locales/        会拷到产物 /_locales
│  └─ misc/           仅文档配图，不进产物
├─ script/            rspack 插件（拷贝静态资源 / 写 manifest / 开发热更新）
├─ rspack.config.js
└─ package.json
```

**还在用的 bridge（3 条）：**

- `bridge/popup-content`：弹窗 ↔ content
- `bridge/content-inject`：content ↔ inject
- `bridge/content-worker`：content ↔ worker

公共复制能力（按钮、剪贴板、动态 CSS、事件常量）在仓库 `shared/copy-runtime`，inject 里 `import { ... } from "copy-runtime"`。

### 构建出口

| 步骤              | 作用                                               |
| ----------------- | -------------------------------------------------- |
| `script/files`    | `public/static` → `_locales` / `static`            |
| `script/manifest` | `src/manifest/index.ts` + 版本号 → `manifest.json` |
| `script/reload`   | 仅开发：本地 WebSocket 通知扩展刷新                |
| HtmlPlugin        | `public/popup.html` → `popup.html`                 |

生产 inject 文件名会随机化（`INJECT_FILE`），写进 `web_accessible_resources`。

### 加一个站点适配

1. 在 `src/inject/modules/` 新建模块，实现 `WebSite`（`regexp` / `start` / 可选 `init`）
2. 在 `src/inject/modules/index.ts` 里**插到 `Basic` 前面**（`Basic` 必须垫底）
3. 能复用的复制按钮、`styles.insertCSS` 从 `copy-runtime` 引入，不要再从油猴包深引用

### 重构后已删除（不要再加回来）

这些是 Firefox 双端或历史死代码，清理后包内文件会少一截：

| 路径                                        | 原因                                                 |
| ------------------------------------------- | ---------------------------------------------------- |
| `script/if-def/`                            | `#IFDEF GECKO/CHROMIUM` 条件编译，现只打 Chrome      |
| `script/wrapper/`                           | 给 Gecko 包一层 inject 函数，现为空操作              |
| `src/content/runtime/script.ts`             | Gecko 在 content 里内联注入，Chrome 改由 worker 注册 |
| `src/bridge/popup-worker/`                  | 无任何引用                                           |
| `src/bridge/worker-content/`                | 无任何引用                                           |
| `public/misc/brick.png`、`favicon.dark.png` | 未被代码或文档引用                                   |
| Gecko `manifest` 分支、`browser` 全局类型   | 不再支持 Firefox                                     |

`public/misc/poster.png` 只给 README 用，不会拷进扩展产物。
