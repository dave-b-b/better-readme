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
