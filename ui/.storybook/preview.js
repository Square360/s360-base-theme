import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// DRUPAL JS
import './drupal.js';

// GLOBAL CSS
import '../src/base/base.js';
import '../src/templates/layout/component/layout.js';
import '../src/templates/field/ckeditor/component/ckeditor.js';

setupTwig(Twig);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'none',
  /* Uncomment if you want to enabled user prefers @media queries.
  cssUserPrefs: {
    "prefers-color-scheme": "dark",
  },
  */
};

export const decorators = [
  (storyFn) => {
    useEffect(() => Drupal.attachBehaviors(), []);
    return storyFn();
  }
];

/* Uncomment if you want to setup visual themes '[data-theme="theme name"]'.
export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Theme Name", dataTheme: "theme-name", color: "#ffffff" },
      ],
    },
  },
};
*/
