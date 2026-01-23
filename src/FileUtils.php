<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Url;

class FileUtils {

  /**
   * Get file information.
   *
   * @param int $fid
   *   The ID of the file entity.
   *
   * @return null|array
   *   An array of information for the file.
   */
  public static function getFileInfo(int $fid): null|array {
    $entity_type_manager = \Drupal::entityTypeManager();

    /** @var Drupal\file\Entity\File $file */
    $file = $entity_type_manager->getStorage('file')->load($fid);

    // No media found!
    if (!$file) {
      \Drupal::logger('s360_base_theme.theme')->error('Error loading file (fid: @fid)', ['@fid' => $fid]);

      return NULL;
    }

    $file_mime_type = $file->getMimeType();
    $file_size = $file->getSize();
    $file_filename = $file->getFilename();
    $file_url = $file->createFileUrl();
    $file_uri = $file->getFileUri();

    $mime_type = self::getMimeType((string) $file_mime_type);

    return [
      'file' => [
        'entity' => $file,
        'size' => self::getNormalizedFileSize((int) $file_size),
        'filename' => $file_filename,
        'mime_type' => $file_mime_type,
        'relative_url' => $file_url,
        'uri' => $file_uri,
        'url' => Url::fromUri(\Drupal::service('file_url_generator')->generateAbsoluteString($file_uri)),
        'type' => $mime_type['file_type'],
      ],
      'icon' => $mime_type['icon'],
    ];
  }

  /**
   * Converts a file size into a human readable format.
   *
   * @param string|int $file_size
   *   The original file size.
   *
   * @return null|string
   *   The converted file size with unit.
   */
  private static function getNormalizedFileSize($file_size): null|string {
    if ($file_size === 0) {
      return NULL;
    }

    $one_kb = 1024;

    // Possible units a file size can be.
    $units = [
      'B',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ];

    // Figure out which unit to use.
    $power = floor(log($file_size, $one_kb));

    // Format and return the converted filesize to human readable.
    return number_format($file_size / pow($one_kb, $power), 2, '.', ',') . $units[$power];
  }

  /**
   * Converts a mime type into an icon and file type.
   *
   * @param string $file_mime_type
   *   The type of mime.
   *
   * @return array
   *   An array containing icon and file type.
   */
  protected static function getMimeType(string $file_mime_type) {
    switch ($file_mime_type) {
      case 'image/jpeg':
        $icon = 'fa-file-image';
        $file_type = 'JPG';
        break;

      case 'image/png':
        $icon = 'fa-file-image';
        $file_type = 'PNG';
        break;

      case 'image/gif':
        $icon = 'fa-file-image';
        $file_type = 'GIF';
        break;

      case 'application/pdf':
        $icon = 'fa-file-pdf';
        $file_type = 'PDF';
        break;

      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        $icon = 'fa-file-word';
        $file_type = 'Word';
        break;

      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        $icon = 'fa-file-excel';
        $file_type = 'Excel';
        break;

      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        $icon = 'fa-file-powerpoint';
        $file_type = 'PowerPoint';
        break;

      default:
        $icon = 'fa-file';
        $file_type = 'File';
        break;
    }

    return [
      'icon' => $icon,
      'file_type' => $file_type,
    ];
  }

}
