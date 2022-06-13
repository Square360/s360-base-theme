# Base Folder
This folder is for HTML element ("TAG") styling only, **DO NOT** add any top-level
classes here. There are very few expections where class names are permitted, but
they CANNOT be top-level, they must be nested inside **TAG** selector.

## Expections
Inside `form/_form.scss` it's ok to add core classes for forms because all
`<form>` tags automatically gets the `.form` classname.

## TWIG Templates
All `*.twig` must begin with an underscore.

## SCSS Files
All `*.scss` must begin with an underscore, except the `index.scss` file.
