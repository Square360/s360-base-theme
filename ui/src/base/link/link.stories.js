import linkTwig from './_link.twig';
import linkData from './link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Foundation/Links' };

export const link = (args) => {
  return linkTwig({
    ...args
  });
}

link.args = linkData;
link.argTypes = {
  link_text: {
    name: 'Link text'
  },
  link_url: {
    name: 'Url',
  }
}
