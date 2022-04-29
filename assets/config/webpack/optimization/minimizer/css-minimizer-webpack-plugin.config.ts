// CssMinimizerWebpackPlugin
// @see https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#options
//
// minimizerOptions
// @see https://cssnano.co/docs/optimisations/

export default {
  minimizerOptions: {
    preset: [
      'default',
      {
        discardComments: { removeAll: true },
      },
    ],
  },
};
