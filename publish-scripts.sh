#!/bin/bash
set -ex

npx rollup -c

# copy files
cp ./README.md ./.output/README.md
