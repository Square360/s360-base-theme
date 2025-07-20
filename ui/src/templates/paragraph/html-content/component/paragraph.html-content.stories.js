import htmlContentTwig from './paragraph.html-content.twig';
import htmlContentData from './paragraph.html-content.yml';
import './paragraph.html-content.js';

import { formatParagraphCKEditor, setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout Components/Html Content',
  argTypes: {
    paragraph: { control: false }
  }
};

export const htmlContent = (args) => {
  let data = Object.assign(htmlContentData, args);
  data.paragraph = setPublishedStatus(data.paragraph_is_published);

  return htmlContentTwig({
    ...data,
    paragraph_field_body: formatParagraphCKEditor(data.paragraph_field_body)
  });
};
htmlContent.args = htmlContentData;
