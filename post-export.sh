#!/bin/sh

node generate-sitemap.js
rm out/404.html
mv out/error.html out/404.html
