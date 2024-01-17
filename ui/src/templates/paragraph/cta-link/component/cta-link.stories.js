import ctaLinkTwig from './cta-link.twig';
import ctaLinkData from './cta-link.yml';
import './cta-link.js';

import linkTwig from '@ui-base/link/_link.twig';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Cta Link' };

const CTA_LINK_STYLE_OPTIONS = {
}

export const ctaLink = ({ ctaLinkStyle }) => {
  return ctaLinkTwig({
    ...ctaLinkData,
    paragraph_field_cta_link_style: ctaLinkStyle,
    paragraph_field_link: linkTwig({ ...ctaLinkData.paragraph_field_link }),
  });
}

ctaLink.argTypes = {
  ctaLinkStyle: {
    name: 'CTA Link Style',
    options: Object.keys(CTA_LINK_STYLE_OPTIONS),
    control: {
      type: 'select',
      labels: CTA_LINK_STYLE_OPTIONS
    },
  }
};
ctaLink.args = {
  ctaLinkStyle: '',
}
