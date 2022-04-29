import _heading from './_heading.twig';
import headingData from './heading.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Headings' };

export const headings = () => _headings(headingData);
