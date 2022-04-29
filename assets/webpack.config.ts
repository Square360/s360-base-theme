import * as path from 'path';
import * as glob from 'glob';
import * as webpack from 'webpack';


import {
  WEBPACK_MODULE_RULES,
  WEBPACK_OPTIMIZATION_MINIMIZER,
  WEBPACK_RESOLVE_EXTENSIONS,
  WEBPACK_RESOLVE_ALIAS,
  WEBPACK_STATS,
  WEBPACK_PLUGINS
} from './config/webpack';


function getEntries(pattern: string) {
  let entries: any = {};

  glob.sync(pattern).forEach((file: string) => {
    const filePath = file.split('components/')[1];
    const newfilePath = `${ filePath.replace('.js', '') }`;
    entries[newfilePath] = file;
  });

  return entries;
}

const WEBPACK_CONFIG: webpack.Configuration = {
  target: 'node',
  entry: getEntries(path.resolve('components/**/!(*.stories|*.component|*.min|*.test).js')),
  module: {
    rules: WEBPACK_MODULE_RULES
  },
  optimization: {
    moduleIds: 'named',
    minimizer: WEBPACK_OPTIMIZATION_MINIMIZER
  },
  plugins: WEBPACK_PLUGINS,
  output: {
    path: path.resolve(`${ __dirname }/dist`),
  },
  stats: WEBPACK_STATS,
  resolve: {
    extensions: WEBPACK_RESOLVE_EXTENSIONS,
    alias: WEBPACK_RESOLVE_ALIAS
  }
};

module.exports = (env, argv) => {
  // WEBPACK_CONFIG.devtool = (argv.mode == 'production') ? false : 'source-map';

  return WEBPACK_CONFIG;
}
