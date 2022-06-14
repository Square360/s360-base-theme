# Components


## File and Folder Naming
For any Drupal entity; `node`, `paragraph`, `field`, `menu`, `view`, etc the
filename should be Drupal's machine name. Just remember to make sure you use
hyphens, not underscores.

**NOTE:** The are some caveats to this rule for the storybook files.

## TWIG Templates
For any `node` and `paragraph` template variables that represent fields inside
the Drupal CMS should be prefixed with `_field`. This helps everyone understand
what is coming from Drupal vs a custom preprocess.

### Example
```
{{ node_field_label }}
{{ paragraph_field_title }}
```

## SCSS Files
The top level selector might not always match the filename.

### Exmaple
Filename: node/page/page.scss
```scss
...
.node--page { }
```

## Storybook Files
Typically Drupal nodes will have "teasers" and these storybook files need to be
represented in a different `*.stories.js` file. To closely match naming
convention, the following format is recommended: `[FILENAME]-teasers.stories.js`

### Example
Directory: node/page
```
/page-teasers.stories.js
/page.stories.js
```

## Webpack Entry Point Files
Each component MUST have an every point file.