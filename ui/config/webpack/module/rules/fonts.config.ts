export const FONT_RULES = {
  test: /\.(woff|woff2)(\?\S*)?$/,
  include: [/(web)?fonts?/],
  type: 'asset/resource',
  generator: {
    publicPath: '',
    filename: 'fonts/[name][ext]'
  }
};
