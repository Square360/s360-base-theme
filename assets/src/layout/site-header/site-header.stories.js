import siteHeaderTwig from './site-header.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Header' };

export const siteHeader = () => {
  return siteHeaderTwig();
}
