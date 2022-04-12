<?php

/**
 * @file
 * preprocess-views.php
 *
 * Define all view preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_views_view().
 */
function s360_base_theme_preprocess_views_view(&$variables) {
  $view = $variables['view'];
  $style_plugin = $view->style_plugin;
  $view_display = $style_plugin->getPluginId();

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  if ($view_display == 'grid') {
    if (isset($style_plugin->options['columns'])) {
      $variables['attributes']['class'][] = Html::getClass('view--display-grid-columns-' . $style_plugin->options['columns']);
    }
  }
}

/**
 * Implements hook_preprocess_views_view_unformatted().
 */
function s360_base_theme_preprocess_views_view_unformatted(&$variables) {
  foreach ($variables['rows'] as &$row) {
    // Clear any Drupal classes.
    $row['attributes']['class'] = [];
  }
}

/**
 * Implements hook_preprocess_views_view_grid().
 */
function s360_base_theme_preprocess_views_view_grid(&$variables) {
  $items = [];

  foreach ($variables['items'] as $item) {
    foreach ($item['content'] as $nested_item) {
      // Clear any Drupal classes.
      $nested_item['attributes']['class'] = [];

      $items[] = $nested_item;
    }
  }

  $variables['items'] = $items;
}
