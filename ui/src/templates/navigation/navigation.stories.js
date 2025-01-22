import menuTwig from './menu.html.twig';

import corporateData from './corporate/component/menu.corporate.yml';
import './corporate/component/menu.corporate.js';

import footerData from './footer/component/menu.footer.yml';
import './footer/component/menu.footer.js';

import mainData from './main/component/menu.main.yml';
import './main/component/menu.main.js';

import socialData from './social/component/menu.social.yml';
import './social/component/menu.social.js';

import pagerTwig from './pager/component/pager.twig';
import pagerData from './pager/component/pager.yml';
import './pager/component/pager.js';

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

corporateData.items.forEach(item => {
  setItemAttribues(item);
});
export const corporate = () => {
  return menuTwig({
    ...corporateData,
    attributes: new drupalAttribute(),
  });
}

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

socialData.items.forEach(item => {
  setItemAttribues(item);
});
export const social = () => {
  return menuTwig({
    ...socialData,
    attributes: new drupalAttribute(),
  });
}

export const pager = () => {
  return pagerTwig({
    ...pagerData,
  });
}
