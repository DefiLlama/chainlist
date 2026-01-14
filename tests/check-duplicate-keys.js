/**
 * Test to check for duplicate keys in privacyStatement, extraRpcs, and chainIds objects
 * Run with: node tests/check-duplicate-keys.js
 *
 * Note: JavaScript objects silently overwrite duplicate keys, so we must
 * parse the source code directly to detect duplicates.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Check JavaScript syntax validity by attempting to import the ES module
 */
function checkJsSyntax(filePath, fileName) {
  console.log(`Checking ${fileName} for valid JavaScript syntax...`);

  try {
    // Try to import the module - this will catch syntax errors
    execSync(`node --input-type=module -e "import '${filePath}'"`, {
      encoding: "utf-8",
      stdio: "pipe",
    });
    console.log(`✓ ${fileName} has valid JavaScript syntax`);
  } catch (error) {
    const errorOutput = error.stderr || error.stdout || error.message;
    // Extract the relevant error line
    const syntaxMatch = errorOutput.match(/SyntaxError: (.+)/);
    const errorMsg = syntaxMatch ? syntaxMatch[1] : "Invalid syntax";
    console.error(`ERROR: Invalid JavaScript syntax in ${fileName}`);
    console.error(`  ${errorMsg}`);
    throw new Error(`Invalid JavaScript syntax in ${fileName}: ${errorMsg}`);
  }
}

/**
 * Check for duplicate keys in privacyStatement object by parsing the source file
 */
function checkPrivacyStatementDuplicates() {
  console.log("Checking privacyStatement for duplicate keys...");

  const filePath = path.join(__dirname, "../constants/extraRpcs.js");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Find the privacyStatement object in the source
  const privacyStatementMatch = fileContent.match(/const privacyStatement = \{([\s\S]*?)\n\};/);

  if (!privacyStatementMatch) {
    throw new Error("Could not find privacyStatement object in extraRpcs.js");
  }

  const privacyStatementContent = privacyStatementMatch[1];

  // Extract all key names (handles both quoted and unquoted keys)
  const keyPattern = /^\s*(?:"([^"]+)"|'([^']+)'|(\w+)):/gm;
  const keys = new Set();
  const duplicates = [];
  let match;

  while ((match = keyPattern.exec(privacyStatementContent)) !== null) {
    const key = match[1] || match[2] || match[3];
    if (keys.has(key)) {
      duplicates.push(key);
    } else {
      keys.add(key);
    }
  }

  if (duplicates.length > 0) {
    console.error(`ERROR: Duplicate keys found in privacyStatement: ${duplicates.join(", ")}`);
    throw new Error("Duplicate keys found in privacyStatement object!");
  }

  console.log(`✓ No duplicate keys found in privacyStatement (checked ${keys.size} keys)`);
}

/**
 * Check for duplicate chainId keys in extraRpcs by parsing the source file
 */
function checkExtraRpcsDuplicates() {
  console.log("Checking extraRpcs for duplicate chainId keys...");

  const filePath = path.join(__dirname, "../constants/extraRpcs.js");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Find the extraRpcs object in the source
  const extraRpcsStart = fileContent.indexOf("export const extraRpcs = {");
  if (extraRpcsStart === -1) {
    throw new Error("Could not find extraRpcs object in extraRpcs.js");
  }

  // Extract top-level keys (chainIds) - they appear at the start of a line followed by colon and brace
  // Pattern matches lines like "  1: {" or "  80001: {"
  const keyPattern = /^\s{2}(\d+):\s*\{/gm;
  const chainIds = new Set();
  const duplicates = [];
  let match;

  while ((match = keyPattern.exec(fileContent)) !== null) {
    const chainId = match[1];
    if (chainIds.has(chainId)) {
      duplicates.push(chainId);
    } else {
      chainIds.add(chainId);
    }
  }

  if (duplicates.length > 0) {
    console.error(`ERROR: Duplicate chainId keys found in extraRpcs: ${duplicates.join(", ")}`);
    throw new Error("Duplicate chainId keys found in extraRpcs!");
  }

  console.log(`✓ No duplicate chainId keys found in extraRpcs (checked ${chainIds.size} keys)`);
}

/**
 * Check for duplicate keys in chainIds by parsing the source file
 */
function checkChainIdsDuplicates() {
  console.log("Checking chainIds for duplicate keys...");

  const filePath = path.join(__dirname, "../constants/chainIds.js");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Extract all quoted keys like "1": or "42161":
  const keyPattern = /^\s*"(\d+)":/gm;
  const chainIds = new Set();
  const duplicates = [];
  let match;

  while ((match = keyPattern.exec(fileContent)) !== null) {
    const chainId = match[1];
    if (chainIds.has(chainId)) {
      duplicates.push(chainId);
    } else {
      chainIds.add(chainId);
    }
  }

  if (duplicates.length > 0) {
    console.error(`ERROR: Duplicate keys found in chainIds: ${duplicates.join(", ")}`);
    throw new Error("Duplicate keys found in chainIds!");
  }

  console.log(`✓ No duplicate keys found in chainIds (checked ${chainIds.size} keys)`);
}

// Run all tests and collect errors
console.log("=".repeat(60));
console.log("Running syntax and duplicate key checks...");
console.log("=".repeat(60));

const errors = [];

// First check syntax validity
try {
  checkJsSyntax(path.join(__dirname, "../constants/extraRpcs.js"), "extraRpcs.js");
} catch (error) {
  errors.push(error.message);
}

try {
  checkJsSyntax(path.join(__dirname, "../constants/chainIds.js"), "chainIds.js");
} catch (error) {
  errors.push(error.message);
}

// Then check for duplicates
try {
  checkPrivacyStatementDuplicates();
} catch (error) {
  errors.push(error.message);
}

try {
  checkExtraRpcsDuplicates();
} catch (error) {
  errors.push(error.message);
}

try {
  checkChainIdsDuplicates();
} catch (error) {
  errors.push(error.message);
}

console.log("=".repeat(60));

if (errors.length > 0) {
  console.error(`✗ ${errors.length} test(s) failed:`);
  errors.forEach((err) => console.error(`  - ${err}`));
  console.error("=".repeat(60));
  process.exit(1);
} else {
  console.log("✓ All duplicate key checks passed!");
  console.log("=".repeat(60));
  process.exit(0);
}
