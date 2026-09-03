<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme;

use Drupal\Core\Url;
use Drupal\media\MediaInterface;

/**
 * Helper class for media entity operations.
 */
final class MediaEntityHelper {

  /**
   * Get file information about the media.
   *
   * @param int|\Drupal\media\MediaInterface|null $media
   *   Either a media entity ID (int), a loaded Media entity object, or NULL
   *   when an entity reference target no longer exists.
   *
   * @return array|null
   *   An array containing:
   *   - media: Media information array
   *   - thumbnail: Thumbnail file information array
   *   - Additional keys based on media type
   *   Returns NULL if the media entity cannot be loaded.
   */
  public static function getMediaInfo(int|MediaInterface|null $media): ?array {
    if (is_int($media)) {
      $mid = $media;

      /** @var \Drupal\media\MediaInterface $media */
      $media = ThemeHelper::entityTypeManager()->getStorage('media')->load($mid);

      // No media found!
      if (!$media) {
        ThemeHelper::getLogger()->error('Error loading media (mid: @mid)', ['@mid' => $mid]);
        return NULL;
      }
    }

    if (!$media instanceof MediaInterface) {
      return NULL;
    }

    $media_bundle = $media->bundle();
    $media_info = [
      'media' => [
        'name' => $media->getName(),
        'entity' => $media,
        'type' => $media_bundle,
        'label' => $media->label(),
        'caption' => static::getMediaCaption($media),
      ],
      'thumbnail' => static::getMediaThumbnail($media),
    ];

    switch ($media_bundle) {
      case 'document':
        return array_merge($media_info, static::getDocumentInfo($media));

      case 'image':
        return array_merge($media_info, static::getImageInfo($media));

      case 'remote_video':
        return array_merge($media_info, static::getRemoteVideoInfo($media));

      default:
        break;
    }

    return $media_info;
  }

  /**
   * Extracts normalized provider and video ID details from a video URL.
   *
   * Supports YouTube and Vimeo URLs.
   *
   * @param string $url
   *   The input video URL.
   *
   * @return array{
   *  provider: string,
   *  video_id: string,
   * }|null
   */
  public static function extractVideoDetailsFromUrl(string $url): ?array {
    return static::getYouTubeDetailsFromUrl($url) ?? static::getVimeoDetailsFromUrl($url);
  }

  /**
   * Gets file information for a document media entity.
   *
   * Extracts the referenced file from the field_media_document field and
   * retrieves its file information.
   *
   * @param \Drupal\media\MediaInterface $media
   *   The document media entity.
   *
   * @return array
   *   An array of file information from FileEntityHelper::getFileInfo(),
   *   or NULL if the field is empty or unavailable.
   */
  private static function getDocumentInfo(MediaInterface $media): array {
    $field_media_document = ThemeHelper::validateField($media, 'field_media_document');
    if (!$field_media_document) {
      return [];
    }

    return FileEntityHelper::getFileInfo($field_media_document->entity) ?? [];
  }

  /**
   * Gets file information for an image media entity.
   *
   * Extracts the referenced file from the field_media_image field and
   * retrieves its file information, including dimensions and alt text.
   *
   * @param \Drupal\media\MediaInterface $media
   *   The image media entity.
   *
   * @return array
   *   An array of file information with additional image metadata.
   *   Returns NULL if the field is empty or unavailable.
   */
  private static function getImageInfo(MediaInterface $media): array {
    $field_media_image = ThemeHelper::validateField($media, 'field_media_image');
    if (!$field_media_image) {
      return [];
    }

    $file_info = FileEntityHelper::getFileInfo($field_media_image->entity);
    if (!$file_info) {
      return [];
    }

    $file_info['file']['width'] = ($field_media_image->width ?? 0);
    $file_info['file']['height'] = ($field_media_image->height ?? 0);
    $file_info['file']['alt'] = $field_media_image->alt ?? '';

    return $file_info;
  }

