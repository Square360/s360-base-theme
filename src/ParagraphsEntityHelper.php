<?php

namespace Drupal\s360_base_theme;

use Drupal\paragraphs\ParagraphInterface;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Helper class for paragraphs entity operations.
 */
final class ParagraphsEntityHelper {

  /**
   * Process image caption for a paragraph entity.
   *
   * Retrieves the caption from field_caption and adds it to the first
   * referenced media entity in field_erm_image.
   *
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The paragraph entity to process.
   */
  public static function processImageCaption(ParagraphInterface $paragraph): void {
    $field_caption = ThemeHelper::validateField($paragraph, 'field_caption');
    $field_erm_image = ThemeHelper::validateField($paragraph, 'field_erm_image');

    if (!$field_caption || !$field_erm_image) {
      return;
    }

    /** @var \Drupal\media\MediaInterface[] $media_entities */
    $media_entities = $field_erm_image->referencedEntities();

    if (!empty($media_entities)) {
      $media = reset($media_entities);
      $media->caption = $field_caption->view(['label' => 'hidden']);
    }
  }

}
