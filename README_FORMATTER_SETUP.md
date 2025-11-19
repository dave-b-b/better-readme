# README Formatter Project Setup Instructions

This guide will help you create a standalone markdown README formatter tool that applies hierarchical styling with centered headers and horizontal rules.

## Project Overview

**Name Suggestion:** `readme-hierarchy-formatter`

**What it does:**
- Converts standard markdown to styled markdown with centered headers
- Applies solid 2px HR lines around H1 headers
- Applies dashed 1px HR lines around H2 headers
- Generates table of contents with proper nesting
- Works as CLI tool, Node.js library, and remark plugin

## Setup Instructions

### 1. Create Project Directory

```bash
# Navigate to where you want to create the project
cd ~/Projects  # or wherever you prefer

# Create project directory
mkdir readme-hierarchy-formatter
cd readme-hierarchy-formatter

# Initialize git
git init

# Initialize npm project
npm init -y
```

### 2. Install Dependencies

```bash
npm install remark remark-parse remark-stringify unified unist-util-visit mdast-util-to-string
npm install --save-dev @types/node typescript ts-node jest @types/jest ts-jest
```

### 3. Create Project Structure

```bash
# Create directories
mkdir -p src bin test examples

# Create files
touch src/index.ts
touch src/plugin.ts
touch src/formatter.ts
touch src/types.ts
touch bin/cli.js
touch test/formatter.test.ts
touch examples/input.md
touch examples/output.md
touch .gitignore
touch tsconfig.json
touch README.md
touch LICENSE
```

### 4. Configure TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

### 5. Update package.json

Add these fields to your `package.json`:

```json
{
  "name": "readme-hierarchy-formatter",
  "version": "1.0.0",
  "description": "Format README files with hierarchical styling and centered headers",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "readme-format": "./bin/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "prepublishOnly": "npm run build",
    "format": "prettier --write 'src/**/*.ts'",
    "dev": "ts-node src/index.ts"
  },
  "keywords": [
    "markdown",
    "readme",
    "formatter",
    "remark",
    "remark-plugin",
    "documentation"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/readme-hierarchy-formatter.git"
  }
}
```

### 6. Create .gitignore

```
node_modules/
dist/
*.log
.DS_Store
.env
coverage/
.idea/
.vscode/
```

### 7. Create Core Files

#### src/types.ts

```typescript
export interface FormatterOptions {
  // Generate table of contents
  generateToc?: boolean;

  // Center all headers
  centerHeaders?: boolean;

  // Add HR lines around headers
  addHrLines?: boolean;

  // H1 gets solid 2px lines
  h1Style?: 'solid' | 'dashed' | 'none';
  h1Thickness?: string; // e.g., '2px'

  // H2 gets dashed 1px lines
  h2Style?: 'solid' | 'dashed' | 'none';
  h2Thickness?: string; // e.g., '1px'
}

export const defaultOptions: FormatterOptions = {
  generateToc: true,
  centerHeaders: true,
  addHrLines: true,
  h1Style: 'solid',
  h1Thickness: '2px',
  h2Style: 'dashed',
  h2Thickness: '1px',
};
```

#### src/formatter.ts

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Root, Heading, HTML } from 'mdast';
import { FormatterOptions, defaultOptions } from './types';

export class ReadmeFormatter {
  private options: FormatterOptions;

