import { glob } from 'glob';
import { Configuration as WebpackConfiguration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { FONT_RULES, IMAGE_RULES, SCRIPT_RULES, STYLE_RULES } from './config/webpack/module/rules';
import { WEBPACK_STATS } from './config/webpack/stats.config';
import { WEBPACK_RESOLVE_ALIAS, WEBPACK_RESOLVE_EXTENSIONS } from './config/webpack/resolve';
import { TERSER_WEBPACK_PLUGIN_CONFIG, CSS_MINIMIZER_WEBPACK_PLUGIN_CONFIG } from './config/webpack/optimization/minimizer';
import { CLEAN_WEBPACK_PLUGIN_CONFIG, MINI_CSS_EXTRACT_PLUGIN_CONFIG, SVG_SPRITEMAP_WEBPACK_PLUGIN_CONFIG } from './config/webpack/plugins';

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

function getEntries(pattern: string) {
  let entries: any = {};

  glob.sync(pattern).forEach((file: string) => {
    if (!file.includes('src/vendors')) {
      const FILE_PATH = file.split('src/')[1];
      const NEW_FILE_PATH = `${ FILE_PATH.replace('.js', '') }`;
      entries[NEW_FILE_PATH] = file;
    }
  });

  return entries;
}

const WEBPACK_CONFIG: WebpackConfiguration = {
  target: 'node',
  entry: getEntries(path.resolve('src/**/!(_*|*.stories|*.component|*.min|*.test).js')),
  module: {
    rules: [
      FONT_RULES,
      IMAGE_RULES,
      SCRIPT_RULES,
      STYLE_RULES
    ]
  },
  optimization: {
    moduleIds: 'named',
    minimizer: [
      new TerserPlugin(TERSER_WEBPACK_PLUGIN_CONFIG),
      new CssMinimizerPlugin(CSS_MINIMIZER_WEBPACK_PLUGIN_CONFIG)
    ]
  },
  plugins: [
    new CleanWebpackPlugin(CLEAN_WEBPACK_PLUGIN_CONFIG),
    new MiniCssExtractPlugin(MINI_CSS_EXTRACT_PLUGIN_CONFIG),
  ],
  output: {
    path: path.resolve(`${ __dirname }/dist`),
  },
  stats: WEBPACK_STATS,
  resolve: {
    extensions: WEBPACK_RESOLVE_EXTENSIONS,
    alias: WEBPACK_RESOLVE_ALIAS
  }
};

// **************************************************
// Webpack configurations that changed based on a set
// of conditionals.

module.exports = (env, argv) => {
  if (SVG_SPRITEMAP_WEBPACK_PLUGIN_CONFIG.length) {
    SVG_SPRITEMAP_WEBPACK_PLUGIN_CONFIG.forEach(svgSpritmap => {
      if (svgSpritmap.patterns.length) {
        WEBPACK_CONFIG.plugins?.push(new SVGSpritemapPlugin(svgSpritmap.patterns, svgSpritmap.options));
      }
    });
  }

  // WEBPACK_CONFIG.devtool = (argv.mode == 'production') ? false : 'source-map';

  return WEBPACK_CONFIG;
}
