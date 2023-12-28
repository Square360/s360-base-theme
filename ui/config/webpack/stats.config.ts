// Stats
// @see https://webpack.js.org/configuration/stats/#stats-options

export const WEBPACK_STATS = {
  errorDetails: true,
  uiSort: '!size',
  children: false,
  usedExports: false,
  modules: false,
  entrypoints: false,
  excludeAssets: [/\.*\.map/],
  uiSpace: Infinity,
  modulesSpace: Infinity,
};
