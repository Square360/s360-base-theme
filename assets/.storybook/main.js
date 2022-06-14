module.exports = {
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
    '../dist/fonts',
    '../dist/images',
  ],
};
