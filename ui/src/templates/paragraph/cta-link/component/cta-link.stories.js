import ctaLinkTwig from './cta-link.twig';
import ctaLinkData from './cta-link.yml';
import './cta-link.js';

import linkTwig from '@ui-base/link/_link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Cta Link' };

const CTA_LINK_STYLE_OPTIONS = {
  'primary': 'Primary',
  'secondary': 'Secondary'
}

export const ctaLink = ({ paragraph_field_cta_link_style }) => {
  return ctaLinkTwig({
    ...ctaLinkData,
    paragraph_field_cta_link_style: (paragraph_field_cta_link_style == undefined)
      ? ctaLinkData.paragraph_field_cta_link_style
      : paragraph_field_cta_link_style,
    paragraph_field_link: linkTwig({ ...ctaLinkData.paragraph_field_link }),
  });
}

ctaLink.argTypes = {
  paragraph_field_cta_link_style: {
    name: 'CTA Link Style',
    options: Object.keys(CTA_LINK_STYLE_OPTIONS),
    control: {
      type: 'select',
      labels: CTA_LINK_STYLE_OPTIONS
    },
  }
};
ctaLink.args = {
  paragraph_field_cta_link_style: 'primary',
}
