import siteHeaderTwig from './site-header.twig';
import siteHeaderData from './site-header.yml';
import './site-header.js';

import '@ui-site-layout/component/block-menu/block-menu.js';
import '@ui-site-layout/component/menu-toggle/menu-toggle.js';

import { fakeDrupalSystemMenuBlock } from '.storybook/utils';

import { main } from '@ui-navigation/main/component/menu.main.stories';
import { brandingBlock } from '@ui-block/branding-block/component/block.branding-block.stories';

/**
 * Storybook Definition.
 */
export default { title: 'Site Layout/Site Header' };

export const siteHeader = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(siteHeaderData ?? {}), args);

  return siteHeaderTwig({
    ...data,
    site_header_branding_block: brandingBlock(),
    site_header_main_menu: fakeDrupalSystemMenuBlock('main', main())
  });
}
siteHeader.args = siteHeaderData;
