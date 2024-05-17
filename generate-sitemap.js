const chainIds = require("./constants/chainIds.json");
const fetch = require("node-fetch");
const fs = require("fs");

function generateSiteMap(chains) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://chainlist.org/</loc>
     </url>
     ${chains
       .map(({ chainId }) => {
         return `
       <url>
           <loc>${`https://chainlist.org/chain/${chainId}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${chains
       .map(({ name }) => {
         return `
       <url>
           <loc>${`https://chainlist.org/chain/${name.toLowerCase().split(" ").join("%20")}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${Object.values(chainIds)
       .map((name) => {
         return `
       <url>
           <loc>${`https://chainlist.org/chain/${name}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${Object.values(chainIds)
       .map((name) => {
         return `
       <url>
           <loc>${`https://chainlist.org/best-rpcs/${name}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${Object.values(chainIds)
       .map((name) => {
         return `
       <url>
           <loc>${`https://chainlist.org/top-rpcs/${name}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

async function writeSiteMap() {
  const res = await fetch("https://chainid.network/chains.json");
  const chains = await res.json();

  // We generate the XML sitemap with the chains data
  const sitemap = generateSiteMap(chains);

  // We write the sitemap to the next export out folder
  fs.writeFileSync("out/sitemap.xml", sitemap);
}

writeSiteMap();
