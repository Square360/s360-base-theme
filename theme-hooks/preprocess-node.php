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

  $node_bundle = $node->bundle();
  $node_view_mode = $elements['#view_mode'];
  $node_base_class = $node_view_mode === 'full' ? 'node' : 'teaser';

  if ($node_base_class !== 'full') {
    $node_view_mode = str_replace('teaser_', '', $node_view_mode);
  }

  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = $node_base_class;
  $variables['attributes']['class'][] = Html::getClass("$node_base_class--$node_bundle");
  $variables['attributes']['class'][] = Html::getClass("$node_base_class--$node_view_mode");

  $variables['attributes']['data-js'] = "node-$node_bundle";

  // Remove some attributes.
  unset($variables['attributes']['role']);
  unset($variables['attributes']['about']);
}
