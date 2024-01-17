import formTwig from './_form.twig';
import './_form.scss';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Forms' };

export const form = () => {
  return formTwig();
}
