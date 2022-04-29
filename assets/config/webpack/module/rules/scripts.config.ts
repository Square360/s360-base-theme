export default {
  test: /^(?!.*\.(stories|component)\.(js|ts)$).*\.(js|ts)$/,
  use: [
    { loader: 'babel-loader' }
  ],
  exclude: /node_modules/
};
