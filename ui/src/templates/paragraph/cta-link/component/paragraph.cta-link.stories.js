import ctaLinkTwig from './paragraph.cta-link.twig';
import ctaLinkData from './paragraph.cta-link.yml';
import './paragraph.cta-link.js';

import linkTwig from '@ui-base/link/_link.twig';
import { ctaLinkStyleControl } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Cta Link' };

export const ctaLink = (args) => {
  let data = args ?? ctaLinkData;

  return ctaLinkTwig({
    ...data,
    paragraph_field_link: linkTwig({
      link_text: data.paragraph_field_link
    }),
  });
};

ctaLink.args = ctaLinkData;
ctaLink.argTypes = {
  paragraph_field_cta_link_style: ctaLinkStyleControl,
};
