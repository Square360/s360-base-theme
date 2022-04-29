import _link from './_link.twig';
import linkData from './link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Links' };

export const links = () => _link(linkData);
