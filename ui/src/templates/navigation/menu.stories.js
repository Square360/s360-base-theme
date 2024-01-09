import footerData from './footer/footer.yml';
import './footer/footer.js';

import mainData from './main/main.yml';
import './main/main.js';

import pagerTwig from './pager/pager.twig';
import pagerData from './pager/pager.yml';
import './pager/pager.js';

import socialData from './social/social.yml';
import './social/social.js';

import menuTwig from './menu.twig';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Navigation/Menus' };

// isolated function
function setItemAttribues(item) {
  item.attributes = new drupalAttribute();

  if (item.below) {
    item.below.forEach(childItem => {
      setItemAttribues(childItem);
    })
  }
}
// end - isolated function

footerData.items.forEach(item => {
  setItemAttribues(item);
});
export const footer = () => {
  return menuTwig({
    ...footerData,
    attributes: new drupalAttribute(),
  });
}

mainData.items.forEach(item => {
  setItemAttribues(item);
});
export const main = () => {
  return menuTwig({
    ...mainData,
    attributes: new drupalAttribute(),
  });
}

export const pager = () => {
  return pagerTwig({
    ...pagerData,
  });
}

socialData.items.forEach(item => {
  setItemAttribues(item);
});
export const social = () => {
  return menuTwig({
    ...socialData,
    attributes: new drupalAttribute(),
  });
}
