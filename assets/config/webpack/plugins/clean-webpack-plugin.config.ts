// Clean plugin for webpack
// @see https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional

let cleanWebpackPluginConfig = {
  cleanAfterEveryBuildPatterns: [
    '!fonts/**/*',
    'images/**/*',
  ],
};

export { cleanWebpackPluginConfig as PLUGIN_CLEAN_WEBPACK_CONFIG };
