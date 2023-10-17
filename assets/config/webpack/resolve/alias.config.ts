const path = require('path');

// Resolve.alias
// @see https://webpack.js.org/configuration/resolve/#resolvealias

export const WEBPACK_RESOLVE_ALIAS = {
  SRC_IMAGES$: path.resolve('src/images'),
  'core': path.resolve(path.join('src', 'core')),
};
