module.exports = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
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
