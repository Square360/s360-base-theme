<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\media\MediaInterface;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for media preprocessing.
 *
 * This class provides centralized media preprocessing functionality. Each media
 * bundle type should have its own protected preprocessing method.
 *
 * Media-specific methods:
 *  `protected function preprocess[BundleName](&$variables, Media $media)`
 */
final class MediaHooks {

  /**
   * Implements hook_preprocess_media().
   */
  #[Hook('preprocess_media')]
  public function preprocessMedia(&$variables): void {
    /** @var \Drupal\media\MediaInterface $media */
    $media = $variables['media'];
    $media_bundle = $media->bundle();

    if ($variables['media']->caption) {
      $variables['caption'] = $variables['media']->caption;
    }

    $media_bundle_method = 'preprocess' . ThemeHelper::toPascalCase($media_bundle);
    if (method_exists($this, $media_bundle_method)) {
      $this->$media_bundle_method($variables, $media);
    }
  }

  /**
   * Preprocesses Image media bundle variables.
   *
   * @param array $variables
   *   The media variables array being preprocessed.
   * @param \Drupal\media\MediaInterface $media
   *   The Image media entity.
   */
  protected function preprocessImage(array &$variables, MediaInterface $media): void {

  }

  /**
   * Preprocesses Document media bundle variables.
   *
   * @param array $variables
   *   The media variables array being preprocessed.
   * @param \Drupal\media\MediaInterface $media
   *   The Document media entity.
   */
  protected function preprocessDocument(array &$variables, MediaInterface $media): void {

  }

  /**
   * Preprocesses Remote Video media bundle variables.
   *
   * @param array $variables
   *   The media variables array being preprocessed.
   * @param \Drupal\media\MediaInterface $media
   *   The Remote Video media entity.
   */
  protected function preprocessRemoteVideo(array &$variables, MediaInterface $media): void {

  }

}
