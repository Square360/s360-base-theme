import corporateData from './corporate/component/corporate.yml';
import './corporate/component/corporate.js';

import footerData from './footer/component/footer.yml';
import './footer/component/footer.js';

import mainData from './main/component/main.yml';
import './main/component/main.js';

import pagerTwig from './pager/component/pager.twig';
import pagerData from './pager/component/pager.yml';
import './pager/component/pager.js';

import socialData from './social/component/social.yml';
import './social/component/social.js';

import menuTwig from './menu.html.twig';

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
