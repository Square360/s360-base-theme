import oneColumTwig from './one-column/_one-column.twig';
import twoColumTwig from './two-column/_two-column.twig';
import threeColumTwig from './three-column/_three-column.twig';
import fourColumTwig from './four-column/_four-column.twig';

import './layouts.js';

import { COLOR_THEME_OPTIONS } from '.storybook/utils';

import { ctaLink } from '@ui-paragraph/cta-link/component/cta-link.stories.js';
import { placeholder } from '@ui-paragraph/placeholder/component/placeholder.stories.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layouts/Layouts' };

// **************************************************
// ONE COLUMN LAYOUTS

export const oneColumn = (args) => {
  let { color_theme } = args;

  let paragraphAttributes = Object.assign({});

  if (color_theme) {
    paragraphAttributes['data-theme'] = color_theme;
  }

  return oneColumTwig({
    paragraph_layout_region_first: [
      '<h1>Heading</h1>',
      ctaLink({ paragraph_field_cta_link_style: 'Primary' }),
    ],
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
oneColumn.argTypes = {
  color_theme: {
    name: 'Color Theme',
    options: Object.keys(COLOR_THEME_OPTIONS),
    control: {
      type: 'select',
      labels: COLOR_THEME_OPTIONS
    }
  },
};
oneColumn.args = {
  color_theme: '',
};

// **************************************************
// TWO COLUMN LAYOUTS

const LAYOUT_TWO_COLUMN_RATIO_OPTIONS = {
  'layout--50-50': '50%/50%',
  'layout--60-40': '60%/40%',
  'layout--40-60': '40%/60%',
  'layout--70-30': '70%/30%',
  'layout--30-70': '30%/70%',
  'layout--75-25': '75%/25%',
  'layout--25-75': '25%/75%',
};

export const twoColumn = (args) => {
  let { column_ratio } = args;
  let paragraphClasses = [column_ratio];
  let paragraphAttributes = Object.assign({});

  paragraphAttributes.class = paragraphClasses;

  return twoColumTwig({
    paragraph_layout_region_first: placeholder(),
    paragraph_layout_region_second: placeholder(),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
twoColumn.argTypes = {
  column_ratio: {
    name: 'Column Ratio',
    options: Object.keys(LAYOUT_TWO_COLUMN_RATIO_OPTIONS),
    control: {
      type: 'select',
      labels: LAYOUT_TWO_COLUMN_RATIO_OPTIONS
    }
  }
};
twoColumn.args = {
  column_ratio: 'layout--50-50',
};

// **************************************************
// THREE COLUMN LAYOUTS

const LAYOUT_THREE_COLUMN_RATIO_OPTIONS = {
  'layout--33-33-33': '33%/33%/33%',
  'layout--25-50-25': '25%/50%/25%',
  'layout--50-25-25': '50%/25%/25%',
  'layout--25-25-50': '25%/25%/50%',
};

export const threeColumn = (args) => {
  let { column_ratio } = args;
  let paragraphClasses = [column_ratio];
  let paragraphAttributes = Object.assign({});

  paragraphAttributes.class = paragraphClasses;

  return threeColumTwig({
    paragraph_layout_region_first: placeholder(),
    paragraph_layout_region_second: placeholder(),
    paragraph_layout_region_third: placeholder(),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
threeColumn.argTypes = {
  column_ratio: {
    name: 'Column Ratio',
    options: Object.keys(LAYOUT_THREE_COLUMN_RATIO_OPTIONS),
    control: {
      type: 'select',
      labels: LAYOUT_THREE_COLUMN_RATIO_OPTIONS
    }
  }
};
threeColumn.args = {
  column_ratio: 'layout--33-33-33',
};

// **************************************************
// FOUR COLUMN LAYOUTS

export const fourColumn = () => {
  let paragraphAttributes = Object.assign({});

  return fourColumTwig({
    paragraph_layout_region_first: placeholder(),
    paragraph_layout_region_second: placeholder(),
    paragraph_layout_region_third: placeholder(),
    paragraph_layout_region_fourth: placeholder(),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
fourColumn.argTypes = {
};
fourColumn.args = {
};
