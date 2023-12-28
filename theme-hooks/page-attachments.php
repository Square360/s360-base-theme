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
