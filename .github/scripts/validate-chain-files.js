import path from 'path';
import { fetchWithCache } from '../../utils/fetch.js';
import fs from 'fs';

const isExtracRpcsFileChanged = (process.env.EXTRA_RPC_CHANGED || '').trim().length > 0;
const addedOrModified = process.env.FILES_CHANGED.split(' ');

// Function to write to step summary
function writeToStepSummary(content) {
  if (process.env.GITHUB_STEP_SUMMARY) {
    try {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, content + '\n');
    } catch (error) {
      console.error('Failed to write to step summary:', error.message);
    }
  }
}

// Function to write errors to a file that persists between steps
function writeErrorsToFile(errors) {
  try {
    const errorContent = errors.join('\n');
    fs.writeFileSync('/tmp/validation-errors.txt', errorContent);
    console.log('Errors written to /tmp/validation-errors.txt');
  } catch (error) {
    console.error('Failed to write errors to file:', error.message);
  }
}

// Main async function to run validation
async function runValidation() {
  // Collect all errors
  const errors = [];

  if (isExtracRpcsFileChanged) {
    try {
      await validateExtracRpcs();
    } catch (error) {
      errors.push(error.message);
      writeToStepSummary(`❌ ${error.message}`);
    }
  }

  // Process chain files sequentially to avoid overwhelming the system
  for (const filePath of addedOrModified) {
    if (filePath.trim()) {
      try {
        await validateChainFile(filePath);
      } catch (error) {
        errors.push(error.message);
        writeToStepSummary(`❌ ${error.message}`);
      }
    }
  }

  // If there are errors, throw them all at once
  if (errors.length > 0) {
    const errorSummary = errors.join('\n');
    writeToStepSummary(`\n## Validation Summary\n\n${errors.length} validation error(s) found:\n\n${errorSummary}`);
    writeErrorsToFile(errors);
    throw new Error(`Validation failed with ${errors.length} error(s):\n${errorSummary}`);
  }

  // Write success message to step summary
  writeToStepSummary('✅ All chain files validated successfully!');
}

// Run the validation
runValidation().catch(error => {
  console.error('Validation failed:', error.message);
  process.exit(1);
});

const rpcTrackingSet = new Set(['none', 'limited', 'yes', 'unspecified']);

// Validate chainid-*.js files
async function validateChainFile(filePath) {
  filePath = filePath.trim();
  const filename = path.basename(filePath);
  try {
    if (!filename.startsWith('chainid-') || !filename.endsWith('.js')) {
      throw new Error(`${filePath}  does not match chainid-*.js pattern`);
    }
    const { data } = await import(path.join('..', '..', filePath))
    const { features, faucets, nativeCurrency, explorers, parent, } = data;

    if (typeof data !== 'object' || !data)
      throw new Error('Data should be an object: ')

    numberCheck(data, 'chainId', true);
    numberCheck(data, 'networkId', true);
    stringCheck(data, 'name', true);
    stringCheck(data, 'shortName', true);
    stringCheck(data, 'chain', true);
    stringCheck(data, 'icon');
    stringCheck(data, 'infoURL')
    stringCheck(data, 'title')

    stringCheck(nativeCurrency, 'name', true);
    stringCheck(nativeCurrency, 'symbol', true);
    numberCheck(nativeCurrency, 'decimals', true);

    if (typeof explorers === 'object') {
      if (!Array.isArray(explorers)) {
        throw new Error('Explorers should be an array');
      }
      explorers.forEach((explorer) => {
        stringCheck(explorer, 'name', true);
        stringCheck(explorer, 'url', true);
        stringCheck(explorer, 'standard');
      });
    }

    if (typeof features === 'object') {
      if (!Array.isArray(features)) {
        throw new Error('Features should be an array');
      }
      features.forEach((feature) => {
        stringCheck(feature, 'name', true);
      });
    }

    if (Array.isArray(faucets)) {
      faucets.forEach((faucet) => {
        if (typeof faucet !== 'string') {
          throw new Error('Faucets should be an array of strings');
        }
      });
    }

    if (!Array.isArray(data.rpc) || data.rpc.length === 0) {
      throw new Error('RPCs should be a non-empty array');
    }

    data.rpc.map(validateRPC)

    const { chainIdConfigMap, } = await getChainlistConfig();

    if (chainIdConfigMap[data.chainId]) {
      console.warn(`Chain ID ${data.chainId} already exists in chainlist.org/rpcs.json`);
      if (chainIdConfigMap[data.chainId].shortName !== data.shortName)
        throw new Error(`Chain ID ${data.chainId} already exists with a different shortName: ${chainIdConfigMap[data.chainId].shortName}`);

      if (chainIdConfigMap[data.chainId].name !== data.name)
        throw new Error(`Chain ID ${data.chainId} already exists with a different name: ${chainIdConfigMap[data.chainId].name}`);
    }

    if (parent) {
      stringCheck(parent, 'type', true);
      stringCheck(parent, 'chain', true);
      if (Array.isArray(parent.bridges)) {
        parent.bridges.forEach((bridge) => {
          stringCheck(bridge, 'url', true);
        });
      }
      if (!parent.chain.startsWith('eip155-')) {
        throw new Error(`Parent chain should start with eip155-: ${parent.chain}`);
      }
      const parentChainId = parent.chain.split('-')[1] 
      if (!chainIdConfigMap[parentChainId]) {
        throw new Error(`Parent chain ${parentChainId} does not exist in chainlist.org/rpcs.json`);
      }
    }

  } catch (e) {
    throw new Error(`Validation failed for ${filename}: ${e.message}`);
  }
}

