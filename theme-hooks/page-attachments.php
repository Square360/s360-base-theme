<?php

/**
 * @file
 * page-attachments.php
 */

/**
 * Implements hook_page_attachments_alter().
 */
function s360_base_theme_page_attachments_alter(array &$page) {
  $theme_path = \Drupal::service('extension.list.theme')->getPath('s360_base_theme');

  $critical_css_files = [
    'base/base.css',
    'layout/site-header/site-header.css',
    'layout/site-main/site-main.css',
    'layout/menu-block/menu-block.css',
    'layout/menu-toggle/menu-toggle.css',
  ];

  if (!empty($critical_css_files)) {
    foreach ($critical_css_files as $css_file) {
      $css = file_get_contents("$theme_path/ui/dist/$css_file");

      $page['#attached']['html_head'][] = [
        [
          '#tag' => 'style',
          '#value' => $css,
        ],
        $css_file
      ];
    }
  }
}
