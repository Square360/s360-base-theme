import buttonTwig from './_button.twig';
import buttonData from './button.yml';
import "./_button-storybook-only.scss";

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Foundations/Buttons' };

const CTA_STYLE_OPTIONS = {
  '': 'No CTA Style',
};

export const button = ({ ctaStyle }) => {
  let buttonAttributes = Object.assign({});
  let buttonClasses = [ctaStyle];

  buttonAttributes.class = buttonClasses;

  return buttonTwig({
    ...buttonData,
    attributes: new drupalAttribute(Object.entries(buttonAttributes)),
  });
}
button.argTypes = {
  ctaStyle: {
    name: 'CTA Style',
    options: Object.keys(CTA_STYLE_OPTIONS),
    control: {
      type: 'select',
      labels: CTA_STYLE_OPTIONS
    }
  }
}
