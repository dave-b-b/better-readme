# Installation Guide

Better README works with most markdown-capable IDEs by applying custom CSS to the markdown preview. Choose your IDE below for installation instructions.

## Visual Studio Code

### Method 1: Workspace Settings (Recommended)

1. Copy `styles/better-readme.css` to your project
2. Create/edit `.vscode/settings.json` in your project root:

```json
{
  "markdown.styles": [
    "${workspaceFolder}/styles/better-readme.css"
  ]
}
```

3. Open any markdown file and click the preview button (Cmd+Shift+V or Ctrl+Shift+V)

### Method 2: Global Settings

1. Download `better-readme.css` to a permanent location (e.g., `~/markdown-styles/`)
2. Open VS Code Settings (Cmd+, or Ctrl+,)
3. Search for "markdown.styles"
4. Click "Edit in settings.json"
5. Add:

```json
{
  "markdown.styles": [
    "/absolute/path/to/better-readme.css"
  ]
}
```

### Method 3: Extension (Coming Soon)

Install directly from VS Code marketplace: `better-readme`

---

## JetBrains IDEs (IntelliJ, WebStorm, PyCharm, etc.)

1. Copy `styles/better-readme.css` to your project
2. Go to **Settings/Preferences → Languages & Frameworks → Markdown**
3. In the **CSS** section, click the **+** button
4. Add the path to `better-readme.css`
5. Click **Apply** and **OK**

Alternative: Use the custom CSS URI field and paste the contents of `better-readme.css`

---

## Atom

1. Install the `markdown-preview-plus` package if not already installed
2. Copy `styles/better-readme.css` to `~/.atom/`
3. Go to **Settings → Packages → markdown-preview-plus → Settings**
4. Under "Custom Stylesheet", enter: `~/.atom/better-readme.css`
5. Restart Atom

---

## Sublime Text

1. Install the `MarkdownPreview` package via Package Control
2. Copy `styles/better-readme.css` to Sublime Text's User folder
3. Go to **Preferences → Package Settings → MarkdownPreview → Settings - User**
4. Add:

```json
{
  "css": ["better-readme.css"]
}
```

---

## Typora

1. Go to **Preferences → Appearance → Open Theme Folder**
2. Copy `styles/better-readme.css` to the themes folder
3. Rename it to `better-readme.user.css`
4. Restart Typora
5. Select **Themes → better-readme**

---

## GitHub Pages / Jekyll

Add to your `_config.yml`:

```yaml
markdown: kramdown
kramdown:
  input: GFM

# Add custom CSS
sass:
  sass_dir: _sass
  style: compressed
```

Then import the stylesheet in your layout:

```html
<link rel="stylesheet" href="/styles/better-readme.css">
```

---

## Browser (GitHub, GitLab, etc.)

### Using Stylus Browser Extension

1. Install [Stylus](https://add0n.com/stylus.html) for your browser
2. Click the Stylus icon and choose "Manage"
3. Click "Write new style"
4. Paste the contents of `better-readme.css`
5. Under "Applies to", add domains:
   - `github.com`
   - `gitlab.com`
   - Any other markdown preview sites

6. Save and enable

---

## Custom Web Viewer

If you're building your own markdown viewer:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles/better-readme.css">
</head>
<body>
  <!-- Your rendered markdown content -->
</body>
</html>
```

Or with a markdown library like `marked`:

```javascript
import { marked } from 'marked';

const markdown = '# My Title\n\n## Section 1';
const html = marked(markdown);

document.body.innerHTML = `
  <link rel="stylesheet" href="styles/better-readme.css">
  ${html}
`;
```

---

## Customization

You can customize the styling by editing the CSS variables at the top of `better-readme.css`:

```css
:root {
  /* H1 Styling */
  --h1-border-style: solid;      /* Change to: dashed, dotted, double */
  --h1-border-width: 2px;        /* Change thickness */
  --h1-border-color: #333;       /* Change color */
  --h1-text-align: center;       /* Change to: left, right */

  /* H2 Styling */
  --h2-border-style: dashed;
  --h2-border-width: 1px;
  --h2-border-color: #666;
  --h2-text-align: center;

  /* Colors */
  --heading-color: #2c3e50;
  --link-color: #3498db;
  /* ... and more */
}
```

---

## Troubleshooting

### Styles not applying in VS Code

- Make sure the path in `settings.json` is correct
- Try using an absolute path instead of `${workspaceFolder}`
- Reload VS Code window (Cmd+Shift+P → "Reload Window")

### Styles not applying in JetBrains IDEs

- Check that the CSS file path is correct
- Try restarting the IDE
- Make sure you're viewing the markdown preview (not the editor)

### Styles conflict with existing theme

- Edit the CSS variables to match your preferred colors
- You can disable specific features by commenting out sections

---

## Need Help?

Create an issue at: https://github.com/yourusername/better-readme/issues
