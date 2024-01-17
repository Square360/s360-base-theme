import htmlContentTwig from './html-content.twig';
import htmlContentData from './html-content.yml';
import './html-content.js';

import ckEditorTwig from '@ui-field/ckeditor/component/ckeditor.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Html Content' };

export const htmlContent = () => {
  return htmlContentTwig({
    ...htmlContentData,
    paragraph_field_body: ckEditorTwig({ field_items: [{ content: htmlContentData.paragraph_field_body }] }),
  });
}
