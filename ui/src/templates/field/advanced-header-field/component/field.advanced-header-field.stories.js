import advancedHeaderFieldTwig from './_advanced-header-field.twig';
import './field.advanced-header-field.js';

import linkTwig from '@ui-base/link/_link.twig';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default {
  title: 'Field/Advanced Header Field',
  args: {
    semantic_tag: 'h2',
    heading_text: 'Text',
    heading_text_is_link: false,
    centered: false,
    size: '',
  }
}

const SEMANTIC_TAG_OPTIONS = {
  'h2': 'H2',
  'h3': 'H3',
  'h4': 'H4',
}

const SIZE_OPTIONS = {
  '': '- Select -',
  'h2': 'H2',
  'h3': 'H3',
  'h4': 'H4',
}

export const advancedHeaderField = (args) => {
  let {
    semantic_tag,
    heading_text,
    centered,
    size,
    heading_text_is_link,
  } = args || {};
  let advancedHeaderFieldAttributes = Object.assign({});
  let headingTagAttributes = Object.assign({});

  advancedHeaderFieldAttributes['class'] = [];
  headingTagAttributes['class'] = [];

  return advancedHeaderFieldTwig({
    base_class: 'advanced-header-field',
    header_tag: 'header',
    heading_tag: semantic_tag || 'h2',
    heading_text: heading_text_is_link
      ? linkTwig({ link_text: heading_text })
      : heading_text,
    classes: [
      (centered ? 'style-centered' : ''),
      (size ? `size-${size}` : '')
    ],
    attributes: new drupalAttribute(Object.entries(advancedHeaderFieldAttributes)),
    heading_tag_attributes: new drupalAttribute(Object.entries(headingTagAttributes)),
  });
}
advancedHeaderField.argTypes = {
  semantic_tag: {
    name: 'Semantic Tag',
    options: Object.keys(SEMANTIC_TAG_OPTIONS),
    control: {
      type: 'select',
      labels: SEMANTIC_TAG_OPTIONS
    }
  },
  size: {
    name: 'Size',
    options: Object.keys(SIZE_OPTIONS),
    control: {
      type: 'select',
      labels: SIZE_OPTIONS
    }
  }
};
