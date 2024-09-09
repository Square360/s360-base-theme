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

export const paragraph = (args) => {
  let { paragraph_text } = args;

  let paragraphs = paragraph_text.split(/\r?\n|\r|\n/g);

  return paragraphs.map((paragraph_text) => {
    if (!paragraph_text) {
      paragraph_text = '&nbsp;';
    }

    return pTwig({ paragraph_text });
  }).join('');
}
paragraph.args = paragraphData;
