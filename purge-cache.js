require("dotenv").config();

const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const CF_PURGE_CACHE_AUTH = process.env.CF_PURGE_CACHE_AUTH;
const CF_ZONE = process.env.CF_ZONE;

async function purgeCacheByUrls(urls) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/purge_cache`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CF_PURGE_CACHE_AUTH}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files: urls }),
  }).then((r) => r.json());

  // console.log(JSON.stringify(res, null, 2));
  return res;
}

function listFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      listFiles(res, files);
    } else {
      files.push(res);
    }
  }

  return files
    .map((file) => file.replace(process.cwd() + "/out", ""))
    .filter((file) => !file.startsWith("/_next"))
    .map((file) => file.replace(" ", "%20"))
    .map((file) => file.replace(".html", ""));
}

async function getAllUrls() {
  const paths = listFiles("out").map((file) => `https://chainlist.org${file}`);

  const urls = ["https://chainlist.org/", ...paths];

  return urls;
}

async function main() {
  const urls = await getAllUrls();

  for (let i = 0; i < urls.length; i += 30) {
    const chunk = urls.slice(i, i + 30);
    const res = await purgeCacheByUrls(chunk);
    if (!res.success) {
      console.error("failed to purge cache");
      console.error(JSON.stringify(res, null, 2));
      return;
    }
  }

  console.log("done purging cache");
}

main();
