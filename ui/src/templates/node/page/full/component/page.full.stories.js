import pageTwig from './page.full.twig';
import pageData from './page.full.yml';
import './page.full.js';

/**
 * Storybook Definition.
 */
export default { title: 'Content Types/Page' };

export const page = (args) => {
  return pageTwig({
    ...args
  });
};
page.args = pageData;
