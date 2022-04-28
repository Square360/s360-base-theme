const path = require('path');

module.exports = async ({ config }) => {
  // Twig
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      { loader: 'twigjs-loader' },
    ],
  });

  config.resolve.alias['@base'] = path.resolve('./components/01-base');
  config.resolve.alias['@molecules'] = path.resolve('./components/02-molecules');
  config.resolve.alias['@organisms'] = path.resolve('./components/03-organisms');

  // SCSS
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      { loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      { loader: 'sass-loader',
        options: {
          implementation: require('sass'),
        },
      },
    ],
  });

  // YAML
  config.module.rules.push({
    test: /\.ya?ml$/,
    loader: 'js-yaml-loader',
  });

  return config;
};
