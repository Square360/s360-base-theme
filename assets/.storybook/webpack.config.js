const path = require('path');

module.exports = async ({ config }) => {
  // Twig
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      { loader: 'twigjs-loader' },
    ],
  });

  config.resolve.alias['@core'] = path.resolve('./src/core');
  config.resolve.alias['@base'] = path.resolve('./src/base');
  config.resolve.alias['@layout'] = path.resolve('./src/layout');
  config.resolve.alias['@components'] = path.resolve('./src/components');

  config.resolve.alias['s360-toolkit'] = path.resolve(path.join('node_modules', 's360-fundamental-toolkit', 'scss'));

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
