// file-loader
// @see https://webpack.js.org/loaders/file-loader/#options
//
// image-webpack-loader
// @see https://github.com/tcoopman/image-webpack-loader#usage

const path = require('path');

export default {
  test: /\.(gif|png|jpe?g|svg)$/,
  include: path.resolve('src/images'),
  exclude: path.resolve('src/images/icons'),
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
};
