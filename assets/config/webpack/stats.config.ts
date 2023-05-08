// Stats
// @see https://webpack.js.org/configuration/stats/#stats-options

export const WEBPACK_STATS = {
  errorDetails: true,
  assetsSort: '!size',
  children: false,
  usedExports: false,
  modules: false,
  entrypoints: false,
  excludeAssets: [/\.*\.map/],
  assetsSpace: Infinity,
  modulesSpace: Infinity,
};
