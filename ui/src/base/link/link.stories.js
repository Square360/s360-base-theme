import linkTwig from './_link.twig';
import linkData from './link.yml';
import "./_link-storybook-only.scss";

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Links' };

const CTA_STYLE_OPTIONS = {
  '': 'No CTA Style',
};

export const link = ({ ctaStyle }) => {
  let linkAttributes = Object.assign({});
  let linkClasses = [ctaStyle];

  linkAttributes.class = linkClasses;

  return linkTwig({
    ...linkData,
    attributes: new drupalAttribute(Object.entries(linkAttributes)),
  });
}
link.argTypes = {
  ctaStyle: {
    name: 'CTA Style',
    options: Object.keys(CTA_STYLE_OPTIONS),
    control: {
      type: 'select',
      labels: CTA_STYLE_OPTIONS
    }
  }
}
