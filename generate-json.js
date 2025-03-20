import {generateChainData} from "./utils/fetch.js"
import {writeFileSync} from "fs"


async function writeRpcsJson(){
    const rpcs = await generateChainData()
    
    const cleanedRpcs = rpcs.map(chain => {
        if (chain.rpc) {
            chain.rpc = chain.rpc.map(rpcEntry => {
                const { trackingDetails, ...rest } = rpcEntry
                return rest
            })
        }
        return chain
    })
    
    writeFileSync("out/rpcs.json", JSON.stringify(cleanedRpcs, null, 2))
}
writeRpcsJson();