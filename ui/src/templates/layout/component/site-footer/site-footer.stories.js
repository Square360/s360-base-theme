import siteFooterTwig from './site-footer.twig';
import siteFooterData from './site-footer.yml';

import { footer } from '@ui-navigation/navigation.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Footer' };

export const siteFooter = () => {
  return siteFooterTwig({
    ...siteFooterData,

    site_footer_menu: footer(),
  });
}
