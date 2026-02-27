import pageTwig from './node.page.full.twig';
import pageData from './node.page.full.yml';
import './node.page.full.js';

import { setPublishedStatus } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Content Types/Page/Full',
  argTypes: {
    node: { control: false }
  }
};

export const full = (args) => {
  // Create deep copy of data and merge args.
  let data = Object.assign(structuredClone(pageData ?? {}), args);
  data.node = setPublishedStatus(data.node_is_published);

  return pageTwig({
    ...data,
  });
};
full.args = pageData;
