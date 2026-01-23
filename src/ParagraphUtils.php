<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Url;
use Drupal\paragraphs\Entity\Paragraph;

class ParagraphUtils {

  /**
   * Undocumented function
   *
   * @param \Drupal\paragraphs\Entity\Paragraph $paragraph
   */
  public static function processImageCaption(Paragraph $paragraph): void {
    if (!$paragraph?->field_caption->count()) {
      return;
    }

    $field_image_caption = $paragraph?->field_caption->view(['label' => 'hidden']);
    $field_erm_image = $paragraph?->field_erm_image?->referencedEntities();

    if ($field_image_caption && $field_erm_image) {
      /** @var \Drupal\media\Entity\Media $media */
      $media = reset($field_erm_image);
      $media->caption = $field_image_caption;
    }
  }

}
