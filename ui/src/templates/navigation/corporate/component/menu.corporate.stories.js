import corporateData from './menu.corporate.yml';
import './menu.corporate.js';

import menuTwig from '@ui-navigation/menu.html.twig';
import { setMenuItemAttribues } from '.storybook/utils';
import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Menus/Corporate' };

corporateData.items.forEach(item => {
  setMenuItemAttribues(item);
});
export const corporate = () => {
  return menuTwig({
    ...corporateData,
    attributes: new drupalAttribute(),
  });
}
