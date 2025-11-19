# Better README

**Beautiful markdown previews for every IDE.** Write normal markdown, get stunning results.

A customizable CSS stylesheet that makes markdown previews look professional and polished across VS Code, JetBrains IDEs, Atom, Sublime Text, and more.

---

## ✨ Features

- **📝 Zero Changes to Your Markdown** - Write normal markdown syntax, no HTML or special tags needed
- **🎨 Beautiful Styling** - Centered headers, decorative borders, professional typography
- **🔧 Fully Customizable** - Change colors, borders, spacing via CSS variables
- **🌍 Cross-IDE Support** - Works in VS Code, JetBrains, Atom, Sublime, Typora, and more
- **📱 Responsive Design** - Looks great on any screen size
- **🖨️ Print-Friendly** - Optimized styles for printing documentation

---

## 🚀 Quick Start

### 1. Install

**VS Code:**
```json
// .vscode/settings.json
{
  "markdown.styles": [
    "https://raw.githubusercontent.com/yourusername/better-readme/main/styles/better-readme.css"
  ]
}
```

**JetBrains IDEs:**
Settings → Languages & Frameworks → Markdown → CSS → Add `better-readme.css`

**Other IDEs:** See [INSTALLATION.md](INSTALLATION.md)

### 2. Write Normal Markdown

```markdown
# My Awesome Project

A brief description of what it does.

## Installation

npm install my-project

## Features

### Feature 1

Description here...
```

### 3. Preview

Open the markdown preview in your IDE and enjoy the beautiful formatting!

---

## 🎨 What It Looks Like

| Before (Plain Markdown) | After (Better README) |
|------------------------|----------------------|
| Standard headers | ✨ Centered headers with decorative borders |
| Plain links | 🔗 Styled links with hover effects |
| Basic code blocks | 💻 Bordered code blocks with proper spacing |
| Simple tables | 📊 Polished tables with hover effects |
| Flat appearance | 🎯 Hierarchical visual structure |

**See it in action:** Open [EXAMPLE.md](EXAMPLE.md) in your IDE's markdown preview!

---

## 📦 What's Included

```
better-readme/
├── styles/
│   └── better-readme.css          # Main stylesheet
├── .vscode/
│   └── settings.json              # VS Code configuration example
├── INSTALLATION.md                # Detailed installation for all IDEs
├── EXAMPLE.md                     # Showcase of all styling features
└── README.md                      # This file
```

---

## 🎯 Why Better README?

### Keep Your Markdown Clean

You write:
```markdown
# Project Title
## Section
```

You get:
- Centered headers with decorative borders
- Professional spacing and typography
- Beautiful visual hierarchy
- No HTML clutter in your source files

### Reserve `#` for Navigation

When searching in your editor for `## Installation`, you want to find section headers, not decorative titles. Better README keeps your markdown searchable and navigable.

### Consistent Branding

Apply the same professional look across all your project documentation without copy-pasting HTML/CSS.

### Works Everywhere

One CSS file works across:
- ✅ Visual Studio Code
- ✅ JetBrains IDEs (IntelliJ, WebStorm, PyCharm, etc.)
- ✅ Atom
- ✅ Sublime Text
- ✅ Typora
- ✅ GitHub/GitLab (with browser extension)
- ✅ Any custom markdown viewer

---

## ⚙️ Customization

Edit the CSS variables at the top of `better-readme.css`:

```css
:root {
  /* H1 Styling */
  --h1-border-style: solid;        /* solid | dashed | dotted | double */
  --h1-border-width: 2px;
  --h1-border-color: #333;
  --h1-text-align: center;         /* center | left | right */

  /* H2 Styling */
  --h2-border-style: dashed;
  --h2-border-width: 1px;
  --h2-border-color: #666;
  --h2-text-align: center;

  /* Colors */
  --heading-color: #2c3e50;
  --link-color: #3498db;
  --code-background: #f5f5f5;

  /* And many more... */
}
```

### Example Customizations

**Minimal Style:**
```css
:root {
  --h1-border-style: none;
  --h2-border-style: none;
  --h1-text-align: left;
  --h2-text-align: left;
}
```

**Colorful Style:**
```css
:root {
  --h1-border-color: #e74c3c;
  --h2-border-color: #3498db;
  --h1-border-style: double;
  --h2-border-style: solid;
  --link-color: #9b59b6;
}
```

**Corporate Style:**
```css
:root {
  --h1-border-color: #003366;
  --h2-border-color: #0066cc;
  --heading-color: #003366;
  --link-color: #0066cc;
}
```

---

## 📖 Documentation

- **[INSTALLATION.md](INSTALLATION.md)** - Detailed setup instructions for every IDE
- **[EXAMPLE.md](EXAMPLE.md)** - Full showcase of all styling features
- **[styles/better-readme.css](styles/better-readme.css)** - The stylesheet with inline documentation

---

## 🎓 How It Works

Better README is a pure CSS solution:

1. **You write** standard markdown (`# Header`, `## Section`, etc.)
2. **Your IDE** renders the markdown to HTML
3. **Better README CSS** styles that HTML beautifully
4. **You see** professional, polished documentation

No build process, no transforms, no modifications to your source files.

---

## 💡 Examples

### Before
```markdown
# My Project
## Installation
npm install my-project
## Usage
const project = require('my-project');
```

### After Preview
The same markdown, but rendered with:
- Centered "My Project" with solid top/bottom borders
- Centered "Installation" with dashed borders
- Code blocks with left accent border
- Professional spacing throughout

**Try it yourself:** Copy the markdown above into a file and preview it with Better README enabled!

---

## 🤝 Contributing

Contributions welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- [ ] Additional color themes
- [ ] Dark mode support
- [ ] Animation options
- [ ] Additional table styles
- [ ] Badge/shield styling improvements
- [ ] Language-specific code block themes

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

Feel free to use this in personal or commercial projects!

---

## 🙏 Acknowledgments

- Inspired by the need for beautiful, maintainable documentation
- Built with love for the developer community
- Thanks to all markdown IDE developers for supporting custom CSS

---

## ⭐ Show Your Support

If Better README makes your documentation look great, give it a star! ⭐

It helps others discover the project and motivates continued development.

---

**Made with ❤️ for developers who care about documentation**
