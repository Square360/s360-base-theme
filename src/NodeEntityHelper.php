<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Url;
use Drupal\node\NodeInterface;

/**
 * Helper class for node entity operations.
 */
class NodeEntityHelper {

  /**
   * Gets the appropriate URL for a node.
   *
   * Returns the source link URL if the node should use passthrough,
   * otherwise returns the canonical node URL.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to get the URL for.
   *
   * @return \Drupal\Core\Url
   *   The URL object - either the source link or canonical node URL.
   */
  public static function getNodeUrl(NodeInterface $node): Url {
    if (static::isPassthroughEnabled($node) && $node->hasField('field_source_link')) {
      $source_link = $node->get('field_source_link')->getString();

      if ($source_link) {
        return Url::fromUri($source_link);
      }
    }

    return $node->toUrl();
  }

  /**
   * Checks if passthrough mode is enabled for the node.
   *
   * Determines whether the node should bypass its canonical URL and use
   * an source link instead. If field_passthrough doesn't exist, defaults to
   * TRUE (passthrough enabled).
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity to check.
   *
   * @return bool
   *   TRUE if the source link should be used, FALSE otherwise.
   */
  private static function isPassthroughEnabled(NodeInterface $node): bool {
    if ($node->hasField('field_passthrough')) {
      return (bool) $node->get('field_passthrough')->value;
    }

    return TRUE;
  }

}
