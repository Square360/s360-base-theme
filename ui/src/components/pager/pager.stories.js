import pagerTwig from './pager.twig';
import pagerData from './pager.yml';
import './pager.js';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Pager' };

export const miniPager = (args) => {
  return pagerTwig({
    ...pagerData.mini_pager
  });
}

export const pager = (args) => {
  return pagerTwig({
    ...pagerData.pager,
  });
}
