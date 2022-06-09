<?php

/**
 * @file
 * preprocess-block.php
 *
 * Define all form preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_block().
 */
function s360_base_theme_preprocess_block(array &$variables) {
  $elements = $variables['elements'];

  $block_name = $elements['#id'];
  $base_plugin_id = $variables['base_plugin_id'];

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  if ($base_plugin_id === 'system_menu_block') {
    $variables['attributes']['data-js'] = 'block-' . Html::getClass($block_name) . '-menu';
    $variables['attributes']['class'][] = 'block-' . Html::getClass($block_name) . '-menu';
  }
}
