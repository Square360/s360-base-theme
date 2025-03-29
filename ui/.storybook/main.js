module.exports = {
  framework: {
    name: '@storybook/html-webpack5',
    options: { fastRefresh: true },
  },
  stories: [
    '../src/**/*.stories.@(js|ts)',
    '../../themes/**/src/**/*.stories.@(js|ts)'
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-css-user-preferences',

    // Uncomment if you want to enable theme switching.
    // 'storybook-addon-data-theme-switcher'
  ],
  staticDirs: [
    '../dist/',
    './fontawesome',
  ],
};
