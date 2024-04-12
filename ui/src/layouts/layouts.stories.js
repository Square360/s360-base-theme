import oneColumTwig from './one-column/_one-column.twig';
import twoColumTwig from './two-column/_two-column.twig';
import threeColumTwig from './three-column/_three-column.twig';
import fourColumTwig from './four-column/_four-column.twig';

import layoutData from './layouts.yml';
import './layouts.js';

import { placeholder } from '@ui-paragraph/placeholder/component/placeholder.stories.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layouts/Layouts' };

const LAYOUT_REGION_GAP_OPTIONS = {
  '': '- None -',
  'layout__region--gap-sm': 'Small',
  'layout__region--gap-md': 'Medium',
  'layout__region--gap-lg': 'Large',
};

const LAYOUT_COLOR_SCHEME_OPTIONS = {
  '': '- None -',
}

// **************************************************
// ONE COLUMN LAYOUTS

const LAYOUT_ONE_COLUMN_WIDTH_OPTIONS = {
  '': '- Normal -',
};

export const oneColumn = ({ color_scheme, region_gap, width }) => {
  let paragraphClasses = [...layoutData.layout_one_column.paragraph_attributes.class, color_scheme, region_gap, width];
  let paragraphAttributes = Object.assign({}, layoutData.layout_one_column.paragraph_attributes);

  paragraphAttributes.class = paragraphClasses;

  return oneColumTwig({
    paragraph_layout_region_first: [
      placeholder({ ...layoutData.layout_one_column.paragraph_layout_region_first }),
    ].join(''),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
oneColumn.argTypes = {
  color_scheme: {
    name: 'Color Scheme',
    options: Object.keys(LAYOUT_COLOR_SCHEME_OPTIONS),
    control: {
      type: 'select',
      labels: LAYOUT_COLOR_SCHEME_OPTIONS
    }
  },
  // region_gap: {
  //   name: 'Component Margin Bottom',
  //   options: Object.keys(LAYOUT_REGION_GAP_OPTIONS),
  //   control: {
  //     type: 'select',
  //     labels: LAYOUT_REGION_GAP_OPTIONS
  //   }
  // },
  width: {
    name: 'Width',
    options: Object.keys(LAYOUT_ONE_COLUMN_WIDTH_OPTIONS),
    control: {
      type: 'select',
      labels: LAYOUT_ONE_COLUMN_WIDTH_OPTIONS
    }
  }
};
oneColumn.args = {
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

export const twoColumn = ({ column_ratio }) => {
  let paragraphClasses = [...layoutData.layout_two_column.paragraph_attributes.class, column_ratio];
  let paragraphAttributes = Object.assign({}, layoutData.layout_two_column.paragraph_attributes);

  paragraphAttributes.class = paragraphClasses;

  return twoColumTwig({
    paragraph_layout_region_first: placeholder({ ...layoutData.layout_two_column.paragraph_layout_region_first }),
    paragraph_layout_region_second: placeholder({ ...layoutData.layout_two_column.paragraph_layout_region_second }),
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

export const threeColumn = ({ column_ratio }) => {
  let paragraphClasses = [...layoutData.layout_three_column.paragraph_attributes.class, column_ratio];
  let paragraphAttributes = Object.assign({}, layoutData.layout_three_column.paragraph_attributes);

  paragraphAttributes.class = paragraphClasses;

  return threeColumTwig({
    paragraph_layout_region_first: placeholder({ ...layoutData.layout_three_column.paragraph_layout_region_first }),
    paragraph_layout_region_second: placeholder({ ...layoutData.layout_three_column.paragraph_layout_region_second }),
    paragraph_layout_region_third: placeholder({ ...layoutData.layout_three_column.paragraph_layout_region_third }),
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
  let paragraphClasses = [...layoutData.layout_four_column.paragraph_attributes.class];
  let paragraphAttributes = Object.assign({}, layoutData.layout_four_column.paragraph_attributes);

  paragraphAttributes.class = paragraphClasses;

  return fourColumTwig({
    paragraph_layout_region_first: placeholder({ ...layoutData.layout_four_column.paragraph_layout_region_first }),
    paragraph_layout_region_second: placeholder({ ...layoutData.layout_four_column.paragraph_layout_region_second }),
    paragraph_layout_region_third: placeholder({ ...layoutData.layout_four_column.paragraph_layout_region_third }),
    paragraph_layout_region_fourth: placeholder({ ...layoutData.layout_four_column.paragraph_layout_region_fourth }),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
fourColumn.argTypes = {
};
fourColumn.args = {
};
