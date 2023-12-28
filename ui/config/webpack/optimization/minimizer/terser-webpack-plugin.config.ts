// terserOptions
// @see https://github.com/terser/terser#minify-options

export const TERSER_WEBPACK_PLUGIN_CONFIG = {
  extractComments: false,
  terserOptions: {
    ecma: undefined,
    parse: {},
    compress: {},
    mangle: false,
    module: false,
  }
};
