#!/bin/bash
set -ex

npx rollup -c

# copy files
# cp ./packages/expansion/expansion.user.js ./dist/expansion.user.js
cp ./README.md ./dist/README.md