  /**
   * Gets information for a remote video media entity.
   *
   * Extracts the oEmbed URL from the field_media_oembed_video field and
   * returns it as a Drupal URL object with a FontAwesome play icon.
   *
   * @param \Drupal\media\MediaInterface $media
   *   The remote video media entity.
   *
   * @return array|null
   *   An array containing:
   *   - url: Drupal\Core\Url object for the video
   *   - icon: FontAwesome icon class (fa-circle-play)
   *   Returns NULL if the field is empty or unavailable.
   */
  private static function getRemoteVideoInfo(MediaInterface $media): array {
    $field_media_oembed_video = ThemeHelper::validateField($media, 'field_media_oembed_video');

    if (!$field_media_oembed_video) {
      return [];
    }

    $uri = $field_media_oembed_video->getString();

    if (!is_string($uri) || $uri === '') {
      return [];
    }

    return [
      'url' => Url::fromUri($uri),
      'icon' => 'fa-circle-play',
    ];
  }

  /**
   * Gets the caption text from a media entity.
   *
   * Extracts the plain text value from the field_media_caption field.
   *
   * @param \Drupal\media\MediaInterface $media
   *   The media entity.
   *
   * @return string|null
   *   The caption text, or NULL if the field is empty or unavailable.
   */
  private static function getMediaCaption(MediaInterface $media): ?string {
    $field_media_caption = ThemeHelper::validateField($media, 'field_media_caption');

    if (!$field_media_caption) {
      return NULL;
    }

    return $field_media_caption->value;
  }

  /**
   * Gets the thumbnail file information for a media entity.
   *
   * Retrieves the file information array for the media entity's automatically
   * generated thumbnail field.
   *
   * @param \Drupal\media\MediaInterface $media
   *   The media entity.
   *
   * @return array|null
   *   The file information array from FileEntityHelper::getFileInfo(),
   *   or NULL if no thumbnail exists.
   */
  private static function getMediaThumbnail(MediaInterface $media): ?array {
    $thumbnail = ThemeHelper::validateField($media, 'thumbnail');

    if (!$thumbnail) {
      return NULL;
    }

    $thumbnail_info = FileEntityHelper::getFileInfo($thumbnail->entity);

    if (!$thumbnail_info) {
      return NULL;
    }

    return reset($thumbnail_info);
  }

  /**
   * Extracts YouTube provider details from a URL.
   *
   * Supports common YouTube formats such as youtu.be short URLs, watch URLs,
   * shorts, live, and /v/ paths.
   *
   * @param string $url
   *   The input video URL.
   *
   * @return array|null
   *   An associative array with:
   *   - provider: youtube
   *   - video_id: The extracted YouTube video ID.
   *   Returns NULL when the URL does not match a supported YouTube pattern.
   */
  private static function getYouTubeDetailsFromUrl(string $url): ?array {
    // Match youtube.com or youtu.be that contain:
    // "watch", "watch?v=", "shorts", "live", or "v".
    $youtube_url_regex = '/(youtu\.be\/|youtube\.com\/(watch(\?v=|\/))|shorts\/|live\/|v\/)([^\?&"\'>]+)/';

    preg_match($youtube_url_regex, $url, $matches);

    if (!isset($matches[4])) {
      return NULL;
    }

    return [
      'provider' => 'youtube',
      'video_id' => $matches[4],
    ];
  }

  /**
   * Extracts Vimeo provider details from a URL.
   *
   * @param string $url
   *   The input video URL.
   *
   * @return array|null
   *   An associative array with:
   *   - provider: vimeo
   *   - video_id: The extracted Vimeo video ID.
   *   Returns NULL when no Vimeo ID is found in the URL.
   */
  private static function getVimeoDetailsFromUrl(string $url): ?array {
    preg_match('/vimeo\.com\/(?:.*\/)?(\d+)/', $url, $matches);

    if (!$matches[1]) {
      return NULL;
    }

    return [
      'provider' => 'vimeo',
      'video_id' => $matches[1],
    ];
  }

}
