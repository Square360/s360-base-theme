import layoutData from './layout.yml';

import oneColumTwig from './one-column/_one-column.twig';
import './one-column/one-column.js';

import twoColumTwig from './two-column/_two-column.twig';
import './two-column/two-column.js';

import threeColumTwig from './three-column/_three-column.twig';
import './three-column/three-column.js';

import fourColumTwig from './four-column/_four-column.twig';
import './four-column/four-column.js';

import { placeholder } from '../placeholder/placeholder.stories.js';
import drupalAttribute from 'drupal-attribute';

const LAYOUT_WIDTH_OPTIONS = {
  name: 'Layout width',
  options: {
    'Normal': '',
    'Edge to Edge': 'layout--width-edge-to-edge',
    'Inset': 'layout--width-inset',
  },
  control: 'select',
  defaultValue: '',
};

/**
 * Storybook Definition.
 */
export default { title: 'Layouts/Layouts' };

export const oneColumn = ({ layout_width }) => {
  let paragraphClasses = [...layoutData.layout_one_column.paragraph_attributes.class, layout_width];
  let paragraphAttributes = Object.assign({}, layoutData.layout_one_column.paragraph_attributes);

  paragraphAttributes.class = paragraphClasses;

  return oneColumTwig({
    paragraph_layout_region_content: placeholder({ ...layoutData.layout_one_column.paragraph_layout_region_content }),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
}
oneColumn.argTypes = {
  layout_width: LAYOUT_WIDTH_OPTIONS
}

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
    options: {
      '50%/50%': 'layout--50-50',
      '60%/40%': 'layout--60-40',
      '40%/60%': 'layout--40-60',
      '70%/30%': 'layout--70-30',
      '30%/70%': 'layout--30-70',
      '75%/25%': 'layout--75-25',
      '25%/75%': 'layout--25-75',
    },
    control: 'select',
    defaultValue: 'layout--50-50',
  }
}

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
    options: {
      '33%/33%/33%': 'layout--33-33-33',
      '25%/50%/25%': 'layout--25-50-25',
      '50%/25%/25%': 'layout--50-25-25',
      '25%/25%/50%': 'layout--25-25-50',
    },
    control: 'select',
    defaultValue: 'layout--33-33-33',
  }
}

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
}
