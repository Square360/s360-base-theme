import blockquoteTwig from './_blockquote.twig';
import blockquoteData from './blockquote.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Blockquote' };

export const blockquote = (args) => {
  let { blockquote_content } = args;

  return blockquoteTwig({
    ...args,
    blockquote_content: `<p>${ blockquote_content }</p>`
  });
};
blockquote.args = blockquoteData;
