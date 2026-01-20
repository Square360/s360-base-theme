const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

/**
 * Create entry points based on the pattern passed.
 *
 * @param {string} pattern
 *
 * @returns {object}
 */
function getEntries(pattern) {
  let entries = {};

  glob.sync(pattern).forEach((file) => {
    let filePath = file.split('src/')[1];

    // Remove "templates/" from the file path.
    filePath = (filePath.includes('templates/')) ? filePath.split('templates/')[1] : filePath;

    // Remove "/component/" from file path and join the filePath segments.
    filePath = (filePath.includes('/component/')) ? filePath.split('/component/').join('/') : filePath;

    entries[`${ filePath.replace('.js', '') }`] = file;
  });

  return entries;
}

const WEBPACK_CONFIG = {
  /**
   * Application entry files for building.
   *
   * @type {Object}
   */
  entry: getEntries(path.resolve('src/**/!(_*|*.stories|*.component|*.min|*.test).js')),

  /**
   * Output settings for application scripts.
   *
   * @type {Object}
   *
   * @see {@link https://webpack.js.org/configuration/output}
   */
  output: {
    path: path.resolve(`${ __dirname }/dist`),
    clean: true,
    pathinfo: false,
  },

  /**
   * Build rules to handle application assset files.
   *
   * @type {Object}
   */
  module: {
    rules: [/* See below for configutation */]
  },

  /**
   * Custom modules resolving settings.
   *
   * @type {Object}
   *
   * @see {@link https://webpack.js.org/configuration/resolve}
   */
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.css',
      '.scss',
    ],
    alias: {
      SRC_IMAGES$: path.resolve('src/images'),
      vendors: path.resolve('vendors'),
      utils: path.resolve('utils'),
    }
  },

  /**
   * Custom minimizer settings.
   *
   * @type {Object}
   *
   * @see {@link https://webpack.js.org/configuration/optimization}
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin}
   * @see {@link https://github.com/webpack-contrib/css-minimizer-webpack-plugin}
   */
  optimization: {
    moduleIds: 'named',
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: false,
          module: false,
        }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }
      })
    ]
  },

  /**
   * Common plugins which should run on every build.
   *
   * @type {Array}
   *
   * @see {@link https://webpack.js.org/configuration/plugins}
   */
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SpriteLoaderPlugin(),
  ],

  /**
   * Show bundle information for the application.
   *
   * @type {Object}
   *
   * @see {@link https://webpack.js.org/configuration/stats}
   */
  stats: {
    errorDetails: true,
    children: false,
    usedExports: false,
    modules: false,
    entrypoints: false,
    excludeAssets: [/\.*\.map/],
    modulesSpace: Infinity,
  },
};

/**
 * Build rule to handle style files.
 *
 * @type {Object}
 */
WEBPACK_CONFIG.module.rules.push({
  test: /\.s?[a?c]ss/i,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader',
      options: {
        url: {
          filter: (url, resourcePath) => {
            if (/\.(gif|png|jpe?g|svg)/.test(url)) {
              return false;
            }

            return true;
          }
        }
      }
    },
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
        implementation: require('sass'),
        sassOptions: {
          // Silence deprecation warnings.
          // quietDeps: true
        }
      }
    }
  ]
});

/**
 * Build rule to handle font files.
 *
 * @type {Object}
 */
WEBPACK_CONFIG.module.rules.push({
  test: /\.(woff|woff2)(\?\S*)?$/,
  include: [/(web)?fonts?/],
  type: 'asset/inline',
});

/**
 * Build rule to handle image files.
 *
 * @type {Object}
 */
WEBPACK_CONFIG.module.rules.push({
  test: /\.(gif|png|jpe?g|svg)$/,
  exclude: path.resolve('src/images/icons'),
  include: path.resolve('src/images'),
  use: [
    { loader: 'file-loader',
      options: {
        context: path.resolve('src/images'),
        name: 'images/[name].[ext]'
      }
    },
    { loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          quality: 75
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        },
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7,
          interlaced: false
        }
      }
    }
  ]
});

/**
 * Build rule to handle SVGs files only.
 *
 * @type {Object}
 */
WEBPACK_CONFIG.module.rules.push({
  test: /\.(svg)$/,
  include: path.resolve('src/images/icons'),
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: 'images/icons.svg',
      },
    }
  ]
});

/**
 * Build rule to handle script files.
 *
 * @type {Object}
 */
WEBPACK_CONFIG.module.rules.push({
  test: /^(?!.*\.(stories|component)\.(js|ts)$).*\.(js|ts)$/,
  use: [
    { loader: 'babel-loader' }
  ],
  exclude: /node_modules/
});

module.exports = [
  WEBPACK_CONFIG,
];

// If using multiple themes copy this into "module.exports" and replace
// [THEME_NAME] with the name of the theme.
// Object.assign({}, WEBPACK_CONFIG, {
//   name: '[THEME_NAME]',
//   entry: getEntries(path.resolve("../../[THEME_NAME]/ui/src/**/!(_*|*.stories|*.component|*.min|*.test).js")),
//   output: {
//     path: path.resolve('../../[THEME_NAME]/ui/dist'),
//     clean: true,
//   },
// }),
