import siteHeaderTwig from './site-header.twig';
import siteHeaderData from './site-header.yml';
import './site-header.js';

// There is no story to import because the template is included in the twig
// file, so we just need the JS file to pick up the style and interaction.
import '@ui-site-layout/component/main-menu-toggle/main-menu-toggle.js';

import { main } from '@ui-navigation/navigation.stories';
import { brandingBlock } from '@ui-block/branding-block/component/block.branding-block.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Site Header' };

export const siteHeader = (args) => {
  return siteHeaderTwig({
    ...args,
    site_header_branding_block: brandingBlock(),
    site_header_main_menu: main(),
  });
}
siteHeader.args = siteHeaderData;
