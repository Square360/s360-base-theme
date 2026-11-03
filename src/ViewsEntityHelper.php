<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme;

use Drupal\node\NodeInterface;

/**
 * Helper class for views entity operations.
 */
final class ViewsEntityHelper {

  /**
   * Gets the node the view is being displayed on.
   *
   * Views AJAX requests are served from /views/ajax, so the route has no node.
   * Core's ViewAjaxController sets the current path to the originating page,
   * which is used as the fallback.
   *
   * @return \Drupal\node\NodeInterface|null
   *   The node, or NULL if the view is not displayed on a node.
   */
  public static function getContextNode(): ?NodeInterface {
    $node = \Drupal::routeMatch()->getParameter('node');

    if (!$node instanceof NodeInterface) {
      $path = \Drupal::service('path.current')->getPath();
      $url = \Drupal::pathValidator()->getUrlIfValidWithoutAccessCheck($path);
      $node_id = $url?->isRouted() ? ($url->getRouteParameters()['node'] ?? NULL) : NULL;

      $node = is_scalar($node_id)
        ? \Drupal::entityTypeManager()->getStorage('node')->load($node_id)
        : NULL;
    }

    return $node instanceof NodeInterface ? $node : NULL;
  }

}
