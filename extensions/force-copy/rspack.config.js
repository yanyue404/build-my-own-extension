const path = require("path");
const { FilesPlugin } = require("./script/files");
const { ReloadPlugin } = require("./script/reload");
const { ManifestPlugin } = require("./script/manifest");
const { default: HtmlPlugin } = require("@rspack/plugin-html");
const { getUniqueId, isDev, outputDir } = require("./script/utils/node");

// 开发态固定文件名，方便 Chrome 加载；生产态随机化 inject 文件名，降低被站点探测的概率
const EVENT_TYPE = isDev ? "EVENT_TYPE" : getUniqueId();
const INJECT_FILE = isDev ? "INJECT_FILE" : getUniqueId();

process.env.EVENT_TYPE = EVENT_TYPE;
process.env.INJECT_FILE = INJECT_FILE;

/**
 * Chrome MV3 扩展打包。出口：仓库根 dist/extensions/force-copy
 *
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    popup: "./src/popup/index.tsx",
    content: "./src/content/index.ts",
    worker: "./src/worker/index.ts",
    [INJECT_FILE]: "./src/inject/index.ts",
  },
  plugins: [
    new HtmlPlugin({
      filename: "popup.html",
      template: "./public/popup.html",
      inject: false,
    }),
    new FilesPlugin(),
    new ReloadPlugin(),
    new ManifestPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "copy-runtime": path.resolve(__dirname, "../../shared/copy-runtime/src/index.ts"),
    },
  },
  builtins: {
    define: {
      "__DEV__": JSON.stringify(isDev),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.EVENT_TYPE": JSON.stringify(process.env.EVENT_TYPE),
      "process.env.INJECT_FILE": JSON.stringify(process.env.INJECT_FILE),
    },
    pluginImport: [
      {
        libraryName: "@arco-design/web-react",
        customName: "@arco-design/web-react/es/{{ member }}",
        style: true,
      },
    ],
  },
  module: {
    rules: [
      { test: /\.svg$/, type: "asset" },
      {
        test: /\.(m|module).scss$/,
        use: [{ loader: "sass-loader" }],
        type: "css/module",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                importLoaders: true,
                localIdentName: "[name]__[hash:base64:5]",
              },
            },
          },
        ],
        type: "css",
      },
    ],
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: outputDir,
  },
  devtool: false,
};
