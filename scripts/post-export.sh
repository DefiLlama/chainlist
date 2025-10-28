#!/bin/sh
set -e

# Detect OS for sed compatibility (macOS uses BSD sed, Linux uses GNU sed)
if [ "$(uname)" = "Darwin" ]; then
  # macOS (BSD sed)
  sed -i '' '4 i\
"type": "module",' package.json
else
  # Linux (GNU sed)
  sed -i '4 i "type": "module",' package.json
fi

node generate-sitemap.js
node generate-json.js

if [ "$(uname)" = "Darwin" ]; then
  sed -i '' "4 d" package.json
else
  sed -i "4 d" package.json
fi
rm out/404.html
mv out/error.html out/404.html
cp serve.json out/serve.json
