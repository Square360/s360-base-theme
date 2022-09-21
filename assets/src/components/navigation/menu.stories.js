import mainTwig from './main/main.twig';
import mainData from './main/main.yml';
import './main/main.js';

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

mainData.items.forEach(item => {
  setItemAttribues(item);
});

export const main = () => {
  return mainTwig({
    ...mainData,
    attributes: new drupalAttribute(),
  });
}
