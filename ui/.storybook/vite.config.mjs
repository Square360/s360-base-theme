import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import postcssScss from 'postcss-scss';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uiRoot = path.resolve(__dirname, '..');
const twigAliases = {
  '@ui-base': path.resolve(uiRoot, 'src/base'),
  '@ui-layouts': path.resolve(uiRoot, 'src/layouts'),
  '@ui-component': path.resolve(uiRoot, 'src/component'),
  '@ui-block': path.resolve(uiRoot, 'src/templates/block'),
  '@ui-site-layout': path.resolve(uiRoot, 'src/templates/site-layout'),
  '@ui-field': path.resolve(uiRoot, 'src/templates/field'),
  '@ui-form': path.resolve(uiRoot, 'src/templates/form'),
  '@ui-media': path.resolve(uiRoot, 'src/templates/media'),
  '@ui-navigation': path.resolve(uiRoot, 'src/templates/navigation'),
  '@ui-node': path.resolve(uiRoot, 'src/templates/node'),
  '@ui-paragraph': path.resolve(uiRoot, 'src/templates/paragraph'),
  '@ui-views': path.resolve(uiRoot, 'src/templates/views'),
};

/**
 * Converts an absolute Twig file path to its configured template alias.
 *
 * @param {string} filePath Absolute Twig file path.
 * @returns {string} Canonical Twig template identifier.
 */
function getTwigTemplateId(filePath) {
  for (const [alias, directory] of Object.entries(twigAliases)) {
    const relativePath = path.relative(directory, filePath);

    if (!relativePath.startsWith('..') && !path.isAbsolute(relativePath)) {
      return `${ alias }/${ relativePath.split(path.sep).join('/') }`;
    }
  }

  return filePath;
}

/**
 * Finds statically referenced Twig templates for inheritance and includes.
 *
 * @param {string} source Twig template source.
 * @returns {string[]} Referenced Twig module specifiers.
 */
function getTwigDependencies(source) {
  const dependencies = new Set();
  const dependencyPattern = /\{%\s*(?:extends|include|embed|import|use)\s+['"]([^'"]+\.twig)['"]/g;

  for (const match of source.matchAll(dependencyPattern)) {
    dependencies.add(match[1]);
  }

  return [...dependencies];
}

/**
 * Converts imported Twig files into callable Twig template functions.
 *
 * @returns {import('vite').Plugin} Vite transform plugin.
 */
function twigPlugin() {
  return {
    name: 'storybook-twig',
    transform(source, id) {
      if (!id.endsWith('.twig')) {
        return null;
      }

      const templateId = getTwigTemplateId(id);
      const imports = getTwigDependencies(source)
        .map((dependency) => `import ${ JSON.stringify(dependency) };`)
        .join('\n');

      return {
        code: `${ imports }\nimport Twig from 'twig';\nconst template = Twig.twig({ id: ${ JSON.stringify(templateId) }, data: ${ JSON.stringify(source) }, allowInlineIncludes: true });\nexport default (data = {}) => template.render(data);`,
        map: null,
      };
    },
  };
}

/**
 * Converts imported YAML files into JavaScript data objects.
 *
 * @returns {import('vite').Plugin} Vite transform plugin.
 */
function yamlPlugin() {
  return {
    name: 'storybook-yaml',
    transform(source, id) {
      if (!/\.ya?ml$/.test(id)) {
        return null;
      }

      const yamlData = source.trim()
        ? `load(${ JSON.stringify(source) })`
        : '{}';

      return {
        code: `import { load } from 'js-yaml'; export default ${ yamlData };`,
        map: null,
      };
    },
  };
}

/**
 * Applies the former Storybook webpack aliases and asset transforms to Vite.
 *
 * @returns {import('vite').UserConfig} Storybook Vite configuration.
 */
export function createStorybookViteConfig() {
  return {
    root: uiRoot,
    resolve: {
      alias: {
        '.storybook': __dirname,
        utils: path.resolve(uiRoot, 'utils'),
        SRC_IMAGES: path.resolve(uiRoot, 'src/images'),
        ...twigAliases,
      },
    },
    optimizeDeps: {
      include: [
        'twig',
        'twig-drupal-filters',
        'add-attributes-twig-extension',
        'drupal-twig-extensions/twig',
      ],
    },
    css: {
      postcss: {
        parser: postcssScss,
        plugins: [autoprefixer({ grid: true })],
      },
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
    plugins: [twigPlugin(), yamlPlugin()],
  };
}

export default defineConfig(createStorybookViteConfig());
