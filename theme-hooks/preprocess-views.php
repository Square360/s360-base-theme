<?php

/**
 * @file
 * preprocess-views.php
 *
 * Define all view preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Template\Attribute;

/**
 * Implements hook_preprocess_views_view().
 */
function s360_base_theme_preprocess_views_view(&$variables) {
  /** @var \Drupal\views\ViewExecutable $view */
  $view = $variables['view'];
  $view_style_plugin = $view->style_plugin;
  $view_plugin_id = $view_style_plugin->getPluginId();
  $view_current_display = $view->current_display;
  $view_id = $view->id();
  $view_dom_id = $view->dom_id;

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'view';
  $variables['attributes']['class'][] = 'view--' . Html::getClass($view_current_display);
  $variables['attributes']['class'][] = 'view--display-' . Html::getClass($view_plugin_id);
  $variables['attributes']['class'][] = 'view--' . Html::getClass($view_id);
  $variables['attributes']['class'][] = 'js-view-dom-id-' . $view_dom_id;

  if ($view_plugin_id == 'grid') {
    if (isset($view_style_plugin->options['columns'])) {
      $variables['attributes']['class'][] = 'view--' . $view_style_plugin->options['columns'] . '-columns';
    }
  }
}

/**
 * Implements hook_preprocess_views_view_unformatted().
 */
function s360_base_theme_preprocess_views_view_unformatted(&$variables) {
  foreach ($variables['rows'] as $key => &$row) {
    $row['attributes'] = new Attribute();
    $row['attributes']['class'] = [];
    $row['attributes']['class'][] = 'view__row';
    $row['attributes']['class'][] = "view__row--$key";
  }
}

/**
 * Implements hook_preprocess_views_view_list().
 */
function s360_base_theme_preprocess_views_view_list(&$variables) {
  foreach ($variables['rows'] as $key => &$row) {
    $row['attributes'] = new Attribute();
    $row['attributes']['class'] = [];
    $row['attributes']['class'][] = 'view__row';
    $row['attributes']['class'][] = "view__row--$key";
  }
}

/**
 * Implements hook_preprocess_views_view_grid().
 */
function s360_base_theme_preprocess_views_view_grid(&$variables) {
  foreach ($variables['items'] as &$item) {
    foreach ($item['content'] as $key => &$nested_item) {
      $nested_item['attributes'] = new Attribute();
      $nested_item['attributes']['class'] = [];
      $nested_item['attributes']['class'][] = 'view__row';
      $nested_item['attributes']['class'][] = "view__row--$key";
    }
  }
}
