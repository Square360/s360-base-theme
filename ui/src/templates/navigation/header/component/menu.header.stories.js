import menuTwig from '@ui-navigation/menu.html.twig';

import headerData from './menu.header.yml';
import './menu.header.js';

import { setMenuItemAttribues } from '.storybook/utils';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Navigation/Menus/Header' };

headerData.items.forEach(item => {
  setMenuItemAttribues(item);
});
export const header = () => {
  return menuTwig({
    ...headerData,
    attributes: new drupalAttribute(),
  });
}
