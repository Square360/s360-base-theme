<?php

/**
 * @file
 * preprocess-node.php
 *
 * Define all node preprocess HOOKs.
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
  $node_base_class = $node_view_mode === 'full' ? 'node' : 'node-teaser';

  if ($node_view_mode !== 'full') {
    $node_view_mode = str_replace('teaser_', '', $node_view_mode);
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

  $variables['attributes']['class'][] = $node_base_class;
  $variables['attributes']['class'][] = Html::getClass("$node_base_class--$node_bundle");
  $variables['attributes']['class'][] = Html::getClass("$node_base_class--$node_view_mode");

  if ($variables['is_front']) {
    $variables['attributes']['class'][] = Html::getClass("$node_base_class--is-front");
  }

  $variables['attributes']['data-js'] = "node-$node_bundle";

  // Remove some attributes.
  unset($variables['attributes']['role']);
  unset($variables['attributes']['about']);
}
