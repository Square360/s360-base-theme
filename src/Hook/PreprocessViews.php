<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Views preprocess for s360_base_theme theme.
 */
class PreprocessViews {

  public function __construct() {}

  /**
   * Implements hook_preprocess_views_view().
   */
  #[Hook('preprocess_views_view')]
  public function preprocessViewsView(&$variables): void {
    /** @var \Drupal\views\ViewExecutable $view */
    $view = $variables['view'];
    $view_style_plugin = $view->style_plugin;
    $view_plugin_id = $view_style_plugin->getPluginId();
    $view_id = $view->id();
    $view_current_display = $view->current_display;

    // Key is view machine name.
    // Value is array of displays in that view.
    /*
     * Example:
     *  'view_machine_name' => [
     *    'display_id',
     *  ]
     */
    $views_to_skip_animation = [];

    if (isset($views_to_skip_animation[$view_id])) {
      $displays_to_skip = $views_to_skip_animation[$view_id];

      if (in_array($view_current_display, $displays_to_skip)) {
        $variables['attributes']['data-no-animation'] = '';
      }
    }

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

}
