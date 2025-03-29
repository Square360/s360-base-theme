import pageTwig from './node.page.full.twig';
import pageData from './node.page.full.yml';
import './node.page.full.js';

/**
 * Storybook Definition.
 */
export default { title: 'Content Types/Page' };

export const page = (args) => {
  let data = args ?? pageData;

  return pageTwig({
    ...data,
  });
};
page.args = pageData;
