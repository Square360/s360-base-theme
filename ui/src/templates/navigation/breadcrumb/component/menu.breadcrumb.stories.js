import breadcrumbTwig from './menu.breadcrumb.twig';
import breadcrumbData from './menu.breadcrumb.yml';
import './menu.breadcrumb.js';

/**
 * Storybook Definition.
 */
export default { title: 'Navigation/Menus/Breadcrumb' };

export const breadcrumb = () => {
  return breadcrumbTwig({
    ...breadcrumbData
  });
}
