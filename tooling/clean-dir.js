/**
 * 删除仓库根目录下的指定目录，供各包生产构建前清理出口。
 *
 * 用法：
 *   node tooling/clean-dir.js dist/extensions/force-copy
 *
 * 参数是相对仓库根的路径，不依赖当前工作目录，Windows / Unix 均可。
 */
const fs = require("fs");
const path = require("path");

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node clean-dir.js <dir-relative-to-repo-root>");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const target = path.resolve(root, dir);
fs.rmSync(target, { recursive: true, force: true });
console.log(`cleaned ${path.relative(root, target)}`);
