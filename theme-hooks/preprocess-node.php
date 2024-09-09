<?php

/**
 * @file
 * preprocess-node.php
 *
 * Define all node preprocess HOOKs. Each bundle should provide it's own
 * hook function. e.g. `s360_base_theme_preprocess_node__[bundle]`
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Render\Markup;
use Drupal\Core\Url;

/**
 * Implements hook_preprocess_node().
 */
function s360_base_theme_preprocess_node(&$variables) {
  $elements = $variables['elements'];

  /** @var \Drupal\node\Entity\Node $node */
  $node = $variables['node'];
  $node_bundle = $node->bundle();
  $node_view_mode = $elements['#view_mode'];

  if ($node_view_mode !== 'full') {
    $label_url = Url::fromRoute('entity.node.canonical', ['node' => $node->id()]);

    if ($node->hasField('field_source_link')) {
      $field_source_link = $node->get('field_source_link');

      if ($field_source_link->count()) {
        $label_url = Url::fromUri($field_source_link->getString());
      }
    }

    $variables['label_as_link'] = [
      '#type' => 'link',
      '#title' => Markup::create('<span>' . $node->label() . '</span>'),
      '#url' => $label_url,
    ];
  }

  $variables['attributes']['id'] = Html::getClass('node-' . $node_bundle . '-' . $node->id());
  $variables['view_mode'] = $node_view_mode;

  // Remove some attributes.
  unset($variables['attributes']['role']);
  unset($variables['attributes']['about']);
}
