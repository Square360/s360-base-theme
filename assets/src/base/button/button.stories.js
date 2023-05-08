import buttonTwig from './_button.twig';
import buttonData from './button.yml';
import "./_button-storybook-only.scss";

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Buttons' };

export const button = () => {
  return buttonTwig(buttonData);
}
