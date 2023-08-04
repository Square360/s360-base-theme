import siteFooterTwig from './site-footer.twig';
import siteFooterData from './site-footer.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Footer' };

export const siteFooter = () => {
  return siteFooterTwig({
    ...siteFooterData,
  });
}
