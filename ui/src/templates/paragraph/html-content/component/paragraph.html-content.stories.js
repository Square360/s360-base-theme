import htmlContentTwig from './paragraph.html-content.twig';
import htmlContentData from './paragraph.html-content.yml';
import './paragraph.html-content.js';

import ckEditorTwig from '@ui-field/ckeditor/component/ckeditor.twig';
import { formatParagraphText } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Html Content' };

export const htmlContent = (args) => {
  let { paragraph_field_body } = args ?? '';

  return htmlContentTwig({
    paragraph_field_body: ckEditorTwig({
      field_items: [{
        content: formatParagraphText(paragraph_field_body)
      }]
    }),
  });
};
htmlContent.args = htmlContentData;
