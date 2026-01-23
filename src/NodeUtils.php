<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Url;
use Drupal\node\Entity\Node;

class NodeUtils {

  /**
   * If there is a source link, uses it. Otherwise use the node canonical route.
   *
   * @param \Drupal\node\Entity\Node $node
   *   The node to check.
   *
   * @return string
   *   The node url, canonical or source_link.
   */
  public static function getNodeUrl(Node $node): string {
    $url = Url::fromRoute('entity.node.canonical', ['node' => $node->id()]);

    // Check if field_passthrough exists.
    $use_source_link = FALSE;
    if ($node?->field_passthrough) {
      $use_source_link = (bool) $node->field_passthrough->value;
    }

    // Field doesn't exist, so check for source link anyway.
    else {
      $use_source_link = TRUE;
    }

    if ($use_source_link) {
      $field_source_link = $node?->field_source_link?->getString();
      if ($field_source_link) {
        $url = Url::fromUri($field_source_link);
      }
    }

    return $url;
  }

}
