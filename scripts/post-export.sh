#!/bin/sh
set -e

node generate-sitemap.js
node generate-json.js

rm out/404.html
mv out/error.html out/404.html
cp serve.json out/serve.json
