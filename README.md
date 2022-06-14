# S360 Base Theme

## Prerequisite
An existing Drupal project using Composer to manage dependencies.

## Pre Installation
Update to "repositories" section of your `composer.json` file.

```json
"repositories": [
  ...
  {
    "type": "composer",
    "url": "https://packages.square360.com"
  },
  ...
]
```

## Installation
```bash
$ composer require square360/s360_base_theme
```
**NOTE:** There is no reason to enable this theme, so DON'T!

## Setup
After this theme is installed:
```bash
$ /web/themes/contrib/s360_base_theme
$ php setup.php --theme-name "[HUMAN READABLE NAME]"
```

## Post Setup
This is optional, but recommended.
```bash
$ composer remove square360/s360_base_theme
```