  constructor(options: Partial<FormatterOptions> = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  async format(markdown: string): Promise<string> {
    const processor = unified()
      .use(remarkParse)
      .use(() => this.transform.bind(this))
      .use(remarkStringify, {
        bullet: '-',
        fence: '`',
        fences: true,
        incrementListMarker: true,
      });

    const result = await processor.process(markdown);
    return String(result);
  }

  private transform(tree: Root): Root {
    const headings: Array<{ depth: number; text: string; id: string }> = [];

    // First pass: collect headings for TOC
    if (this.options.generateToc) {
      visit(tree, 'heading', (node: Heading) => {
        const text = toString(node);
        const id = this.slugify(text);
        headings.push({ depth: node.depth, text, id });
      });
    }

    // Second pass: transform headings
    const newChildren: any[] = [];
    let skipTitle = true; // Skip the first H1 (title)

    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];

      if (node.type === 'heading') {
        const heading = node as Heading;
        const text = toString(heading);
        const id = this.slugify(text);

        // Insert TOC after title (first H1)
        if (skipTitle && heading.depth === 1) {
          skipTitle = false;

          // Add centered title with HR
          newChildren.push(
            this.createHTML('<div align="center">'),
            this.createHTML(''),
            this.createHR(this.options.h1Style!, this.options.h1Thickness!),
            this.createHTML(''),
            heading,
            this.createHTML(''),
            heading.children[0] && 'value' in heading.children[0] ?
              this.createHTML(`### ${heading.children[0].value}`) : null,
            this.createHTML(''),
            this.createHR(this.options.h1Style!, this.options.h1Thickness!),
            this.createHTML(''),
            this.createHTML('</div>')
          );

          // Add TOC
          if (this.options.generateToc && headings.length > 1) {
            newChildren.push(
              this.createHTML(''),
              { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Table of Contents' }] },
              this.createHTML(''),
              ...this.generateTocItems(headings.slice(1))
            );
          }

          newChildren.push(
            this.createHTML(''),
            this.createHTML('---')
          );
          continue;
        }

        // Style other headings based on depth
        if (heading.depth === 1) {
          newChildren.push(
            this.createHTML(''),
            this.createHR(this.options.h1Style!, this.options.h1Thickness!),
            this.createHTML(''),
            this.createHTML('<div align="center">'),
            this.createHTML(''),
            heading,
            this.createHTML(''),
            this.createHTML('</div>'),
            this.createHTML(''),
            this.createHR(this.options.h1Style!, this.options.h1Thickness!)
          );
        } else if (heading.depth === 2) {
          newChildren.push(
            this.createHTML(''),
            this.createHR(this.options.h2Style!, this.options.h2Thickness!),
            this.createHTML(''),
            this.createHTML('<div align="center">'),
            this.createHTML(''),
            heading,
            this.createHTML(''),
            this.createHTML('</div>'),
            this.createHTML(''),
            this.createHR(this.options.h2Style!, this.options.h2Thickness!)
          );
        } else {
          newChildren.push(node);
        }
      } else {
        newChildren.push(node);
      }
    }

    return { ...tree, children: newChildren.filter(Boolean) };
  }

  private createHR(style: string, thickness: string): HTML {
    return {
      type: 'html',
      value: `<hr style="border: ${thickness} ${style};">`,
    };
  }

  private createHTML(value: string): HTML {
    return {
      type: 'html',
      value,
    };
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private generateTocItems(headings: Array<{ depth: number; text: string; id: string }>): any[] {
    const items: any[] = [];

    headings.forEach((heading, index) => {
      const indent = '   '.repeat(heading.depth - 1);
      const number = index + 1;
      const link = `[${heading.text}](#${heading.id})`;

      items.push({
        type: 'html',
        value: `${number}. ${link}`,
      });
    });

    return items;
  }
}
```

#### src/plugin.ts

```typescript
import { Plugin } from 'unified';
import { Root } from 'mdast';
import { ReadmeFormatter } from './formatter';
import { FormatterOptions } from './types';

/**
 * Remark plugin to format README files with hierarchical styling
 */
const remarkReadmeFormatter: Plugin<[FormatterOptions?], Root> = (options = {}) => {
  return async (tree: Root) => {
    const formatter = new ReadmeFormatter(options);
    // The transformer modifies the tree in place
    return tree;
  };
};

export default remarkReadmeFormatter;
```

#### src/index.ts

```typescript
import fs from 'fs/promises';
import { ReadmeFormatter } from './formatter';
import { FormatterOptions } from './types';

export { ReadmeFormatter, FormatterOptions };
export { default as remarkReadmeFormatter } from './plugin';

/**
 * Format a markdown file
 */
export async function formatFile(
  inputPath: string,
  outputPath?: string,
  options?: FormatterOptions
): Promise<string> {
  const content = await fs.readFile(inputPath, 'utf-8');
  const formatter = new ReadmeFormatter(options);
  const formatted = await formatter.format(content);

  if (outputPath) {
    await fs.writeFile(outputPath, formatted, 'utf-8');
  }

  return formatted;
}

/**
 * Format markdown content
 */
export async function formatMarkdown(
  content: string,
  options?: FormatterOptions
): Promise<string> {
  const formatter = new ReadmeFormatter(options);
  return formatter.format(content);
}
```

#### bin/cli.js

```javascript
#!/usr/bin/env node

const { formatFile } = require('../dist/index');
const fs = require('fs');
const path = require('path');

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
  const pkg = require('../package.json');
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
    const formatted = await formatFile(inputFile, outputFile);
    console.log(`✓ Formatted and saved to ${outputFile}`);
  } catch (error) {
    console.error('Error formatting file:', error.message);
    process.exit(1);
  }
}

