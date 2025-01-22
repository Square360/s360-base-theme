import dlTwig from './description-list/_dl.twig';
import ulTwig from './html-list/_ul.twig';
import olTwig from './html-list/_ol.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Lists' };

export const descriptionList = () => {
  return dlTwig();
}

export const unorderedList = () => {
  return ulTwig();
}

export const orderedList = () => {
  return olTwig();
}
