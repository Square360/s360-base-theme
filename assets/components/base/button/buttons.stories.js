import _buttonTemplate from './_button.twig';
import buttonData from './button.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Buttons' };

export const buttons = () => _buttonTemplate(buttonData);
