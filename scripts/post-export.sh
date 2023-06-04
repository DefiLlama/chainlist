#!/bin/sh

node generate-sitemap.js
sed -i '4 i "type": "module",' package.json
node generate-json.js
sed -i "4 d" package.json
rm out/404.html
mv out/error.html out/404.html
cp serve.json out/serve.json

node purge-cache.js
