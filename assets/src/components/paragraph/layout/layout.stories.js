import oneColumTwig from './one-column/_one-column.twig';
import './one-column/one-column.js';

import twoColumTwig from './two-column/_two-column.twig';
import './two-column/two-column.js';

import threeColumTwig from './three-column/_three-column.twig';
import './three-column/three-column.js';

import fourColumTwig from './four-column/_four-column.twig';
import './four-column/four-column.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layouts/Layouts' };

export const oneColumn = () => oneColumTwig();

export const twoColumn = ({ columnRatio }) => {
  return twoColumTwig({
    column_ratio: columnRatio
  });
};

twoColumn.argTypes = {
  columnRatio: {
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

export const threeColumn = ({ columnRatio }) => {
  return threeColumTwig({
    column_ratio: columnRatio
  });
};

threeColumn.argTypes = {
  columnRatio: {
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

export const fourColumn = () => fourColumTwig();
