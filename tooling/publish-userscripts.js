/**
 * 油猴生产构建收尾：把仓库 README 复制到 dist/userscripts，方便 gh-pages 发布。
 * 由 `pnpm run build:scripts` 在 rollup 之后调用。
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const destDir = path.join(root, "dist/userscripts");

fs.mkdirSync(destDir, { recursive: true });
// fs.copyFileSync(path.join(root, "README.md"), path.join(destDir, "README.md"));
console.log("published userscript extras -> dist/userscripts");
