import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import postcssScss from 'postcss-scss';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aliases = {
  SRC_IMAGES: path.resolve(__dirname, 'src/images'),
  vendors: path.resolve(__dirname, 'vendors'),
  utils: path.resolve(__dirname, 'utils')
}

/**
 * Creates Vite entry names from matching JavaScript source files.
 *
 * @param {string} pattern Glob pattern used to find entry files.
 * @returns {Record<string, string>} Entry names mapped to absolute source paths.
 */
function getEntries(pattern) {
  const entries = {};

  for (const file of globSync(pattern, { absolute: true })) {
    let filePath = file.split(`${path.sep}src${path.sep}`)[1];

    if (filePath.includes(`templates${path.sep}`)) {
      filePath = filePath.split(`templates${path.sep}`)[1];
    }

    filePath = filePath.split(`${path.sep}component${path.sep}`).join(path.sep);

    entries[filePath.replace(/\.js$/, '')] = file;
  }

  return entries;
}

/**
 * Gets all JavaScript theme entry points.
 *
 * @returns {Record<string, string>} Entry names mapped to absolute source paths.
 */
export function getThemeEntries() {
  return getEntries(path.resolve(__dirname, 'src/**/!(_*|*.stories|*.component|*.min|*.test).js'));
}

/**
 * Prevents Vite from processing image URLs in stylesheet source files.
 *
 * @returns {import('vite').Plugin} Vite plugin.
 */
function cssUrlFilterPlugin() {
  return {
    name: 'css-url-filter',
    enforce: 'pre',
    transform(code, id) {
      if (!id.match(/\.s?css$/)) return null;
      const out = code.replace(
        /url\((['"]?)([^'")]+\.(?:gif|png|jpe?g|svg))\1\)/gi,
        'url($1$2$1)'
      );
      return { code: out, map: null };
    }
  };
}

/**
 * Provides a Vite plugin hook for handling inline font output.
 *
 * @returns {import('vite').Plugin} Vite plugin.
 */
function inlineFontsPlugin() {
  return {
    name: 'inline-fonts',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const [name, asset] of Object.entries(bundle)) {
        if (asset.type !== 'asset') continue;
        if (!/\.(woff2?)(\?.*)?$/i.test(name)) continue;
        if (!/(^|\/)(web)?fonts?\//i.test(name)) continue;
      }
    }
  };
}

/**
 * Renames emitted entry CSS assets to match their JavaScript entry name.
 *
 * @returns {import('vite').Plugin} Vite plugin.
 */
function cssOutputPathPlugin() {
  return {
    name: 'css-output-path',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) {
          continue;
        }

        const importedCss = chunk.viteMetadata?.importedCss;

        if (!importedCss) {
          continue;
        }

        for (const cssFile of importedCss) {
          const cssAsset = bundle[cssFile];

          if (!cssAsset || cssAsset.type !== 'asset') {
            continue;
          }

          cssAsset.fileName = `${chunk.name}.css`;
        }
      }
    }
  };
}

/**
 * Includes all theme images in the Vite build.
 *
 * This replaces Webpack's require.context() behavior so that
 * images which aren't explicitly imported by JavaScript/CSS are
 * still emitted to dist/images.
 *
 * @returns {import('vite').Plugin} Vite plugin.
 */
function copyThemeImagesPlugin() {
  return {
    name: 'copy-theme-images',

    generateBundle() {
      const images = globSync(
        path.resolve(__dirname, `${aliases['SRC_IMAGES']}/**/*.{gif,png,jpg,jpeg,svg}`),
        {
          ignore: [
            path.resolve(__dirname, `${aliases['SRC_IMAGES']}/icons/**/*.svg`),
          ],
        }
      );

      for (const image of images) {
        const relativePath = path.relative(
          path.resolve(__dirname, `${aliases['SRC_IMAGES']}`),
          image
        );

        this.emitFile({
          type: 'asset',
          fileName: `images/${relativePath}`,
          source: readFileSync(image),
        });
      }
    },
  };
}

function svgSpritePlugin() {
  const iconsDir = path.resolve(__dirname, 'src/images/icons');

  return {
    name: 'svg-sprite',
    generateBundle() {
      const icons = globSync(
        path.join(iconsDir, '*.svg')
      );

      const symbols = icons.map((file) => {
        const name = path.basename(file, '.svg');
        let svg = readFileSync(file, 'utf8');

        // Remove XML declaration.
        svg = svg.replace(/<\?xml[^>]*\?>\s*/i, '');

        // Extract the contents of the SVG element.
        const match = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i);

        if (!match) {
          return '';
        }

        const contents = match[1];

        // Preserve the viewBox if one exists.
        const viewBox = svg.match(/\bviewBox=["']([^"']+)["']/i);
        const viewBoxAttribute = viewBox
          ? ` viewBox="${viewBox[1]}"`
          : '';

        return `<symbol id="icon-${name}"${viewBoxAttribute}>${contents}</symbol>`;
      }).filter(Boolean);

      if (symbols.length === 0) {
        return;
      }

      const sprite = [
        '<svg xmlns="http://www.w3.org/2000/svg">',
        '<defs>',
        symbols.join('\n'),
        '</defs>',
        '</svg>',
      ].join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'images/sprite.svg',
        source: sprite,
      });
    },
  };
}

/**
 * Creates the Vite configuration for one or more theme entry points.
 *
 * @param {object} options Build configuration overrides.
 * @param {Record<string, string>} [options.entries] Entry names mapped to source paths.
 * @param {boolean} [options.emptyOutDir=true] Whether Vite clears dist before building.
 * @param {'development'|'production'} [options.mode='production'] Build mode.
 * @param {boolean} [options.watch=false] Whether to enable Rollup watch mode.
 * @returns {import('vite').UserConfig} Vite configuration object.
 */
export function createViteConfig({
  entries = getThemeEntries(),
  mode = 'production',
  watch = false
} = {}) {
  const isProduction = mode === 'production';

  return {
    mode,
    root: __dirname,
    resolve: {
      alias: {
        ...aliases,
      },
      extensions: ['.js', '.ts', '.css', '.scss']
    },

    css: {
      postcss: {
        parser: postcssScss,
        plugins: [autoprefixer({ grid: true })]
      },
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    },

    plugins: [
      cssUrlFilterPlugin(),
      inlineFontsPlugin(),
      copyThemeImagesPlugin(),
      svgSpritePlugin(),
      ViteImageOptimizer({
        exclude: /sprite\.svg$/,
        mozjpeg: { quality: 75 },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        svgo: {
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'removeEmptyAttrs', active: false }
          ]
        },
        gifsicle: { optimizationLevel: 7, interlaced: false },
        optipng: { optimizationLevel: 7 }
      }),
      cssOutputPathPlugin(),
    ],

    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: false,
      sourcemap: false,
      cssMinify: isProduction,
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        format: { comments: false },
        mangle: false
      },
      rollupOptions: {
        preserveEntrySignatures: false,
        input: entries,
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          // codeSplitting: Object.keys(entries).length !== 1,
          assetFileNames: (assetInfo) => {
            const n = assetInfo.name || '';
            if (/\.(gif|png|jpe?g|svg)$/i.test(n)) return 'images/[name][extname]';
            if (/\.(woff2?)$/i.test(n)) return 'fonts/[name][extname]';
            if (/\.css$/i.test(n)) return '[name][extname]';
            return 'assets/[name][extname]';
          },
        }
      },
      watch: watch ? {} : null,
    }
  }
}

export default defineConfig(createViteConfig());
