import buttonTwig from './_button.twig';
import buttonData from './button.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Buttons' };

export const button = () => buttonTwig(buttonData);
