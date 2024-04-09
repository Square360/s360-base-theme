module.exports = {
  framework: {
    name: '@storybook/html-webpack5',
    options: { fastRefresh: true },
  },
  stories: [
    '../src/**/*.stories.@(js|ts)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // Uncomment if you want to enabled user prefers @media queries.
    // 'storybook-addon-css-user-preferences',
    // Uncomment if you want to setup visual themes '[data-theme="*"]'.
    // 'storybook-addon-data-theme-switcher'
  ],
  staticDirs: [
    '../dist/',
    './fontawesome',
  ],
};
