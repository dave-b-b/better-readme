# Better README Example

This example demonstrates all the styling features of Better README. Open the preview to see the beautiful formatting!

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Code Examples](#code-examples)
5. [Advanced Features](#advanced-features)
6. [Contributing](#contributing)

---

## Features

This section shows off the H2 styling with centered headers and decorative borders.

### Beautiful Headers

All H1 and H2 headers are automatically:
- **Centered** for maximum impact
- Surrounded by **decorative borders**
- Styled with perfect spacing

### Automatic Styling

No need to add HTML or CSS to your markdown files. Just write normal markdown:
- Use `# Title` for main headers
- Use `## Section` for major sections
- Use `### Subsection` for smaller sections

### Cross-IDE Support

Works in:
- Visual Studio Code
- JetBrains IDEs (IntelliJ, WebStorm, PyCharm)
- Atom
- Sublime Text
- Typora
- GitHub/GitLab (with browser extension)

---

## Installation

The installation process is simple and works across all major IDEs.

### Quick Start

1. Download `better-readme.css`
2. Add it to your IDE's markdown preview settings
3. Enjoy beautiful READMEs!

See [INSTALLATION.md](INSTALLATION.md) for detailed instructions for your specific IDE.

---

## Usage

Just write normal markdown! Here are some examples:

### Lists

Unordered lists look great:
- First item with some text
- Second item with **bold text**
- Third item with *italic text*
- Fourth item with `inline code`

Ordered lists too:
1. First numbered item
2. Second numbered item
3. Third numbered item
   - Nested unordered item
   - Another nested item
4. Fourth numbered item

### Emphasis

You can use:
- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- ***Bold and italic*** for maximum impact
- `inline code` for technical terms

### Links

Links are styled beautifully with hover effects:
- [Documentation](https://example.com)
- [GitHub Repository](https://github.com)
- [Installation Guide](INSTALLATION.md)

---

## Code Examples

Code blocks get syntax highlighting and a nice border:

### JavaScript

```javascript
function formatMarkdown(content) {
  const formatted = applyStyles(content);
  return {
    html: formatted,
    success: true
  };
}

console.log('Beautiful READMEs for everyone!');
```

### Python

```python
def format_markdown(content):
    """Format markdown with beautiful styles."""
    formatted = apply_styles(content)
    return {
        'html': formatted,
        'success': True
    }

print('Beautiful READMEs for everyone!')
```

### Inline Code

You can also use `inline code` like `npm install` or `git clone` within sentences.

---

## Advanced Features

This section demonstrates more advanced markdown features.

### Tables

Tables are beautifully styled with hover effects:

| Feature | Supported | Notes |
|---------|-----------|-------|
| H1 Headers | ✅ | Centered with solid borders |
| H2 Headers | ✅ | Centered with dashed borders |
| H3 Headers | ✅ | Left-aligned, no borders |
| Code Blocks | ✅ | Syntax highlighting |
| Tables | ✅ | Hover effects |
| Images | ✅ | Rounded corners, shadows |

### Blockquotes

Blockquotes stand out with a left border and background:

> This is a blockquote that demonstrates how quoted text appears.
> It has a nice border and background color to make it stand out.
>
> You can have multiple paragraphs in a blockquote too!

### Images

Images get rounded corners and subtle shadows:

![Placeholder](https://via.placeholder.com/600x300?text=Example+Image)

### Horizontal Rules

Horizontal rules create visual separation:

---

Like the one above and below!

---

## Contributing

### How to Contribute

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

Please follow these guidelines:
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Write tests for new features

### Testing

Before submitting, make sure:
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Examples are included

---

## License

MIT License - feel free to use this in your projects!

---

## Acknowledgments

Special thanks to:
- The markdown community
- IDE developers for making preview customization possible
- Everyone who uses and contributes to this project

**Enjoy your beautiful READMEs!** 🎉
