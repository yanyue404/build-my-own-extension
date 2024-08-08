# Build-My-Own-Extension

油猴脚本 & 浏览器扩展

## Release

如果需要从源码构建脚本与扩展，请使用`pnpm`安装依赖，如果不需要这步操作，可以直接在上方表格点击安装按钮即可安装打包好的脚本与扩展。版本库中`dist`为脚本打包目录，其中仅`copy`、`site-director`、`copy-currency`脚本需`rollup`打包使用，其他脚本直接安装即可。浏览器扩展的打包位置为各自`monorepo package`下的`build`目录，调试开发过程需要主动指定浏览器加载目标位置。

```bash
$ pnpm install
$ pnpm run build
# for Chrome
$ pnpm run build:force-copy
# for Firefox
$ pnpm run build:force-copy:gecko
```

## Thanks

- https://github.com/yanyue404/build-my-own-extension
- https://github.com/xcanwin/Unlimit-Web/
