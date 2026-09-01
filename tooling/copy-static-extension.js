/**
 * 把静态 Chrome 扩展（无打包器）复制到 dist/extensions/<name>。
 *
 * 用法：
 *   node tooling/copy-static-extension.js clipboard2markdown
 *
 * 跳过 package.json / node_modules，其余文件原样拷贝，供「加载已解压的扩展程序」。
 */
const fs = require("fs");
const path = require("path");

const name = process.argv[2];
if (!name) {
  console.error("Usage: node copy-static-extension.js <extension-name>");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const src = path.resolve(root, "extensions", name);
const dest = path.resolve(root, "dist/extensions", name);

const skip = new Set(["package.json", "node_modules"]);

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

for (const entry of fs.readdirSync(src)) {
  if (skip.has(entry)) continue;
  fs.cpSync(path.join(src, entry), path.join(dest, entry), { recursive: true });
}

console.log(`copied ${name} -> ${path.relative(root, dest)}`);
