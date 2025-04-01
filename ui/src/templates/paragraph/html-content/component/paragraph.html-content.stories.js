import htmlContentTwig from './paragraph.html-content.twig';
import htmlContentData from './paragraph.html-content.yml';
import './paragraph.html-content.js';

import { formatParagraphCKEditor } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Html Content' };

export const htmlContent = (args) => {
  let data = args ?? htmlContentData;

  return htmlContentTwig({
    ...data,
    paragraph_field_body: formatParagraphCKEditor(data.paragraph_field_body)
  });
};
htmlContent.args = htmlContentData;
