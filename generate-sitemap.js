const fs = require("fs");

async function generateSiteMap(chains, chainIds) {
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
           <loc>${`https://chainlist.org/add-network/${name}`}</loc>
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
  // Use dynamic import to load ES6 modules
  const chainIdsModule = await import("./constants/chainIds.js");
  const chainIds = chainIdsModule.default;
  const fetchModule = await import("./utils/fetch.js");
  const { generateChainData } = fetchModule;

  const chains = await generateChainData();

  // We generate the XML sitemap with the chains data
  const sitemap = await generateSiteMap(chains, chainIds);

  // We write the sitemap to the next export out folder
  fs.writeFileSync("out/sitemap.xml", sitemap);
}

writeSiteMap();
