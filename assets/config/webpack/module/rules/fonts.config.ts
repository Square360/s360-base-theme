export default {
  test: /\.(woff|woff2)(\?\S*)?$/,
  include: [/(web)?fonts?/],
  use: [
    { loader: 'file-loader',
      options: {
        publicPath: '../',
        name: 'fonts/[name].[ext]'
      }
    }
  ]
};
