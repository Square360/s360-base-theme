import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

import './_drupal.js';
import '../src/base/base.js';
import '../src/layout/layout.js';

setupTwig(Twig);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'none',
};

export const decorators = [
  (storyFn) => {
    useEffect(() => Drupal.attachBehaviors(), []);
    return storyFn();
  }
];
