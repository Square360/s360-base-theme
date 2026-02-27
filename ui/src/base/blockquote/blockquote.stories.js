import blockquoteTwig from './_blockquote.twig';
import blockquoteData from './blockquote.yml';

import { formatParagraphText } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Blockquote' };

export const blockquote = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(blockquoteData ?? {}), args);

  return blockquoteTwig({
    ...data,
    blockquote_content: formatParagraphText(args.blockquote_content),
  });
};

blockquote.args = blockquoteData;
