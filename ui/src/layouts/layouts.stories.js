import accordionTwig from './accordion/_accordion.twig';
import oneColumTwig from './one-column/_one-column.twig';
import twoColumTwig from './two-column/_two-column.twig';
import threeColumTwig from './three-column/_three-column.twig';
import fourColumTwig from './four-column/_four-column.twig';

import './layouts.js';

import { colorSchemeControl } from '.storybook/utils';

import { placeholder } from '@ui-paragraph/placeholder/component/paragraph.placeholder.stories.js';
import { htmlContent } from '@ui-paragraph/html-content/component/paragraph.html-content.stories.js';

import drupalAttribute from 'drupal-attribute';

/**
 * Storybook Definition.
 */
export default { title: 'Layouts/Layouts' };

// **************************************************
// ONE COLUMN LAYOUT

const ONE_COLUMN_WIDTH_OPTIONS = {
};

export const oneColumn = (args) => {
  let data = Object.assign({}, args);
  let { color_scheme, column_width } = args;
  let paragraphAttributes = Object.assign({});

  paragraphAttributes['class'] = [];

  if (color_scheme) {
    paragraphAttributes['data-color-scheme'] = color_scheme;
  }

  if (column_width) {
    paragraphAttributes['class'].push(column_width);
  }

  return oneColumTwig({
    paragraph_layout_region_first: [
      '<h1>Heading</h1>',
      placeholder(),
      htmlContent(),
    ],
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};

oneColumn.argTypes = {
  color_scheme: {
    name: 'Color Scheme',
    ...colorSchemeControl,
  },
  column_width: {
    name: 'Width',
    options: Object.keys(ONE_COLUMN_WIDTH_OPTIONS),
    control: {
      type: 'select',
      labels: ONE_COLUMN_WIDTH_OPTIONS
    }
  }
};
oneColumn.args = {
  color_scheme: '',
  column_width: ''
};

// **************************************************
// TWO COLUMN LAYOUT

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
  let column_ratio = args.column_ratio ?? 'layout--50-50';
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
// THREE COLUMN LAYOUT

const LAYOUT_THREE_COLUMN_RATIO_OPTIONS = {
  'layout--33-33-33': '33%/33%/33%',
  'layout--25-50-25': '25%/50%/25%',
  'layout--50-25-25': '50%/25%/25%',
  'layout--25-25-50': '25%/25%/50%',
};

export const threeColumn = (args) => {
  let column_ratio = args.column_ratio ?? 'layout--33-33-33';
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
// FOUR COLUMN LAYOUT

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

// **************************************************
// ACCORDION LAYOUT

export const accordionColumn = () => {
  let paragraphAttributes = Object.assign({});

  return accordionTwig({
    paragraph_layout_header: 'Accordion',
    paragraph_layout_region_first: placeholder(),
    attributes: new drupalAttribute(Object.entries(paragraphAttributes)),
  });
};
accordionColumn.argTypes = {
};
accordionColumn.args = {
};
