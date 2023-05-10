import siteHeaderTwig from './site-header.twig';
import siteHeaderData from './site-header.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Header' };

export const siteHeader = () => {
  return siteHeaderTwig();
}
