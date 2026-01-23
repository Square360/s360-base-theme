<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\media\Entity\Media;
use Drupal\s360_base_theme\ThemeUtils;

/**
 * Hook implementations for media.
 *
 * Each bundle should have it's own protected method.
 * `protected function preprocess[BundleName](&$variables, $media)`.
 */
class MediaHooks {

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

    $media_bundle_method = 'preprocess' . ThemeUtils::toPascalCase($media_bundle);
    if (method_exists($this, $media_bundle_method)) {
      $this->$media_bundle_method($variables, $media);
    }
  }

  /**
   * Undocumented function
   *
   * @param [type] $variables
   * @param Media $media
   * @return void
   */
  protected function preprocessImage(array &$variables, Media $media) {

  }

  /**
   * Undocumented function
   *
   * @param array $variables
   * @param Media $media
   * @return void
   */
  protected function proprocessDocument(array &$variables, Media $media) {

  }

  /**
   * Undocumented function
   *
   * @param array $variables
   * @param Media $media
   * @return void
   */
  protected function proprocessRemoteVideo(array &$variables, Media $media) {

  }

}
