<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for block preprocessing.
 *
 * This class provides centralized block preprocessing functionality. Each block
 * plugin type should have its own protected preprocessing method.
 *
 * Block-specific methods:
 *  `protected function preprocess[PluginId](&$variables)`
 */
final class BlockHooks {

  /**
   * Implements hook_preprocess_block().
   */
  #[Hook('preprocess_block')]
  public function preprocessBlock(array &$variables): void {
    $base_plugin_id = $variables['base_plugin_id'] ?? NULL;
    if (!is_string($base_plugin_id) || $base_plugin_id === '') {
      return;
    }

    $block_plugin_method = ThemeHelper::toPascalCase("preprocess{$base_plugin_id}");

    if (method_exists($this, $block_plugin_method)) {
      $this->$block_plugin_method($variables);
    }
  }

  /**
   * Preprocesses system menu block variables.
   *
   * @param array $variables
   *   An associative array containing info about the menu.
   */
  protected function preprocessSystemMenuBlock(array &$variables): void {
    $elements = $variables['elements'] ?? NULL;

    if (!is_array($elements)) {
      return;
    }

    $menu_id = $elements['#id'] ?? NULL;

    if (!is_string($menu_id) || $menu_id === '') {
      return;
    }

    $block_menu = Html::getClass("block-{$menu_id}-menu");

    $variables['attributes']['data-js'] = $block_menu;
    $variables['attributes']['class'][] = $block_menu;

    if ($menu_id === 'main') {
      $variables['attributes']['style'][] = 'opacity: 0;';
    }
  }

}
