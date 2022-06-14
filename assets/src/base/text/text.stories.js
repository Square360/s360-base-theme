import pTwig from './p/_p.twig';
import paragraphData from './p/p.yml';

import headingsTwig from './headings/_headings.twig';
import headingsData from './headings/headings.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Text' };

export const headings = () => {
  return headingsData.map((heading) => {
    return headingsTwig(heading)
  }).join('');
};

export const paragraph = () => {
  return paragraphData.map((paragraph) => {
    return pTwig(paragraph)
  }).join('');
}
