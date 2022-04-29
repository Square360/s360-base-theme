// Resolve.extensions
// @see https://webpack.js.org/configuration/resolve/#resolveextensions

// Define a base set of extensions.
// DO NOT EDIT THIS!
const BASE_EXTENSIONS: string[] = [
  '.js',
  '.ts',
  '.css',
  '.scss',
];

// Add any additional extensions needed for the project, e.g. '.jsx'
let additionalExtensions: string[] = [
];

export default BASE_EXTENSIONS.concat(additionalExtensions);
