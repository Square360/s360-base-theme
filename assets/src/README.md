# SRC Folder
These folders are loosely based on Drupals [CSS file organzation](https://www.drupal.org/node/1887922). See the `README.md` file inside each folder for more details.

## File Naming
All files must be hyphenated and lower case (Kebab Case). No undercores between
words. All names, regardless of extension should match the name of it's parent
folder, if applicable.

## TWIG Templates
Any `*.twig` file that begins with an underscore `_` is considered private and
should **NEVER** be used inside the Drupal theme.

## SCSS Files
Most `*.scss` files are considered partials, so they should begin with an
underscore `_`. Each top-level folder should contain an `index.scss`
("manifest") file that consumes all the partial `*.scss` files.
We use **Dart Sass** to compile `*.scss` files, please look at the following rules
for more information:

* [@use](https://sass-lang.com/documentation/at-rules/use)
* [@forward](https://sass-lang.com/documentation/at-rules/forward)

### Exceptions
Most if not all `.scss` files inside the components folder **DO NOT** follow
these rules. Look at the `README.md` in that folder for more details.
