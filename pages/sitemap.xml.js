import chainIds from "../constants/chainIds";

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

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch('https://chainid.network/chains.json');
  const chains = await request.json();

  // We generate the XML sitemap with the chains data
  const sitemap = generateSiteMap(chains);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
