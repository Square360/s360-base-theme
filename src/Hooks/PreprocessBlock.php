<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;

/**
 * Block preprocesses for s360_base_theme theme.
 */
class PreprocessBlock {

  public function __construct() {}

  /**
   * Implements hook_preprocess_block().
   */
  #[Hook('preprocess_block')]
  public function preprocessBlock(array &$variables): void {
    $base_plugin_id = $variables['base_plugin_id'];

    $block_plugin_method = 'preprocess' . convertToPascalCase($base_plugin_id);

    if (method_exists($this, $block_plugin_method)) {
      $this->$block_plugin_method($variables);
    }
  }

  /**
   * Preprocess for system menu block ID.
   */
  public function preprocessSystemMenuBlock(&$variables): void {
    $elements = $variables['elements'];

    $block_name = $elements['#id'];

    $variables['attributes']['data-js'] = 'block-' . Html::getClass($block_name) . '-menu';
    $variables['attributes']['class'][] = 'block-' . Html::getClass($block_name) . '-menu';

    if ($block_name === 'main') {
      $variables['attributes']['style'][] = 'opacity: 0;';
    }
  }

}
