import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// DRUPAL JS
import './_drupal.js';

// GLOBAL CSS
import '../src/base/base.js';
import '../src/layout/layout.js';
import '../src/components/field/ckeditor/ckeditor.js';

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
