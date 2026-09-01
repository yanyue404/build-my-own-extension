/**
 * 油猴 / 篡改猴脚本打包配置。
 *
 * 用法（在仓库根目录）：
 *   pnpm run dev:scripts    # watch
 *   pnpm run build:scripts  # 生产
 *
 * 出口：dist/userscripts/*.user.js
 * UserScript 头通过 metablock 写入同一个 .user.js，不再单独生成 meta 目录。
 */
import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";
import metablock from "rollup-plugin-userscript-metablock";
import path from "path";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";

const env = process.env.NODE_ENV;
// 约定从仓库根目录执行 rollup，这样相对路径与 package.json scripts 一致
const root = process.cwd();

console.log("mode: " + env);

const buildConfig = {
  replace: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.CHANNEL": JSON.stringify(process.env.CHANNEL),
    "preventAssignment": true,
  },
  postcss: {
    minimize: true,
    extensions: [".css"],
  },
  esbuild: {
    exclude: [/node_modules/],
    sourceMap: false,
    target: "es2015",
    minify: false,
    charset: "utf8",
    tsconfig: path.resolve(root, "tsconfig.json"),
  },
};

const scriptConfig = [
  {
    name: "Copy",
    metaFile: path.resolve(root, "scripts/copy/meta.json"),
    input: path.resolve(root, "scripts/copy/src/index.ts"),
    output: path.resolve(root, "dist/userscripts/copy.user.js"),
    injectCss: false,
  },
  {
    name: "CopyCurrency",
    metaFile: path.resolve(root, "scripts/copy-currency/meta.json"),
    input: path.resolve(root, "scripts/copy-currency/src/index.ts"),
    output: path.resolve(root, "dist/userscripts/copy-currency.user.js"),
  },
  {
    name: "GithubToc",
    metaFile: path.resolve(root, "scripts/github-toc/meta.json"),
    input: path.resolve(root, "scripts/github-toc/src/index.ts"),
    output: path.resolve(root, "dist/userscripts/github-toc.user.js"),
  },
  {
    name: "SiteModify",
    metaFile: path.resolve(root, "scripts/site-modify/meta.json"),
    input: path.resolve(root, "scripts/site-modify/src/index.ts"),
    output: path.resolve(root, "dist/userscripts/site-modify.user.js"),
    injectCss: false,
  },
];

export default scriptConfig.map(item => ({
  input: item.input,
  output: {
    file: item.output,
    format: "iife",
    name: item.name + "Module",
    // site-modify 里 Vue / Element UI 走 @require，不打进包
    globals: {
      "vue": "Vue",
      "element-ui": "ELEMENT",
    },
  },
  plugins: [
    resolve({
      mainFields: ["jsnext", "preferBuiltins", "browser"],
      extensions: [".vue", ".ts", ".js"],
    }),
    commonjs({
      browser: true,
    }),
    vue(),
    replace({ ...buildConfig.replace }),
    postcss({ ...buildConfig.postcss, inject: item.injectCss }),
    esbuild(buildConfig.esbuild),
    metablock({ file: item.metaFile }),
  ],
  external: ["vue", "element-ui"],
}));
