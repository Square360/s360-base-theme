import dlTwig from './description-list/_dl.twig';
import ulTwig from './html-list/_ul.twig';
import olTwig from './html-list/_ol.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Lists' };

export const descriptionList = () => dlTwig();
export const unorderedList = () => ulTwig();
export const orderedList = () => olTwig();
