import pTwig from './p/_p.twig';
import paragraphData from './p/p.yml';

import headingTwig from './heading/_heading.twig';
import headingData from './heading/heading.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Text' };

export const headings = () => {
  return headingData.map((heading) => {
    return headingTwig(heading)
  }).join('');
};

export const paragraph = () => {
  return paragraphData.map((paragraph) => {
    return pTwig(paragraph)
  }).join('');
}
