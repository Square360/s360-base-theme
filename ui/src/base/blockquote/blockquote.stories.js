import blockquoteTwig from './_blockquote.twig';
import blockquoteData from './blockquote.yml';

import { formatParagraphText } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Blockquote' };

export const blockquote = (args) => {
  let { blockquote_content } = args;

  return blockquoteTwig({
    ...args,
    blockquote_content: formatParagraphText(args.blockquote_content),
  });
};

blockquote.args = blockquoteData;
