import pagerTwig from './pager.twig';
import pagerData from './pager.yml';
import './pager.js';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Pager' };

export const miniPager = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(pagerData ?? {}), args);

  return pagerTwig({
    ...data.mini_pager
  });
}

export const pager = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(pagerData ?? {}), args);

  return pagerTwig({
    ...data.pager,
  });
}
