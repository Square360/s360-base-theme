<?php

declare(strict_types=1);

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

    $media = $field_erm_image->entity;

    if (!$media instanceof \Drupal\media\MediaInterface) {
      return;
    }

    $media->caption = $field_caption->view(['label' => 'hidden']);
  }

}
