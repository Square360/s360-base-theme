<?php

/**
 * @file
 * preprocess-views.php
 *
 * Define all view preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_views_view().
 */
function s360_base_theme_preprocess_views_view(&$variables) {
  /** @var \Drupal\views\ViewExecutable $view */
  $view = $variables['view'];
  $view_style_plugin = $view->style_plugin;
  $view_plugin_id = $view_style_plugin->getPluginId();

  // Remove the pager if there are no items.
  if (!$view?->pager?->total_items) {
    unset($variables['pager']);
  }

  $view_formats = [
    'grid' => 'grid',
    'html_list' => 'list',
    'table' => 'table',
    'default' => 'unformatted',
  ];

  $variables['format'] = $view_formats[$view_plugin_id];

  if ($view_plugin_id == 'grid') {
    if (isset($view_style_plugin->options['columns'])) {
      $variables['columns'] = $view_style_plugin->options['columns'];
    }
  }
}
