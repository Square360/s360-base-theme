import linkTwig from './_link.twig';
import linkData from './link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Link' };

export const link = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(linkData ?? {}), args);

  return linkTwig({
    ...data
  });
}

link.args = linkData;
