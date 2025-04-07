<?php

/**
 * @file
 * preprocess-block.php
 *
 * Define all form preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_block() for system_menu_block.
 */
function s360_base_theme_preprocess_block__system_menu_block(array &$variables) {
  $elements = $variables['elements'];

  $block_name = $elements['#id'];

  $variables['attributes']['data-js'] = 'block-' . Html::getClass($block_name) . '-menu';
  $variables['attributes']['class'][] = 'block-' . Html::getClass($block_name) . '-menu';

  if ($block_name === 'main') {
    $variables['attributes']['style'][] = 'opacity: 0;';
  }
}
