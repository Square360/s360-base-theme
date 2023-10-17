const path = require('path');

module.exports = async ({ config }) => {
  // Twig
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      { loader: 'twigjs-loader' },
    ],
  });

  config.resolve.alias['@base'] = path.resolve(path.join('src', 'base'));
  config.resolve.alias['@ui-layout'] = path.resolve(path.join('src', 'layout'));
  config.resolve.alias['@ui-field'] = path.resolve(path.join('src', 'components', 'field'));
  config.resolve.alias['@ui-form'] = path.resolve(path.join('src', 'components', 'form'));
  config.resolve.alias['@ui-media'] = path.resolve(path.join('src', 'components', 'media'));
  config.resolve.alias['@ui-navigation'] = path.resolve(path.join('src', 'components', 'navigation'));
  config.resolve.alias['@ui-node'] = path.resolve(path.join('src', 'components', 'node'));
  config.resolve.alias['@ui-paragraph'] = path.resolve(path.join('src', 'components', 'paragraph'));
  config.resolve.alias['@ui-views'] = path.resolve(path.join('src', 'components', 'views'));

  config.resolve.alias['core'] = path.resolve(path.join('src', 'core'));
  config.resolve.alias['SRC_IMAGES'] = path.resolve(path.join('src', 'images'));

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
      { loader: 'postcss-loader',
        options: {
          postcssOptions: {
            parser: 'postcss-scss',
            plugins: [
              require('autoprefixer')({
                grid: true
              })
            ]
          }
        }
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
