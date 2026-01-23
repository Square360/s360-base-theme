<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Url;
use Drupal\media\Entity\Media;

class MediaUtils {

  /**
   * Get file information about the media.
   *
   * @param int $mid
   *   The ID of media entity.
   *
   * @return null|array
   *   Either an array of information for the media or false.
   */
  public static function getInfo(int $mid): null|array {
    $entity_type_manager = \Drupal::entityTypeManager();

    /** @var Drupal\media\Entity\Media $media */
    $media = $entity_type_manager->getStorage('media')->load($mid);

    // No media found!
    if (!$media) {
      \Drupal::logger('s360_base_theme.theme')->error('Error loading media (mid: @mid)', ['@mid' => $mid]);

      return NULL;
    }

    $media_bundle = $media->bundle();
    $media_info = [
      'media' => [
        'name' => $media->getName(),
        'entity' => $media,
        'type' => $media_bundle,
        'label' => $media->label(),
      ],
    ];

    $media_info['media']['caption'] = '';

    $field_media_caption = $media->field_media_caption?->first()?->getValue();

    if ($field_media_caption) {
      $media_info['media']['caption'] = $field_media_caption['value'];
    }

    $thumbnail_fid = $media->thumbnail?->target_id;

    if ($thumbnail_fid) {
      $thumbnail = s360_base_theme_get_file_info($thumbnail_fid);
      $media_info['thumbnail'] = reset($thumbnail);
    }

    switch ($media_bundle) {
      case 'document':
        $media_info = array_merge($media_info, self::getDocumentInfo($media));
        break;

      case 'image':
        $media_info = array_merge($media_info, self::getImageInfo($media));
        break;

      case 'remote_video':
        $media_info = array_merge($media_info, self::getRemoteVideoInfo($media));
        break;

      default:
        break;
    }

    return $media_info;
  }

  /**
   * Get file information about the media document.
   *
   * @param \Drupal\media\Entity\Media $media
   *   The Drupal media entity.
   *
   * @return bool|array
   *   Either an array of information for the media or false.
   */
  public static function getDocumentInfo(Media $media) {
    $field_media_document = $media->field_media_document?->target_id;

    if (!$field_media_document) {
      return NULL;
    }

    $file_info = s360_base_theme_get_file_info($field_media_document);

    return $file_info;
  }

  /**
   * Get file information about the media image.
   *
   * @param \Drupal\media\Entity\Media $media
   *   The Drupal media entity.
   *
   * @return bool|array
   *   Either an array of information for the media or false.
   */
  public static function getImageInfo(Media $media) {
    $field_media_image = $media->field_media_image;

    if (!$field_media_image) {
      return NULL;
    }

    $file_info = s360_base_theme_get_file_info($field_media_image?->target_id);

    $file_info['file']['width'] = $field_media_image?->width . 'px';
    $file_info['file']['height'] = $field_media_image?->height . 'px';
    $file_info['file']['alt'] = $field_media_image?->alt;

    return $file_info;
  }

  /**
   * Get file information about the media remote image.
   *
   * @param \Drupal\media\Entity\Media $media
   *   The Drupal media entity.
   *
   * @return bool|array
   *   Either an array of information for the media or false.
   */
  public static function getRemoteVideoInfo(Media $media) {
    $field_media_oembed_video = $media->field_media_oembed_video?->getString();

    if (!$field_media_oembed_video) {
      return NULL;
    }

    return [
      'url' => Url::fromUri($field_media_oembed_video),
      'icon' => 'fa-circle-play',
    ];
  }

}
