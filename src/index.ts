import fs from 'fs/promises';
import { ReadmeFormatter } from './formatter.js';
import { FormatterOptions } from './types.js';

export { ReadmeFormatter, FormatterOptions };
export { default as remarkReadmeFormatter } from './plugin.js';

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
