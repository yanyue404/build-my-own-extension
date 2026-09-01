/**
 * 把 public/static、public/locales 拷到产物目录。
 * locales 输出为 Chrome 约定的 _locales/。
 */
const fs = require("fs");
const path = require("path");
const { outputDir } = require("../utils/node");

exports.FilesPlugin = class FilesPlugin {
  apply(compiler) {
    compiler.hooks.make.tap("FilesPlugin", compilation => {
      const resources = path.resolve("public/static");
      !compilation.contextDependencies.has(resources) &&
        compilation.contextDependencies.add(resources);
    });

    compiler.hooks.done.tapPromise("FilesPlugin", () => {
      const locales = path.resolve("public/locales");
      const resources = path.resolve("public/static");
      const localesTarget = path.join(outputDir, "_locales");
      const resourcesTarget = path.join(outputDir, "static");

      fs.cpSync(locales, localesTarget, { recursive: true });
      fs.cpSync(resources, resourcesTarget, { recursive: true });
      return Promise.resolve();
    });
  }
};
