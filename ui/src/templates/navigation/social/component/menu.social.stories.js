import menuTwig from '@ui-navigation/menu.html.twig';

import socialData from './menu.social.yml';
import './menu.social.js';

import { setMenuItemAttribues } from '.storybook/utils';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Navigation/Menus/Social' };

socialData.items.forEach(item => {
  setMenuItemAttribues(item);
});
export const social = () => {
  return menuTwig({
    ...socialData,
    attributes: new drupalAttribute(),
  });
}
