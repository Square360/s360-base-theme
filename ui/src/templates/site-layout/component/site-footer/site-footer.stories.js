import siteFooterTwig from './site-footer.twig';
import siteFooterData from './site-footer.yml';
import './site-footer.js';

import { footer, corporate, social } from '@ui-navigation/navigation.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Footer' };

export const siteFooter = () => {
  return siteFooterTwig({
    ...siteFooterData,

    site_footer_footer_menu: footer(),
    site_footer_corporate_menu: corporate(),
    site_footer_social_menu: social(),
  });
}
