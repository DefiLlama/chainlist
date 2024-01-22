import {fetchChain, generateChainData} from "./utils/fetch.js"
import {writeFileSync} from "fs"

const RPC_REQUIREMENTS = 3;
const GOOD_LATENCY = 800;

async function writeRpcsJson(){
    const rpcs = await generateChainData()
    // get fastest rpc for each chain
    const chainListWithRpcs = [];
    let progress = 0;
    for(const chain of rpcs){
        progress++;
        console.log(`\n${progress}/${rpcs.length} fetching rpcs for chain ${chain.name}`);
        const rpcList = [];
        let fastRpccount = 0;
        for(const rpc of chain.rpc){
            if (['yes', 'limited'].includes(rpc.tracking)) continue;
            console.log("  fetching rpc", rpc.url);
            const data = await fetchChain(rpc.url);
            if (!data) continue;
            rpcList.push({
                url: rpc.url,
                latency: data.latency
            });
            if (data.latency < GOOD_LATENCY) fastRpccount++;
            if (fastRpccount >= RPC_REQUIREMENTS) break;
        }
        // get fastest there rpcs
        rpcList.sort((a, b) => a.latency - b.latency);
        delete chain.rpc;
        chain['logoURI'] = chain.chainSlug ?
            `https://icons.llamao.fi/icons/chains/rsz_${chain.chainSlug}.jpg`
            : "https://cdn.jsdelivr.net/gh/etwalletxyz/chainlist/public/unknown-logo.png";
        chainListWithRpcs.push({
            ...chain,
            rpc: rpcList.slice(0, RPC_REQUIREMENTS).map(rpc => rpc.url)
        })
    }

    writeFileSync("dist/chainlist.json", JSON.stringify(chainListWithRpcs))
}
writeRpcsJson();