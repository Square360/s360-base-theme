# Overview

This project requires Yarn v4. If this is your first time running yarn for this
project, you must run the following commands first.

## Creating a new entity

In your terminal run the following command
```bash
$ yarn generate
```

Select which type of entity you want to create. When prompted for a name, you can enter a "Human Readable" name. It will be converted into the proper case and format for Drupal.

## Compiling Multiple Themes

If a project requires multiple "themes" to be compiled, create a folder
called "themes" outside the "ui" folder. Inside that folder, create a top-level folder for the theme and follow the same Drupal patterns like a regular theme and the folder structure from the `ui` folder. There is no need for the `.storybook` folder.

### Vite Builds

The Vite build runner discovers JavaScript entry files in this package's `src`
directory. To compile another theme, add its entries to
`scripts/vite-build.mjs` and provide that theme's desired `dist` output path.