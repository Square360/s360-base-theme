<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Config\ImmutableConfig;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Field\FieldItemList;
use Psr\Log\LoggerInterface;

/**
 * Provides helper functions for S360 Base Theme.
 */
final class ThemeHelper {

  /**
   * The logger instance.
   *
   * @var \Psr\Log\LoggerInterface|null
   */
  private static ?LoggerInterface $logger = NULL;

  /**
   * The entity type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface|null
   */
  private static ?EntityTypeManagerInterface $entityTypeManager = NULL;

  /**
   * Gets the logger instance for the s360_base_theme theme.
   *
   * Lazy-loads and returns a logger instance for this themes channel.
   * Uses a static property to ensure only one logger instance is created.
   */
  public static function getLogger(): LoggerInterface {
    if (static::$logger === NULL) {
      static::$logger = \Drupal::logger('s360_base_theme');
    }

    return static::$logger;
  }

  /**
   * Gets the entity type manager service.
   *
   * Lazy-loads and caches the entity type manager for efficient reuse.
   */
  public static function entityTypeManager(): EntityTypeManagerInterface {
    if (static::$entityTypeManager === NULL) {
      static::$entityTypeManager = \Drupal::entityTypeManager();
    }

    return static::$entityTypeManager;
  }

  /**
   * Gets the config factory service.
   */
  public static function config(string $name): ImmutableConfig {
    return \Drupal::config($name);
  }

  /**
   * Takes any string and convert it to PascalCase (UpperCamelCase) format.
   *
   * Removes all hyphens, underscores, or spaces and formats it by capitalizing
   * the first letter of each word and removing all separators.
   *
   * @param string $string
   *   The string to convert (can contain hyphens, underscores, or spaces).
   *
   * @return string
   *   The converted string in PascalCase format.
   */
  public static function toPascalCase(string $string): string {
    // Replace hyphens and underscores with spaces.
    $string = str_replace(['-', '_'], ' ', $string);

    // Convert the entire string to lowercase first.
    $string = strtolower($string);

    // Capitalize the first letter of each word.
    $string = ucwords($string);

    // Remove all spaces.
    $string = str_replace(' ', '', $string);

    return $string;
  }

  /**
   * Returns FontAwesome icon classes for a social network.
   *
   * Maps social network names to their corresponding FontAwesome icon classes.
   * Returns a default globe icon if the social network is not recognized.
   *
   * @param string $social_name
   *   The name of a social network.
   *
   * @return array
   *   The FontAwesome icon classes for the specified social network.
   *   Returns 'far fa-globe' if the social network is not recognized.
   */
  public static function getSocialInfo(string $social_name): array {
    $normalized = strtolower(trim($social_name));
    $normalized = str_replace(['-', '_'], ' ', $normalized);
    $normalized = preg_replace('/\s+/', ' ', $normalized) ?? '';

    $platforms = [
      [
        'match' => ['facebook.com', 'facebook'],
        'name' => 'Facebook',
        'icon' => 'facebook',
        'family' => 'fab',
      ],
      [
        'match' => ['instagram.com', 'instagram'],
        'name' => 'Instagram',
        'icon' => 'instagram',
        'family' => 'fab',
      ],
      [
        'match' => ['linkedin.com', 'linkedin'],
        'name' => 'LinkedIn',
        'icon' => 'linkedin',
        'family' => 'fab',
      ],
      [
        'match' => ['youtube.com', 'youtu.be', 'youtube'],
        'name' => 'YouTube',
        'icon' => 'youtube',
        'family' => 'fab',
      ],
      [
        'match' => ['threads.net', 'threads.com', 'threads'],
        'name' => 'Threads',
        'icon' => 'threads',
        'family' => 'fab',
      ],
      [
        'match' => ['x.com', 'twitter.com', 'twitter', 'x twitter', 'twitter x'],
        'name' => 'X',
        'icon' => 'x-twitter',
        'family' => 'fab',
      ],
      [
        'match' => ['bsky.social', 'bsky.app', 'bsky', 'bluesky'],
        'name' => 'Bluesky',
        'icon' => 'bluesky',
        'family' => 'fab',
      ],
    ];

    foreach ($platforms as $platform) {
      foreach ($platform['match'] as $match) {
        if (str_contains($normalized, $match)) {
          return [
            'name' => $platform['name'],
            'icon' => $platform['icon'],
            'family' => $platform['family'],
          ];
        }
      }
    }

    return [
      'name' => 'Website',
      'icon' => 'globe',
      'family' => 'far'
    ];
  }

  /**
   * Validates that a content entity field exists and has at least one value.
   * Returns the field item list when the field is available and non-empty.
   * Returns NULL when the field is missing or empty.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface $entity
   *   The content entity that may contain the field.
   * @param string $field_name
   *   The machine name of the field to validate.
   *
   * @return \Drupal\Core\Field\FieldItemList|null
   *   The field item list if valid, otherwise NULL.
   */
  public static function validateField(ContentEntityInterface $entity, string $field_name): ?FieldItemList {
    if (!$entity->hasField($field_name)) {
      return NULL;
    }

    $field_item = $entity->get($field_name);

    if ($field_item->isEmpty()) {
      return NULL;
    }

    return $field_item;
  }

}
