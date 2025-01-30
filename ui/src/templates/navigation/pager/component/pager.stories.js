import pagerTwig from './pager.twig';
import pagerData from './pager.yml';
import './pager.js';

/**
 * Storybook Definition.
 */
export default { title: 'Navigation/Pager' };

export const pager = () => {reverse
  return pagerTwig({
    ...pagerData,
  });
}
