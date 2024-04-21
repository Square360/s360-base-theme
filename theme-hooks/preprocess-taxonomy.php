<?php

/**
 * @file
 * preprocess-taxonomy.php
 *
 * Define all taxonomy preprocess HOOKs. Each bundle should provide it's own
 * hook function. e.g. `s360_base_theme_preprocess_taxonomy_term__[bundle]`
 */

/**
 * Implements hook_preprocess_taxonomy_term().
 */
function s360_base_theme_preprocess_taxonomy_term(array &$variables) {
  unset($variables['attributes']['about']);
}
