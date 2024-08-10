import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";

// https://github.com/FlandreDaisuki/rollup-plugin-userscript-metablock

import metablock from "rollup-plugin-userscript-metablock";
import path from "path";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";

const env = process.env.NODE_ENV;

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
    tsconfig: path.resolve(__dirname, "tsconfig.json"),
  },
};

// https://www.tampermonkey.net/documentation.php
const scriptConfig = [
  {
    name: "Copy",
    meta: {
      input: "./meta/blank.ts",
      metaFile: "./packages/copy/meta.json",
      output: "./dist/meta/copy.meta.js",
    },
    script: {
      input: "./packages/copy/src/index.ts",
      output: "./.output/copy.user.js",
      injectCss: false,
    },
  },
  {
    name: "CopyCurrency",
    meta: {
      input: "./meta/blank.ts",
      metaFile: "./packages/copy-currency/meta.json",
      output: "./dist/meta/copy-currency.meta.js",
    },
    script: {
      input: "./packages/copy-currency/src/index.ts",
      output: "./.output/copy-currency.user.js",
    },
  },
  {
    name: "SiteModify",
    meta: {
      input: "./meta/blank.ts",
      metaFile: "./packages/site-modify/meta.json",
      output: "./dist/meta/site-modify.meta.js",
    },
    script: {
      input: "./packages/site-modify/src/index.ts",
      output: "./.output/site-modify.user.js",
      injectCss: false,
    },
  },
];

export default [
  ...scriptConfig.map(item => ({
    input: item.meta.input,
    output: {
      file: item.meta.output,
      format: "es",
      name: item.name + "Meta",
    },
    plugins: [metablock({ file: item.meta.metaFile })],
  })),
  ...scriptConfig.map(item => ({
    input: item.script.input,
    output: {
      file: item.script.output,
      format: "iife",
      name: item.name + "Module",
      globals: {
        "vue": "Vue",
        "element-ui": "ELEMENT",
      },
    },
    plugins: [
      // 处理外部依赖模块
      resolve({
        mainFields: ["jsnext", "preferBuiltins", "browser"],
        extensions: [".vue"],
      }),
      // commonJS转换为ES2015
      commonjs({
        browser: true,
      }),
      // 支持vue组件
      vue(),

      replace({ ...buildConfig.replace }),
      postcss({ ...buildConfig.postcss, inject: item.script.injectCss }),
      esbuild(buildConfig.esbuild),
      // terser({ format: { comments: true } }),
      metablock({ file: item.meta.metaFile }),
    ],
    external: ["vue", "element-ui"],
  })),
];
