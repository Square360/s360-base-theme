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
  /** @var \Drupal\views\ViewExecutable $view */
  $view = $variables['view'];
  $view_style_plugin = $view->style_plugin;
  $view_plugin_id = $view_style_plugin->getPluginId();
  $view_current_display = $view->current_display;

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  if ($view_plugin_id == 'grid') {
    if (isset($view_style_plugin->options['columns'])) {
      $variables['attributes']['class'][] = Html::getClass('view--display-grid-columns-' . $view_style_plugin->options['columns']);
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
