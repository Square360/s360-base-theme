<?php

namespace Drupal\s360_base_theme;

use Drupal\paragraphs\ParagraphInterface;

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
    if (!$paragraph->hasField('field_caption') || !$paragraph->hasField('field_erm_image')) {
      return;
    }

    $field_image_caption = $paragraph->get('field_caption');
    $field_erm_image = $paragraph->get('field_erm_image');

    if ($field_image_caption->isEmpty() || $field_erm_image->isEmpty()) {
      return;
    }

    /** @var \Drupal\media\MediaInterface[] $media_entities */
    $media_entities = $field_erm_image->referencedEntities();

    if (!empty($media_entities)) {
      $media = reset($media_entities);
      $media->caption = $field_image_caption->view(['label' => 'hidden']);
    }
  }

}
