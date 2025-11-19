#!/usr/bin/env node

import { formatFile } from '../dist/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
README Hierarchy Formatter

Usage:
  readme-format <input.md> [output.md] [options]

Options:
  -h, --help        Show this help
  -v, --version     Show version
  -o, --output      Output file (default: overwrites input)

Examples:
  readme-format README.md                    # Format in-place
  readme-format input.md output.md           # Format to new file
  readme-format README.md -o formatted.md    # Format to new file
`);
}

function showVersion() {
  const pkgPath = path.join(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  console.log(pkg.version);
}

async function main() {
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    showVersion();
    process.exit(0);
  }

  const inputFile = args[0];
  let outputFile = inputFile; // Default: overwrite input

  // Check for -o flag
  const outputIndex = args.indexOf('-o') || args.indexOf('--output');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    outputFile = args[outputIndex + 1];
  } else if (args[1] && !args[1].startsWith('-')) {
    outputFile = args[1];
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File not found: ${inputFile}`);
    process.exit(1);
  }

  try {
    console.log(`Formatting ${inputFile}...`);
    await formatFile(inputFile, outputFile);
    console.log(`✓ Formatted and saved to ${outputFile}`);
  } catch (error) {
    console.error('Error formatting file:', error.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
