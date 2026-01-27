<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;
use Drupal\s360_base_theme\ThemeUtils;
use Drupal\s360_base_theme\NodeUtils;

/**
 * Hook implementations for nodes.
 *
 * Each bundle should have it's own protected method.
 * `protected function preprocess[BundleName](&$variables, $node)`.
 */
class NodeHooks {

  /**
   * Implements hook_preprocess_node().
   */
  #[Hook('preprocess_node')]
  public function preprocessNode(&$variables): void {
    /** @var \Drupal\node\Entity\Node $node */
    $node = $variables['node'];
    $node_bundle = $node->bundle();

    $node_url = NodeUtils::getNodeUrl($node);

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

    $node_bundle_method = 'preprocess' . ThemeUtils::toPascalCase($node_bundle);
    if (method_exists($this, $node_bundle_method)) {
      $this->$node_bundle_method($variables, $node);
    }
  }

  /**
   * Undocumented function
   *
   * @param array $variable
   * @return void
   */
  protected function preprocessPage(array &$variable, Node $node): void {

  }



}
