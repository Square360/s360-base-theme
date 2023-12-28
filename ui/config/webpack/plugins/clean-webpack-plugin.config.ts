// Clean plugin for webpack
// @see https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional

export const CLEAN_WEBPACK_PLUGIN_CONFIG = {
  cleanAfterEveryBuildPatterns: [
    '!fonts/**/*',
    'images/**/*',
  ],
};
