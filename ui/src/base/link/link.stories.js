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

link.argTypes = {
  link_text: {
    name: 'Link text'
  },
  link_url: {
    name: 'Url',
  }
};
link.args = linkData;
