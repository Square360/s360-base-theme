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
 * plugin type should have its own private preprocessing method.
 *
 * Block-specific methods:
 *  `private function preprocess[PluginId](&$variables)`
 */
final class BlockHooks {

  /**
   * Implements hook_preprocess_block().
   */
  #[Hook('preprocess_block')]
  public function preprocessBlock(array &$variables): void {
    $base_plugin_id = $variables['base_plugin_id'];

    $block_plugin_method = 'preprocess' . ThemeHelper::toPascalCase($base_plugin_id);
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
  private function preprocessSystemMenuBlock(array &$variables): void {
    $elements = $variables['elements'];

    $block_name = $elements['#id'];

    $variables['attributes']['data-js'] = 'block-' . Html::getClass($block_name) . '-menu';
    $variables['attributes']['class'][] = 'block-' . Html::getClass($block_name) . '-menu';

    if ($block_name === 'main') {
      $variables['attributes']['style'][] = 'opacity: 0;';
    }
  }

}
