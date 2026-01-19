<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Media preprocesses for s360_base_theme theme.
 */
class PreprocessMedia {

  public function __construct() {}

  /**
   * Implements hook_preprocess_media().
   */
  #[Hook('preprocess_media')]
  public function preprocessMedia(&$variables): void {
    /** @var \Drupal\media\Entity\Media $media */
    $media = $variables['media'];
    $media_bundle = $media->bundle();

    if ($variables['media']->caption) {
      $variables['caption'] = $variables['media']->caption;
    }

    $media_bundle_method = 'preprocess' . s360_base_theme_convert_to_pascal_case($media_bundle);
    if (method_exists($this, $media_bundle_method)) {
      $this->$media_bundle_method($variables);
    }
  }

}
