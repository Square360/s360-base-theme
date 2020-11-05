<?php

/**
 * @file
 * preprocess-menu.php
 *
 * Define all view preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_menu().
 */
function s360_base_theme_preprocess_menu(&$variables) {
  $menu_name = $variables['menu_name'];

  if (!in_array($menu_name, ['admin', 'devel'])) {
    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];
  }
}

/**
 * Implements hook_preprocess_menu_local_task().
 */
function s360_base_theme_preprocess_menu_local_task(&$variables) {
  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'menu__item';
}
