import { useEffect } from '@storybook/preview-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// DRUPAL JS
import './drupal.js';
import './once.global.js';

// GLOBAL CSS
import '../src/base/base.js';
import '../src/templates/site-layout/component/site-layout.js';
import '../src/templates/field/ckeditor/component/ckeditor.js';

// COLOR SCHEMES
// import color scheme js files here.

setupTwig(Twig);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  layout: 'none',
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Foundation",
        "Content Types",
        "Site Layout",
        "Layouts",
        "Layout Components",
        "Menus",
        "Media",
        "Taxonomy",
        "Components",
      ]
    }
  }
};

export const decorators = [
  (storyFn) => {
    const story = storyFn();

    useEffect(() => {
      Drupal.attachBehaviors();
    });

    return story;
  }
];

// Uncomment if you want to setup visual themes '[data-theme="theme name"]'.
/*
export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Theme Name", dataTheme: "theme-name", color: "#ffffff" },
      ],
      dataAttribute: "data-theme",
    },
  },
};
*/
