export default {
  framework: {
    name: "@storybook/html-vite",
    options: { fastRefresh: true },
  },
  stories: [
    '../src/**/*.stories.@(js|ts)',
    // Uncomment if using multiple themes.
    // '../../../[THEME_NAME]/src/**/*.stories.@(js|ts)'
  ],
  addons: [
    "@storybook/addon-a11y",

    // Uncomment if you want to enable theme switching.
    // "storybook-addon-data-theme-switcher",
  ],
  staticDirs: [
    '../../',
    '../dist/',
    './fontawesome',
    './images',
  ],
  viteFinal: async (config) => {
    const [{ mergeConfig }, { createStorybookViteConfig }] = await Promise.all([
      import('vite'),
      import('./vite.config.mjs'),
    ]);

    return mergeConfig(config, createStorybookViteConfig());
  },
};
