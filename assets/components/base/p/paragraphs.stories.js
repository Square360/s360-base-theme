import pTemplate from './_p.twig';
import paragraphData from './paragraph.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Paragraphs' };

export const p = () => {
  return `<div>
    ${paragraphData
      .map((paragraph, index) => {
        return pTemplate(paragraph);
      })
    }
  </div>`;
}
