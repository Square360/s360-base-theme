const path = require('path');

// Resolve.alias
// @see https://webpack.js.org/configuration/resolve/#resolvealias

// Add custom aliases needed for the project.
let customAliases = {
};

// Define a base set of aliases.
const BASE_ALIASES = {
  SRC_IMAGES$: path.resolve('src/images'),
  's360-toolkit': path.resolve(path.join('node_modules', 's360-fundamental-toolkit', 'scss')),
  'core': path.resolve(path.join('src', 'core')),
};

export default {
  ...BASE_ALIASES,
  ...customAliases
};
