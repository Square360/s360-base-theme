import path from 'node:path';
import { build } from 'vite';
import { createViteConfig, getThemeEntries } from '../vite.config.mjs';
import { rm } from 'node:fs/promises';

const __dist = path.resolve(process.cwd(), 'dist');

// Empties and removes the "dist" folder.
await rm(__dist, {
  recursive: true,
  force: true,
});

// Immediately recreate it.
await mkdir(__dist, { recursive: true });

/**
 * Whether the build runner should rebuild entries when source files change.
 *
 * @type {boolean}
 */
const watch = process.argv.includes('--watch');

/**
 * Position of the optional build mode argument.
 *
 * @type {number}
 */
const modeArgument = process.argv.indexOf('--mode');

/**
 * Vite build mode selected from the command line.
 *
 * @type {string}
 */
const mode = modeArgument === -1 ? 'production' : process.argv[modeArgument + 1];

/**
 * Theme entry points to build independently.
 *
 * @type {Record<string, string>}
 */
const entries = getThemeEntries();

/**
 * Entry point names paired with their source files.
 *
 * @type {[string, string][]}
 */
const entryBuilds = Object.entries(entries);

if (!['development', 'production'].includes(mode)) {
  throw new Error(`Unsupported build mode: ${ mode }.`);
}

if (entryBuilds.length === 0) {
  throw new Error('No JavaScript entry files were found.');
}

const buildOptions = entryBuilds.map(([entryName, entryFile], index) => ({
  configFile: false,
  ...createViteConfig({
    entries: { [entryName]: entryFile },
    mode,
    watch,
  }),
}));

if (watch) {
  const watchers = await Promise.all(buildOptions.map((options) => build(options)));

  process.once('SIGINT', () => {
    watchers.forEach((watcher) => watcher.close());
  });
}
else {
  for (const options of buildOptions) {
    await build(options);
  }
}
