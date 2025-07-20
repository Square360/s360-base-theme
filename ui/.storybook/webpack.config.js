const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['.storybook'] = path.resolve('.storybook');
  config.resolve.alias['@ui-base'] = path.resolve(path.join('src', 'base'));
  config.resolve.alias['@ui-layouts'] = path.resolve(path.join('src', 'layouts'));
  config.resolve.alias['SRC_IMAGES'] = path.resolve(path.join('src', 'images'));

  config.resolve.alias['@ui-component'] = path.resolve(path.join('src', 'component'));
  config.resolve.alias['@ui-block'] = path.resolve(path.join('src', 'templates', 'block'));
  config.resolve.alias['@ui-site-layout'] = path.resolve(path.join('src', 'templates', 'site-layout'));
  config.resolve.alias['@ui-field'] = path.resolve(path.join('src', 'templates', 'field'));
  config.resolve.alias['@ui-form'] = path.resolve(path.join('src', 'templates', 'form'));
  config.resolve.alias['@ui-media'] = path.resolve(path.join('src', 'templates', 'media'));
  config.resolve.alias['@ui-navigation'] = path.resolve(path.join('src', 'templates', 'navigation'));
  config.resolve.alias['@ui-node'] = path.resolve(path.join('src', 'templates', 'node'));
  config.resolve.alias['@ui-paragraph'] = path.resolve(path.join('src', 'templates', 'paragraph'));
  config.resolve.alias['@ui-views'] = path.resolve(path.join('src', 'templates', 'views'));

  // Twig
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      { loader: 'twigjs-loader' },
    ],
  });

  // SASS, SCSS, or CSS
  config.module.rules.push({
    test: /\.s?[a?c]ss$/i,
    use: [
      'style-loader',
      { loader: 'css-loader',
        options: {
          sourceMap: true,
          url: {
            filter(url, resourcePath) {
              if (/\.(gif|png|jpe?g|svg)/.test(url)) {
                return false;
              }

              return true;
            }
          }
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
          sassOptions: {
            // Silence deprecation warnings.
            quietDeps: true
          }
        },
      },
    ],
  });

  // YAML or YML
  config.module.rules.push({
    test: /\.ya?ml$/,
    loader: 'js-yaml-loader',
  });

  return config;
};
