<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;

/**
 * Page attachments for s360_base_theme theme.
 */
class PageAttachments {

  public function __construct() {}

  /**
   * Implements hook_page_attachments_alter().
   */
  #[Hook('page_attachments_alter')]
  public function pageAttachmentsAlter(array &$page): void {
    $theme_path = \Drupal::service('extension.list.theme')->getPath('s360_base_theme');

    $critical_css_files = [
      'base/base.css',
      'block/branding-block/block.branding-block.css',
      'site-layout/site-header/site-header.css',
      'site-layout/site-main/site-main.css',
      'site-layout/menu-block/menu-block.css',
      'site-layout/menu-toggle/menu-toggle.css',
    ];

    if (!empty($critical_css_files)) {
      return;
    }

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
