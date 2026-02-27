import buttonTwig from './_button.twig';
import buttonData from './button.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Button' };

export const button = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(buttonData ?? {}), args);

  return buttonTwig({
    ...data,
  });
};
button.args = buttonData;
