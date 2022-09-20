import blockquoteTwig from './_blockquote.twig';
import blockquoteData from './blockquote.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Blockquote' };

export const blockquote = () => blockquoteTwig(blockquoteData);
