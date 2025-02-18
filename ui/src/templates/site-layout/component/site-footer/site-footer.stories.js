import siteFooterTwig from './site-footer.twig';
import siteFooterData from './site-footer.yml';
import './site-footer.js';

import { footer, social } from '@ui-navigation/navigation.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Site Layout/Site Footer' };

export const siteFooter = (args) => {
  return siteFooterTwig({
    ...args,
    site_footer_footer_menu: footer(),
    site_footer_social_menu: social(),
  });
};
siteFooter.args = siteFooterData;
