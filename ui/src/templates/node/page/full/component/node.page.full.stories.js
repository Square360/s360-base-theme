import pageTwig from './node.page.full.twig';
import pageData from './node.page.full.yml';
import './node.page.full.js';

/**
 * Storybook Definition.
 */
export default { title: 'Content Types/Page' };

export const page = (args) => {
  let {  } = args ?? '';

  return pageTwig({
    ...args
  });
};
page.args = pageData;
