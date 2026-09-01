/**
 * 读取 src/manifest/index.ts，写入产物 manifest.json，并填入 package.json 版本号。
 */
const path = require("path");
const tsNode = require("ts-node");
const fs = require("fs");
const { promisify, outputDir } = require("../utils/node");

const writeFile = promisify(fs.writeFile);

exports.ManifestPlugin = class ManifestPlugin {
  constructor() {
    tsNode.register();
    this.manifest = path.resolve(`src/manifest/index.ts`);
  }

  apply(compiler) {
    compiler.hooks.make.tap("ManifestPlugin", compilation => {
      const manifest = this.manifest;
      !compilation.fileDependencies.has(manifest) && compilation.fileDependencies.add(manifest);
    });

    compiler.hooks.done.tapPromise("ManifestPlugin", () => {
      delete require.cache[require.resolve(this.manifest)];
      const manifest = require(this.manifest);
      const version = require(path.resolve("package.json")).version;
      manifest.version = version;
      fs.mkdirSync(outputDir, { recursive: true });
      return writeFile(path.join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2));
    });
  }
};
