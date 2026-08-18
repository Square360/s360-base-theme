import { useEffect } from 'storybook/preview-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';

// DRUPAL JS
import './drupal.js';
import './once.global.js';

// GLOBAL CSS
import '@ui-base/base.js';
import '@ui-field/ckeditor/component/ckeditor.js';

// COLOR SCHEMES
// import color scheme js files here.

setupTwig(Twig);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disabled: true },
  layout: 'none',
  a11y: {
    config: {
      rules: [
        // Disabled alt text checking.
        {
          id: 'image-alt',
          enabled: false,
        },
      ],
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Foundation",
        "Content Types",
        "Site Layout",
        "Layouts",
        "Layout Components",
        "Navigation",
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

export const initialGlobals = {
  // Uncomment if you want to setup color-scheme '[data-color-scheme="theme name"]'.
  // dataThemes: {
  //   list: [
  //     { name: "Theme Name", dataTheme: "theme-name", color: "#ffffff" },
  //   ],
  //   dataAttribute: "data-color-scheme",
  // },
};
