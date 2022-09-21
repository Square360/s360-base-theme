import siteFooterTwig from './site-footer.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Footer' };

export const siteFooter = () => {
  return siteFooterTwig();
}