async function validateExtracRpcs() {
  try {
    const { default: extraRpcs } = await import(path.join('..', '..', 'constants/extraRpcs.js'));
    Object.entries(extraRpcs).forEach(([chainId, config]) => {
      validateRPCConfig(config, chainId);
    })
  } catch (e) {
    throw new Error(`extracRpcs.js import failed: ${e.message}`);
  }
}

function validateRPCConfig(config, configId) {
  if (typeof config !== 'object') throw new Error('RPC config should be an object');
  if (!Array.isArray(config.rpcs)) throw new Error('RPC config rpc should be an array');
  config.rpcs.map(validateRPC)

  if (config.hasOwnProperty('rpcWorking') && typeof config.rpcWorking !== 'boolean') {
    throw new Error('RPC rpcWorking should be a boolean ' + configId);
  }

  if (config.hasOwnProperty('websiteDead') && typeof config.websiteDead !== 'boolean' && typeof config.websiteDead !== 'string') {
    throw new Error('RPC websiteDead should be a boolean ' + configId);
  }

}

function validateRPC(rpc) {
  if (typeof rpc === 'string' && rpc.length) return;
  if (typeof rpc !== 'object') throw new Error('RPC should be an object')
  if (typeof rpc.url !== 'string') throw new Error('RPC url should be a string' + JSON.stringify(rpc));

  if (rpc.hasOwnProperty('tracking')) {
    if (typeof rpc.tracking !== 'string') {
      throw new Error('RPC tracking should be a string ' + rpc.url);
    }
    if (!rpcTrackingSet.has(rpc.tracking)) {
      throw new Error('Unknown rpc tracking status ' + rpc.url);
    }
  }

  if (rpc.hasOwnProperty('trackingDetails') && typeof rpc.trackingDetails !== 'string') {
    throw new Error('RPC trackingDetails should be a string ' + rpc.url);
  }

  if (rpc.hasOwnProperty('name') && typeof rpc.name !== 'string') {
    throw new Error('RPC name should be a string ' + rpc.url);
  }

}

let chainlistConfig

function getChainlistConfig() {
  if (!chainlistConfig) chainlistConfig = _getChainlistConfig()

  return chainlistConfig

  async function _getChainlistConfig() {
    const rpcInfo = await fetchWithCache('https://chainlist.org/rpcs.json')
    console.log('Fetched RPC info from chainlist.org/rpcs.json')
    const chainIdConfigMap = {}
    const shortNameChainIdMap = {}
    const nameChainIdMap = {}
    rpcInfo.forEach((chain) => {
      if (chain.chainId === undefined || chain.name === undefined || chain.shortName === undefined) {
        return
      }
      chainIdConfigMap[chain.chainId] = {
        name: chain.name,
        shortName: chain.shortName,
        rpc: chain.rpc,
        website: chain.website,
        icon: chain.icon,
        tracking: chain.tracking,
        trackingDetails: chain.trackingDetails,
      }
      shortNameChainIdMap[chain.shortName] = chain.chainId
      nameChainIdMap[chain.name] = chain.chainId
    })

    return {
      chainIdConfigMap,
      shortNameChainIdMap,
      nameChainIdMap,
    }
  }
}

function stringCheck(obj, field, isMandatory = false) {
  if (typeof obj !== 'object' || !obj) throw new Error(`Chain ${field} should be an object`);

  if (isMandatory && !obj.hasOwnProperty(field)) {
    throw new Error(`Chain ${field} is mandatory`);
  }
  if (obj.hasOwnProperty(field) && typeof obj[field] !== 'string') {
    throw new Error(`Chain ${field} is not a string`);
  }
}

function numberCheck(obj, field, isMandatory = false) {
  if (typeof obj !== 'object' || !obj) throw new Error(`Chain ${field} should be an object`);

  if (isMandatory && !obj.hasOwnProperty(field)) {
    throw new Error(`Chain ${field} is mandatory`);
  }
  if (obj.hasOwnProperty(field) && typeof obj[field] !== 'number') {
    throw new Error(`Chain ${field} is  not a number`);
  }
}