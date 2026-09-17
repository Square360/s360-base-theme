<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;
use Drupal\node\NodeInterface;
use Drupal\s360_base_theme\NodeEntityHelper;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for node preprocessing.
 *
 * This class provides centralized node preprocessing functionality. Each menu
 * should have its own protected preprocessing method.
 *
 * Node-specific methods:
 *  `protected function preprocess[BundleName](&$variables, $node)`.
 */
final class NodeHooks {

  /**
   * Implements hook_preprocess_node().
   */
  #[Hook('preprocess_node')]
  public function preprocessNode(array &$variables): void {
    $view_mode = $variables['elements']['#view_mode'];

    $variables['view_mode'] = $view_mode;

    /** @var \Drupal\node\NodeInterface $node */
    $node = $variables['node'];
    $node_bundle = $node->bundle();

    $node_url = NodeEntityHelper::getNodeUrl($node);

    $variables['node_url'] = $node_url;
    $variables['node_absolute_url'] = $node_url->setAbsolute();

    // Could be overridden in a bundle preprocess method.
    $variables['label_as_link'] = [
      '#type' => 'link',
      '#title' => Markup::create('<span>' . trim($node->label()) . '</span>'),
      '#url' => $node_url,
    ];

    $variables['attributes']['id'] = Html::getClass("node-{$node_bundle}-{$node->id()}");

    // Remove some attributes.
    unset($variables['attributes']['role']);
    unset($variables['attributes']['about']);

    $node_bundle_method = ThemeHelper::toPascalCase("preprocessBundle{$node_bundle}");
    if (method_exists($this, $node_bundle_method)) {
      $this->$node_bundle_method($variables, $node);
    }

    $node_view_mode_method = ThemeHelper::toPascalCase("preprocessViewMode{$view_mode}");
    if (method_exists($this, $node_view_mode_method)) {
      $this->$node_view_mode_method($variables, $node);
    }
  }

  /**
   * Preprocesses page content type variables.
   *
   * @param array $variables
   *   The node variables array being preprocessed.
   * @param \Drupal\node\NodeInterface $node
   *   The Page node entity.
   */
  protected function preprocessBundlePage(array &$variables, NodeInterface $node): void {  }

}
