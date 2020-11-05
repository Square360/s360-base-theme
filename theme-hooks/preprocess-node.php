<?php

/**
 * @file
 * preprocess-node.php
 *
 * Define all view preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_node().
 */
function s360_base_theme_preprocess_node(&$variables) {
  $elements = $variables['elements'];

  if (isset($elements['#node'])) {
    /** @var \Drupal\node\Entity\Node $node */
    $node = $elements['#node'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];

    // Remove some attributes.
    unset($variables['attributes']['role']);
    unset($variables['attributes']['about']);
  }
}
