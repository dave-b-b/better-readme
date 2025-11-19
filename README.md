# Better README

Automatically format README files with beautiful hierarchical styling, centered headers, and horizontal rules.

## Features

- Converts standard markdown to styled markdown
- Adds centered headers with HTML divs
- Solid 2px HR lines around H1 headers
- Dashed 1px HR lines around H2 headers
- Auto-generates table of contents
- Works as CLI tool, Node.js library, or remark plugin

## Installation

```bash
npm install -g better-readme
```

Or as a dependency:

```bash
npm install better-readme
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
const { formatFile, formatMarkdown } = require('better-readme');

// Format a file
await formatFile('README.md', 'formatted.md');

// Format markdown string
const formatted = await formatMarkdown('# My Title\n\n## Section 1');
console.log(formatted);
```

### As Remark Plugin

```javascript
const remark = require('remark');
const remarkReadmeFormatter = require('better-readme/plugin');

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

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Test locally
node bin/cli.js examples/input.md examples/output.md
```

## License

MIT
