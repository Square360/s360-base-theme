import siteHeaderTwig from './site-header.twig';
import siteHeaderData from './site-header.yml';

import { main } from '@ui-navigation/navigation.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Header' };

export const siteHeader = () => {
  return siteHeaderTwig({
    ...siteHeaderData,
    site_header_main_menu: main(),
  });
}
