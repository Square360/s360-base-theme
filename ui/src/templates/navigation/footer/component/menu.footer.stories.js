import menuTwig from '@ui-navigation/menu.html.twig';

import footerData from './menu.footer.yml';
import './menu.footer.js';

import { setMenuItemAttribues } from '.storybook/utils';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Navigation/Menus/Footer' };

footerData.items.forEach(item => {
  setMenuItemAttribues(item);
});
export const footer = () => {
  return menuTwig({
    ...footerData,
    attributes: new drupalAttribute(),
  });
}
