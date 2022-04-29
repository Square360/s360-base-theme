// TerserWebpackPlugin
// @see https://webpack.js.org/plugins/terser-webpack-plugin/#options
//
// terserOptions
// @see https://github.com/terser/terser#minify-options

export default {
  extractComments: false,
  terserOptions: {
    ecma: undefined,
    parse: {},
    compress: {},
    mangle: false,
    module: false,
  }
};
