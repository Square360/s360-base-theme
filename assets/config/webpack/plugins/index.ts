// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// --------------------------------------------------
// IMPORT PLUGIN CONFIGURATIONS

// import cleanWebpackPluginConfig from './clean-webpack-plugin.config';
import miniCssExtractPluginConfig from './mini-css-extract-plugin.config';
// import svgSpritemapWebpackPluginConfig from './svg-spritemap-webpack-plugin.config';

// const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

// --------------------------------------------------
// DEFINE PLUGINS

let plugins: any[] = [];

// plugins.push(new CleanWebpackPlugin(cleanWebpackPluginConfig));
plugins.push(new MiniCssExtractPlugin(miniCssExtractPluginConfig));

// if (svgSpritemapWebpackPluginConfig.length) {
//   svgSpritemapWebpackPluginConfig.forEach(svgSpritmap => {
//     plugins.push(new SVGSpritemapPlugin(svgSpritmap.patterns, svgSpritmap.options));
//   });
// }

export { plugins as WEBPACK_PLUGINS };
