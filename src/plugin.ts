import { Plugin } from 'unified';
import { Root } from 'mdast';
import { ReadmeFormatter } from './formatter.js';
import { FormatterOptions } from './types.js';

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
