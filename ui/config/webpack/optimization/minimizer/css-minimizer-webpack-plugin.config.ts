// minimizerOptions
// @see https://cssnano.co/docs/optimisations/

export const CSS_MINIMIZER_WEBPACK_PLUGIN_CONFIG = {
  minimizerOptions: {
    preset: [
      'default',
      {
        discardComments: { removeAll: true },
      },
    ],
  },
};
