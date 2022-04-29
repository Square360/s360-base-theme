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

  if (isset($elements['#id'])) {
    $block_name = $elements['#id'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'][] = 'block-' . Html::getClass($block_name);
  }
}

/**
 * Implements hook_preprocess_block__system_menu_block__main().
 */
function s360_base_theme_preprocess_block__system_menu_block__main(&$variables) {
  $variables['attributes']['aria-hidden'] = 'true';
  $variables['attributes']['data-js'] = 'main-menu';
}
