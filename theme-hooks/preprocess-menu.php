<?php

/**
 * @file
 * preprocess-menu.php
 *
 * Define all view preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_preprocess_menu().
 */
function s360_base_theme_preprocess_menu(&$variables) {
  $menu_name = $variables['menu_name'];

  $variables['menu_name'] = Html::getClass($menu_name);

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

/**
 * Implements hook_preprocess_menu() for social.
 */
function s360_base_theme_preprocess_menu__social(&$variables) {
  $site_name = \Drupal::config('system.site')->get('name');

  foreach ($variables['items'] as &$item) {
    $item_title = &$item['title'];

    $item['url']->setOptions([
      'attributes' => [
        'aria-label' => "Go to $site_name's $item_title page",
        'title' => $item_title,
      ],
    ]);

    $fa_icon = s360_base_theme_get_social_icon($item_title);

    $item_title = Markup::create('<i class="' . $fa_icon . '"></i>');
  }
}
