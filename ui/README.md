# Overview

This project requires Yarn v4. If this is your first time running yarn for this
project, you must run the following commands first.

```bash
$ corepack enable
```
Then
```bash
$ yarn set version stable
```
Now you can run `yarn` commands using the latest v4.

## Creating a new entity

In your terminal run the following command
```bash
$ yarn generate
```

Select which type of entity you want to create. When prompted for a name, you can enter a "Human Readable" name. It will be converted into the proper case and format for Drupal.

## Compiling Multiple Themes

If a project requires multiple "themes" to be compiled, create a folder
called "themes" outside the "ui" folder. Inside that folder, create a top-level folder for the theme and follow the same Drupal patterns like a regular theme and the folder structure from the `ui` folder. There is no need for the `.storybook` folder.

### Webpack Config

Inside the `webpack.config.js` file at the bottom you will see
```js
module.exports = [
  WEBPACK_CONFIG,
  ...
]
```
For each "theme", copy the following code and replace `{THEME_NAME}` with the theme's name.

```js
Object.assign({}, WEBPACK_CONFIG, {
  name: '{THEME_NAME}',
  entry: getEntries(path.resolve('../themes/{THEME_NAME}/ui/src/**/!(_*|*.stories|*.component|*.min|*.test).js')),
  output: {
    path: path.resolve('../themes/{THEME_NAME}/ui/dist'),
  },
}),
```