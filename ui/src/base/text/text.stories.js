import headingsTwig from './headings/_headings.twig';
import headingsData from './headings/headings.yml';
import paragraphData from './p/p.yml';

import { formatParagraphText } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Text' };

export const headings = () => {
  return headingsData.map((heading) => {
    return headingsTwig(heading)
  }).join('');
};

export const paragraph = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(paragraphData ?? {}), args);

  return formatParagraphText(data.paragraph_text);
}
paragraph.args = paragraphData;
