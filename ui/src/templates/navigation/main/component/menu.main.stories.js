import menuTwig from '@ui-navigation/menu.html.twig';

import mainData from './menu.main.yml';
import './menu.main.js';

import { setMenuItemAttribues } from '.storybook/utils';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Menus/Main' };

mainData.items.forEach(item => {
  setMenuItemAttribues(item);
});
export const main = () => {
  return menuTwig({
    ...mainData,
    attributes: new drupalAttribute(),
  });
}
