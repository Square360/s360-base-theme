import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// GLOBAL CSS
import '../src/base/base.scss';
import '../src/layout/layout.scss';

// DRUPAL JS
import './_drupal.js';

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
