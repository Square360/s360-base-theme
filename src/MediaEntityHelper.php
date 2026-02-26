<?php

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
   * @param int|\Drupal\media\MediaInterface $media
   *   Either a media entity ID (int) or a loaded Media entity object.
   *
   * @return array|null
   *   An array containing:
   *   - media: Media information array
   *   - thumbnail: Thumbnail file information array
   *   - Additional keys based on media type
   *   Returns NULL if the media entity cannot be loaded.
   */
  public static function getMediaInfo(int|MediaInterface $media): ?array {
    if (is_int($media)) {
      /** @var \Drupal\media\MediaInterface $media */
      $media = ThemeHelper::entityTypeManager()->getStorage('media')->load($media);

      // No media found!
      if (!$media) {
        ThemeHelper::getLogger()->error('Error loading media (mid: @mid)', ['@mid' => $media]);
        return NULL;
      }
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
        $media_info = array_merge($media_info, static::getDocumentInfo($media));
        break;

      case 'image':
        $media_info = array_merge($media_info, static::getImageInfo($media));
        break;

      case 'remote_video':
        $media_info = array_merge($media_info, static::getRemoteVideoInfo($media));
        break;

      default:
        break;
    }

    return $media_info;
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
   * @return array|null
   *   An array of file information from FileEntityHelper::getFileInfo(),
   *   or NULL if the field is empty or unavailable.
   */
  private static function getDocumentInfo(MediaInterface $media): ?array {
    $field_media_document = $media->field_media_document?->target_id;

    if (!$field_media_document) {
      return NULL;
    }

    return FileEntityHelper::getFileInfo($field_media_document);
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
   * @return array|null
   *   An array of file information with additional image metadata.
   *   Returns NULL if the field is empty or unavailable.
   */
  private static function getImageInfo(MediaInterface $media): ?array {
    $field_media_image = $media->field_media_image;

    if (!$field_media_image) {
      return NULL;
    }

    $file_info = FileEntityHelper::getFileInfo($field_media_image?->target_id);

    $file_info['file']['width'] = $field_media_image?->width . 'px';
    $file_info['file']['height'] = $field_media_image?->height . 'px';
    $file_info['file']['alt'] = $field_media_image?->alt;

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
  private static function getRemoteVideoInfo(MediaInterface $media): ?array {
    $field_media_oembed_video = $media->field_media_oembed_video?->getString();

    if (!$field_media_oembed_video) {
      return NULL;
    }

    return [
      'url' => Url::fromUri($field_media_oembed_video),
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
    if (!$media->hasField('field_media_caption')) {
      return NULL;
    }

    $field_media_caption = $media->get('field_media_caption');

    if ($field_media_caption->isEmpty()) {
      return NULL;
    }

    return $field_media_caption->first()->getValue()['value'];
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
    if (!$media->hasField('thumbnail')) {
      return NULL;
    }

    $thumbnail_field = $media->get('thumbnail');
    if ($thumbnail_field->isEmpty()) {
      return NULL;
    }

    $thumbnail = FileEntityHelper::getFileInfo($thumbnail_field->target_id);
    return reset($thumbnail);
  }

}
