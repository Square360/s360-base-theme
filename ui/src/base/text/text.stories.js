import paragraphData from './p/p.yml';
import headingsTwig from './headings/_headings.twig';
import headingsData from './headings/headings.yml';

import { formatParagraphText } from '.storybook/_utils.js';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Text' };

export const headings = () => {
  return headingsData.map((heading) => {
    return headingsTwig(heading)
  }).join('');
};

export const paragraph = (args) => {
  let { paragraph_text } = args;

  return formatParagraphText(paragraph_text);
}
paragraph.args = paragraphData;
