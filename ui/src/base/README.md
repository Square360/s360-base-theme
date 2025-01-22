# Base Folder
This folder is for HTML element ("TAG") styling only, **DO NOT** add any top-level
classes here. There are very few expections where class names are permitted, but
they CANNOT be top-level, they must be nested inside a **TAG** selector.

## TWIG Templates
All `*.twig` files must begin with an underscore. The templates in this folder
are purely for Storybook. Let Drupal handle the rendering of base elements.

## SCSS Files
All `*.scss` files must begin with an underscore, except the `base.scss`
"manifest" file.

## Storybook Files
Not every TAG needs a storybook file.

## Webpack Entry Point Files
`base.js` is the single entry point for this folder. No subfolders will have
entry point `*.js` files.