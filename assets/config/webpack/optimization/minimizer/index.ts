import cssMinimizerWebpackPluginConfig from './css-minimizer-webpack-plugin.config';
import terserWebpackPluginConfig from './terser-webpack-plugin.config';

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

let minimizer: any[] = [];

minimizer.push(new TerserPlugin(terserWebpackPluginConfig));
minimizer.push(new CssMinimizerPlugin(cssMinimizerWebpackPluginConfig));

export { minimizer as WEBPACK_OPTIMIZATION_MINIMIZER };
