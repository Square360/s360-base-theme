import htmlContentTwig from './html-content.twig';
import htmlContentData from './html-content.yml';
import './html-content.js';

import ckEditorTwig from '@ui-field/ckeditor/component/ckeditor.twig';
import { formatParagraphText } from '.storybook/_utils.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Html Content' };

export const htmlContent = (args) => {
  return htmlContentTwig({
    ...htmlContentData,
    paragraph_field_body: ckEditorTwig({ field_items: [{ content: formatParagraphText(args.paragraph_field_body) }] }),
  });
};
htmlContent.args = htmlContentData;
