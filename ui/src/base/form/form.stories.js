import formTwig from './_form.twig';

import "@ui-form/form/component/form.scss";

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Forms' };

export const form = () => {
  return formTwig();
}
