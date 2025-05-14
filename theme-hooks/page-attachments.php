<?php

/**
 * @file
 * page-attachments.php
 */

use Drupal\Core\Render\Markup;

/**
 * Implements hook_page_attachments_alter().
 */
function s360_base_theme_page_attachments_alter(array &$page) {
  $theme_path = \Drupal::service('extension.list.theme')->getPath('s360_base_theme');

  $critical_css_files = [
    'base/base.css',
    'block/branding-block/block.branding-block.css',
    'site-layout/site-header/site-header.css',
    'site-layout/site-main/site-main.css',
    'site-layout/menu-block/menu-block.css',
    'site-layout/main-menu-toggle/main-menu-toggle.css',
  ];

  if (!empty($critical_css_files)) {
    foreach ($critical_css_files as $css_file) {
      $css = file_get_contents("$theme_path/ui/dist/$css_file");

      $page['#attached']['html_head'][] = [
        [
          '#tag' => 'style',
          '#value' => Markup::create($css),
        ],
        "s360_base_theme.{$css_file}",
      ];
    }
  }
}
