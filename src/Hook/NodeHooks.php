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
 * should have its own private preprocessing method.
 *
 * Node-specific methods:
 *  `private function preprocess[BundleName](&$variables, $node)`.
 */
final class NodeHooks {

  /**
   * The node entity helper service.
   *
   * @var \Drupal\s360_base_theme\NodeEntityHelper|null
   */
  private ?NodeEntityHelper $nodeHelper = NULL;

  /**
   * Gets the node entity helper instance.
   *
   * Lazy-loads the NodeEntityHelper to avoid unnecessary instantiation.
   *
   * @return \Drupal\s360_base_theme\NodeEntityHelper
   *   The node entity helper service.
   */
  private function nodeHelper(): NodeEntityHelper {
    if ($this->nodeHelper === NULL) {
      $this->nodeHelper = new NodeEntityHelper();
    }

    return $this->nodeHelper;
  }

  /**
   * Implements hook_preprocess_node().
   */
  #[Hook('preprocess_node')]
  public function preprocessNode(&$variables): void {
    /** @var \Drupal\node\Entity\Node $node */
    $node = $variables['node'];
    $node_bundle = $node->bundle();

    $node_url = $this->nodeHelper()->getNodeUrl($node);

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

    $node_bundle_method = 'preprocess' . ThemeHelper::toPascalCase($node_bundle);
    if (method_exists($this, $node_bundle_method)) {
      $this->$node_bundle_method($variables, $node);
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
  private function preprocessPage(array &$variables, NodeInterface $node): void {

  }

}
