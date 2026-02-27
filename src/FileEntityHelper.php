<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Url;

/**
 * Helper class for file entity operations.
 *
 * Provides methods to retrieve and format file entity information including
 * file metadata, URLs, and visual representation.
 */
final class FileEntityHelper {

  /**
   * Gets the file URL generator service.
   */
  public static function fileUrlGenerator(): FileUrlGeneratorInterface {
    return \Drupal::service('file_url_generator');
  }

  /**
   * Get file information.
   *
   * Retrieves comprehensive information about a file entity including its
   * metadata, URLs, formatted size, and appropriate icon representation.
   *
   * @param int $fid
   *   The ID of the file entity.
   *
   * @return array|null
   *   An array of information for the file containing:
   *   - file: Array with entity, size, filename, mime_type, relative_url, uri,
   *     url, and type.
   *   - icon: FontAwesome icon class for the file type.
   *   Returns NULL if the file cannot be loaded.
   */
  public static function getFileInfo(int $fid): ?array {
    /** @var \Drupal\file\Entity\File $file */
    $file = ThemeHelper::entityTypeManager()->getStorage('file')->load($fid);

    // No file found!
    if (!$file) {
      ThemeHelper::getLogger()->error('Error loading file (fid: @fid)', ['@fid' => $fid]);

      return NULL;
    }

    $file_mime_type = $file->getMimeType();
    $file_size = $file->getSize();
    $file_filename = $file->getFilename();
    $file_url = $file->createFileUrl();
    $file_uri = $file->getFileUri();

    $file_type_info = static::getFileTypeInfo((string) $file_mime_type);

    return [
      'file' => [
        'entity' => $file,
        'size' => static::formatFileSize((int) $file_size),
        'filename' => $file_filename,
        'mime_type' => $file_mime_type,
        'relative_url' => $file_url,
        'uri' => $file_uri,
        'url' => Url::fromUri(static::fileUrlGenerator()->generateAbsoluteString($file_uri)),
        'type' => $file_type_info['file_type'],
      ],
      'icon' => $file_type_info['icon'],
    ];
  }

  /**
   * Formats the file size from bytes into human-readable units.
   *
   * Converts a file size in bytes to a human-readable format using appropriate
   * units (B, KB, MB, GB, etc.). Returns NULL if the file size is zero.
   *
   * @param string|int $file_size
   *   The original file size in bytes.
   *
   * @return string|null
   *   The converted file size with unit (e.g., "1.5 MB") or NULL if size is
   *   zero.
   */
  protected function formatFileSize($file_size): ?string {
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
   * Maps a MIME type to its display icon and file type label.
   *
   * Determines the appropriate FontAwesome icon class and human-readable label
   * based on the file's MIME type. Supports common image, document, and
   * presentation formats.
   *
   * @param string $file_mime_type
   *   The MIME type to map (e.g., 'application/pdf', 'image/jpeg').
   *
   * @return array
   *   An array containing:
   *   - icon: FontAwesome icon class (e.g., 'fa-file-pdf').
   *   - file_type: Human-readable file type label (e.g., 'PDF', 'Excel').
   */
  protected function getFileTypeInfo(string $file_mime_type): array {
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