main();
```

### 8. Create Example Files

#### examples/input.md

```markdown
# My Project Title

Some intro text here.

## Overview

This is the overview section.

## Features

### Feature 1

Description of feature 1.

### Feature 2

Description of feature 2.

## Installation

Installation instructions here.

## Usage

Usage instructions here.
```

### 9. Create README.md

```markdown
# README Hierarchy Formatter

Automatically format README files with beautiful hierarchical styling, centered headers, and horizontal rules.

## Features

- 📝 Converts standard markdown to styled markdown
- 🎨 Adds centered headers with HTML divs
- ➖ Solid 2px HR lines around H1 headers
- ⚊ Dashed 1px HR lines around H2 headers
- 📑 Auto-generates table of contents
- 🔧 Works as CLI tool, Node.js library, or remark plugin

## Installation

```bash
npm install -g readme-hierarchy-formatter
```

Or as a dependency:

```bash
npm install readme-hierarchy-formatter
```

## Usage

### CLI

```bash
# Format in-place
readme-format README.md

# Format to new file
readme-format input.md output.md

# Using -o flag
readme-format README.md -o formatted.md
```

### Node.js API

```javascript
const { formatFile, formatMarkdown } = require('readme-hierarchy-formatter');

// Format a file
await formatFile('README.md', 'formatted.md');

// Format markdown string
const formatted = await formatMarkdown('# My Title\n\n## Section 1');
console.log(formatted);
```

### As Remark Plugin

```javascript
const remark = require('remark');
const remarkReadmeFormatter = require('readme-hierarchy-formatter/plugin');

remark()
  .use(remarkReadmeFormatter, {
    generateToc: true,
    centerHeaders: true,
  })
  .process(markdown);
```

## Options

```typescript
{
  generateToc: true,      // Generate table of contents
  centerHeaders: true,    // Center all headers
  addHrLines: true,       // Add HR lines around headers
  h1Style: 'solid',       // H1 HR style: 'solid' | 'dashed' | 'none'
  h1Thickness: '2px',     // H1 HR thickness
  h2Style: 'dashed',      // H2 HR style: 'solid' | 'dashed' | 'none'
  h2Thickness: '1px',     // H2 HR thickness
}
```

## Example Output

Input markdown gets transformed with:
- Centered headers wrapped in `<div align="center">`
- Horizontal rules with proper styling
- Auto-generated table of contents
- Clean, readable structure

## License

MIT
```

### 10. Build and Test

```bash
# Build the TypeScript
npm run build

# Test the CLI locally
node bin/cli.js examples/input.md examples/output.md

# Check the output
cat examples/output.md
```

### 11. Publishing to npm

```bash
# Login to npm (first time only)
npm login

# Publish
npm publish
```

### 12. Optional: Create GitHub Repository

```bash
git add .
git commit -m "Initial commit: README hierarchy formatter"
git remote add origin https://github.com/yourusername/readme-hierarchy-formatter.git
git push -u origin main
```

## Next Steps

After basic setup:

1. **Add tests** - Write Jest tests in `test/formatter.test.ts`
2. **Add CI/CD** - GitHub Actions for automated testing
3. **VS Code Extension** - Create extension wrapper (separate repo)
4. **Documentation** - Add more examples and API docs
5. **Config file** - Support `.readmeformatterrc` config file

## Customization

You can modify the formatter logic in `src/formatter.ts` to match your exact styling preferences from the NIMO project.

---

**Ready to go!** Follow these steps in your new directory and you'll have a publishable npm package.