// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import { BannerPlugin } from 'webpack';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// // --------------------------------------------------
// // IMPORT PLUGIN CONFIGURATIONS

// import bannerPluginConfig from './banner-plugin.config';
// import cleanWebpackPluginConfig from './clean-webpack-plugin.config';
import miniCssExtractPluginConfig from './mini-css-extract-plugin.config';
// import svgSpritemapWebpackPluginConfig from './svg-spritemap-webpack-plugin.config';

// const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

// --------------------------------------------------
// DEFINE PLUGINS

let plugins: any[] = [];

// plugins.push(new BannerPlugin(bannerPluginConfig));
// plugins.push(new CleanWebpackPlugin(cleanWebpackPluginConfig));
plugins.push(new MiniCssExtractPlugin(miniCssExtractPluginConfig));

// if (svgSpritemapWebpackPluginConfig.length) {
//   svgSpritemapWebpackPluginConfig.forEach(svgSpritmap => {
//     plugins.push(new SVGSpritemapPlugin(svgSpritmap.patterns, svgSpritmap.options));
//   });
// }

export { plugins as WEBPACK_PLUGINS };
