import buttonTwig from './_button.twig';
import buttonData from './button.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Button' };

export const button = (args) => {
  return buttonTwig({
    ...args,
  });
};
button.args = buttonData;
