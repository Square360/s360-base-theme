import ctaLinkTwig from './cta-link.twig';
import ctaLinkData from './cta-link.yml';
import './cta-link.js';

import linkTwig from '../../../base/link/_link.twig';
import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layout Components/Cta Link' };

export const ctaLink = ({ ctaLinkStyle }) => {
  let paragraphClasses = [...ctaLinkData.paragraph_attributes.class, ctaLinkStyle ];
  let paragraphAttributes = Object.assign({}, ctaLinkData.paragraph_attributes);

  paragraphAttributes.class = paragraphClasses;

  return ctaLinkTwig({
    ...ctaLinkData,
    paragraph_field_link: linkTwig({...ctaLinkData.paragraph_field_link}),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
}

ctaLink.argTypes = {
  ctaLinkStyle: {
    name: 'CTA Link Style',
    control: {
      type: 'select',
      options: {
      },
    },
    defaultValue: 'paragraph--cta-link-',
  }
};
