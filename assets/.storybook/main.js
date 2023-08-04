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
  ],
  staticDirs: [
    '../dist/',
    // Uncomment if you're using FontAwesome in your theme.
    // '../../../../../libraries/fontawesome/js',
  ],
};
