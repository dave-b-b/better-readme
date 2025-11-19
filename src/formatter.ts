import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Root, Heading, HTML } from 'mdast';
import { FormatterOptions, defaultOptions } from './types.js';

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
