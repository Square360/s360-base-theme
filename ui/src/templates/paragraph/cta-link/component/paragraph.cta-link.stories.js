import ctaLinkTwig from './paragraph.cta-link.twig';
import ctaLinkData from './paragraph.cta-link.yml';
import './paragraph.cta-link.js';

import linkTwig from '@ui-base/link/_link.twig';

import { paragraphFieldCtaLinkStyle } from '.storybook/utils';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Cta Link' };

export const ctaLink = (args) => {
  let { paragraph_field_link, paragraph_field_cta_link_style } = args ?? '';

  paragraph_field_link = (paragraph_field_link)
    ? paragraph_field_link
    : ctaLinkData.paragraph_field_link;

  paragraph_field_cta_link_style = (paragraph_field_cta_link_style)
    ? paragraph_field_cta_link_style
    : ctaLinkData.paragraph_field_cta_link_style;

  return ctaLinkTwig({
    ...args,
    paragraph_field_cta_link_style: paragraph_field_cta_link_style,
    paragraph_field_link: linkTwig({ ...paragraph_field_link }),
  });
};

ctaLink.argTypes = {
  paragraph_field_cta_link_style: paragraphFieldCtaLinkStyle,
};
ctaLink.args = ctaLinkData;
