const path = require('path');

// Resolve.alias
// @see https://webpack.js.org/configuration/resolve/#resolvealias

// Add custom aliases needed for the project.
let customAliases = {
};

// Define a base set of aliases.
const BASE_ALIASES = {
  SRC_IMAGES$: path.resolve('src/images'),
};

export default {
  ...BASE_ALIASES,
  ...customAliases
};
