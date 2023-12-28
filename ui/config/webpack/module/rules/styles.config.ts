// css-loader
// @see https://webpack.js.org/loaders/css-loader/#options
//
// postcss-loader
// @see https://webpack.js.org/loaders/postcss-loader/#options
//
// sass-loader
// @see https://webpack.js.org/loaders/sass-loader/#options

export const STYLE_RULES = {
  test: /\.s[ac]ss$/i,
  use: [
    { loader: require('mini-css-extract-plugin').loader },
    { loader: 'css-loader' },
    { loader: 'postcss-loader',
      options: {
        postcssOptions: {
          parser: 'postcss-scss',
          plugins: [
            require('autoprefixer')({
              grid: true
            })
          ]
        }
      }
    },
    { loader: 'sass-loader',
      options: {
        // Use dart-sass.
        implementation: require('sass')
      }
    }
  ]
};
