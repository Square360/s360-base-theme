// SVG Spritemap Webpack Plugin
// @see https://github.com/cascornelissen/svg-spritemap-webpack-plugin/blob/master/docs/options.md

let svgSpritemapWebpackPluginConfig = [
  {
    patterns: [
      'images/icons/*.svg'
    ],
    options: {
      output: {
        filename: 'images/spritemap.svg',
      }
    }
  }
];

export default svgSpritemapWebpackPluginConfig;
