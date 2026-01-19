<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;

/**
 * Node preprocesses for s360_base_theme theme.
 */
class PreprocessNode {

  public function __construct() {}

  /**
   * Implements hook_preprocess_node().
   */
  #[Hook('preprocess_node')]
  public function preprocessNode(&$variables): void {
    $elements = $variables['elements'];

    /** @var \Drupal\node\Entity\Node $node */
    $node = $variables['node'];
    $node_bundle = $node->bundle();
    $node_view_mode = $elements['#view_mode'];

    $node_url = s360_base_theme_get_node_url($node);

    $variables['cta_url'] = $node_url;
    $variables['label_as_link'] = [
      '#type' => 'link',
      '#title' => Markup::create('<span>' . trim($node->label()) . '</span>'),
      '#url' => $node_url,
    ];

    $variables['attributes']['id'] = Html::getClass('node-' . $node_bundle . '-' . $node->id());

    // Remove some attributes.
    unset($variables['attributes']['role']);
    unset($variables['attributes']['about']);

    $node_bundle_method = 'preprocess' . s360_base_theme_convert_to_pascal_case($node_bundle);
    if (method_exists($this, $node_bundle_method)) {
      $this->$node_bundle_method($variables);
    }
  }

}
