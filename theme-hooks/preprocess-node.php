<?php

/**
 * @file
 * preprocess-node.php
 *
 * Define all node preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_node().
 */
function s360_base_theme_preprocess_node(&$variables) {
  $elements = $variables['elements'];

  /** @var \Drupal\node\Entity\Node $node */
  $node = $elements['#node'];

  $node_view_mode = $elements['#view_mode'];
  $node_base_class = $node_view_mode === 'full' ? 'node' : 'teaser';

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  // Remove some attributes.
  unset($variables['attributes']['role']);
  unset($variables['attributes']['about']);
}
