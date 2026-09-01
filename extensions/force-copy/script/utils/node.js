/**
 * 构建期环境变量与产物目录。
 * 产物始终写到仓库根 dist/extensions/force-copy，不落在本包目录。
 */
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const CHARTS = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
const getUniqueId = (len = 10) => {
  const chars = new Array(len - 1).fill("");
  return (
    CHARTS[Math.floor(Math.random() * 52)] +
    chars.map(() => CHARTS[Math.floor(Math.random() * CHARTS.length)]).join("")
  );
};

const promisify = fn => {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
};

const pkgRoot = path.resolve(__dirname, "../..");
const repoRoot = path.resolve(pkgRoot, "../..");
const outputDir = path.resolve(repoRoot, "dist/extensions/force-copy");

exports.isDev = isDev;
exports.promisify = promisify;
exports.getUniqueId = getUniqueId;
exports.outputDir = outputDir;
