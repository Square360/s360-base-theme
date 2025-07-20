import siteFooterTwig from './site-footer.twig';
import siteFooterData from './site-footer.yml';
import './site-footer.js';

import { social } from '@ui-navigation/social/component/menu.social.stories';
import { footer } from '@ui-navigation/footer/component/menu.footer.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Site Layout/Site Footer' };

export const siteFooter = (args) => {
  let data = Object.assign(siteFooterData, args);

  return siteFooterTwig({
    ...data,
    site_footer_footer_menu: footer(),
    site_footer_social_menu: social(),
  });
};
siteFooter.args = siteFooterData;
