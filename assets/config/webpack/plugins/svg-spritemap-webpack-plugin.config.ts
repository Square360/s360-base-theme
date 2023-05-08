// SVG Spritemap Webpack Plugin
// @see https://github.com/cascornelissen/svg-spritemap-webpack-plugin/blob/master/docs/options.md

export const SVG_SPRITEMAP_WEBPACK_PLUGIN_CONFIG = [
  {
    patterns: [
      // 'images/icons/*.svg'
    ],
    options: {
      output: {
        filename: 'images/spritemap.svg',
      }
    }
  }
];

