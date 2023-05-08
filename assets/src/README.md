# SRC Folder
The `base`, `components` and `layout` folders are loosely based on Drupals
[CSS file organzation](https://www.drupal.org/node/1887922). See the `README.md`
file inside each subfolder for more details.

## File and Folder Naming
All filenames and folders must be hyphenated and lowercase (Kebab Case). No
undercores between words. All filenames, regardless of extension should match
the name of it's parent folder, if applicable.

### Example
```
/custom-widget
  custom-widget.twig
  custom-widget.scss
  custom-widget.js
  custom-widget.stories.js
  custom-widget.yml
```
**NOTE:** Not every component will use all these file types.

## TWIG Templates
Any `*.twig` file that begins with an underscore is considered private and
should **NEVER** be used inside the Drupal `templates` folder. All variables and
blocks must be underscored and lowercase and must be prefixed with the component
name or TAG.

### Example
Filename: custom-widget.twig
```html
<div class="custom-widget">
  <h1 class="custom-widget__title">{{ custom_widget_title }}</h1>
</div>
```
_`custom_widget_title` is the variable_

## SCSS Files
Any `*.scss` file that begins with an underscore is considered a partial and
should be consumed by the "manifest" file in it's parent's folder, if applicable.
Each `*.scss` file cannot not have more than **one top level selector**.

### BEM
All class based styles (not TAGs) must use [BEM](http://getbem.com/) -
 Block Element Modifier methodology.

#### Example
Filename: custom-widget.scss
```scss
.custom-widget {
  .custom-widget__element { }
  .custom-widget--modifier { }
  .custom-widget__element--modifier { }
}
```
_`.custom-widget` is the block_

### Dart Sass Compilar
The `@import` rule is depreciated and MUST NOT be used! The following are the
new rules to use:
- [@use](https://sass-lang.com/documentation/at-rules/use)
- [@forward](https://sass-lang.com/documentation/at-rules/forward)

## Storybook Files
Creates a story that captures the rendered state of a UI component. Filename
format: `[FILENAME].stories.js`.

### Example
Filename: custom-widget.stories.js
```js
import customWidgetTwig from './custom-widget.twig';
...
export const customWidget = () => {
  return customWidgetTwig();
}
```

## Webpack Entry Point Files
Compiles a single, isolated component. Filename format: `[FILENAME].js`. The
files created from this are to be used inside the Drupal `*.libraries.yml` file.
### Example
src directory
```
/src/components/custom-widget
  /custom-widget.js
  /custom-widget.scss
```
Filename: custom-widget.js
```js
import "./custom-widget.scss
```
dist directory
```
/dist/components/custom-widget
  /custom-widget.js
  /custom-widget.css
```

The `*.scss` file for each entry point must contain the following:
```scss
@use "core/site-config";
@use "s360-toolkit";
```
