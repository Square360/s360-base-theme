import linkTwig from './_link.twig';
import linkData from './link.yml';
import "./_link-storybook-only.scss";

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Links' };

export const link = () => {
  return linkTwig(linkData);
}
