<?php

/**
 * @file
 * preprocess-node.php
 *
 * Define all node preprocess HOOKs. Each bundle should provide it's own
 * hook function. e.g. `_s360_base_theme_preprocess_node__[bundle]`.
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_preprocess_node().
 */
function s360_base_theme_preprocess_node(&$variables) {
  $elements = $variables['elements'];

  /** @var \Drupal\node\Entity\Node $node */
  $node = $variables['node'];
  $node_bundle = $node->bundle();
  $node_view_mode = $elements['#view_mode'];

  $variables['view_mode'] = $node_view_mode;

  if ($node_view_mode !== 'full') {
    $url = s360_base_theme_get_node_url($node);

    $variables['cta_url'] = $url;
    $variables['label_as_link'] = [
      '#type' => 'link',
      '#title' => Markup::create('<span>' . trim($node->label()) . '</span>'),
      '#url' => $url,
    ];
  }

  $variables['attributes']['id'] = Html::getClass('node-' . $node_bundle . '-' . $node->id());

  // Remove some attributes.
  unset($variables['attributes']['role']);
  unset($variables['attributes']['about']);

  // Call custom function for the bundle, if it exists.
  $node_bundle_function = '_' . __FUNCTION__ . '__' . $node_bundle;
  if (function_exists($node_bundle_function)) {
    $node_bundle_function($variables);
  }
}
