import linkTwig from './_link.twig';
import linkData from './link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Link' };

export const link = (args) => {
  return linkTwig({
    ...args
  });
}

link.args = linkData;
