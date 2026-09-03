<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\media\MediaInterface;
use Drupal\s360_base_theme\MediaEntityHelper;
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
  public function preprocessMedia(array &$variables): void {
    /** @var \Drupal\media\MediaInterface $media */
    $media = $variables['media'];
    $media_bundle = $media->bundle();

    if ($variables['media']->caption) {
      $variables['caption'] = $variables['media']->caption;
    }

    $media_bundle_method = ThemeHelper::toPascalCase("preprocess{$media_bundle}");
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
    $media_info = MediaEntityHelper::getMediaInfo($media);

    $file = $media_info['file'] ?? NULL;
    if (!$file) {
      return;
    }

    $file_width = $file['width'];
    $file_height = $file['height'];

    if ($file_width !== 0 && $file_height !== 0) {
      $variables['attributes']['data-orientation'] = match (TRUE) {
        $file_width > $file_height => 'landscape',
        $file_height > $file_width => 'portrait',
        default => 'square',
      };

      $custom_properties = sprintf(
        '--image-width: %d; --image-height: %d; --image-aspect-ratio: %d / %d;',
        $file_width, $file_height, $file_width, $file_height,
      );

      $existing_style = $variables['attributes']['style'] ?? '';
      $variables['attributes']['style'] = trim($existing_style . ' ' . $custom_properties);
    }
  }

  /**
   * Preprocesses Document media bundle variables.
   *
   * @param array $variables
   *   The media variables array being preprocessed.
   * @param \Drupal\media\MediaInterface $media
   *   The Document media entity.
   */
  protected function preprocessDocument(array &$variables, MediaInterface $media): void {  }

  /**
   * Preprocesses Remote Video media bundle variables.
   *
   * @param array $variables
   *   The media variables array being preprocessed.
   * @param \Drupal\media\MediaInterface $media
   *   The Remote Video media entity.
   */
  protected function preprocessRemoteVideo(array &$variables, MediaInterface $media): void {
    $field_media_oembed_video = ThemeHelper::validateField($media, 'field_media_oembed_video');
    if (!$field_media_oembed_video) {
      return;
    }

    $video_url = $field_media_oembed_video->value;
    if (!is_string($video_url) || $video_url === '') {
      return;
    }

    $video_details = MediaEntityHelper::extractVideoDetailsFromUrl($video_url);
    if ($video_details) {
      foreach ($video_details as $key => $value) {
        $variables['attributes']['data-' . str_replace('_', '-', $key)] = $value;
      }
    }
  }

}
