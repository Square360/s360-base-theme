<?php

namespace Drupal\s360_base_theme;

use Drupal\Core\Config\ImmutableConfig;
use Drupal\Core\Entity\EntityTypeManagerInterface;
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
   */
  public static function entityTypeManager(): EntityTypeManagerInterface {
    return \Drupal::service('entity_type.manager');
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
   * @return string
   *   The FontAwesome icon classes for the specified social network.
   *   Returns 'fal fa-globe' if the social network is not recognized.
   */
  public static function getSocialIcon(string $social_name): string {
    switch ($social_name) {
      case 'LinkedIn':
        return 'fab fa-linkedin';

      case 'Twitter':
        return 'fab fa-twitter';

      case 'X Twitter':
      case 'Twitter X':
      case 'X':
        return 'fab fa-x-twitter';

      case 'Facebook':
        return 'fab fa-facebook';

      case 'Instagram':
        return 'fab fa-instagram';

      case 'YouTube':
        return 'fab fa-youtube';

      case 'Apple':
      case 'Apple Podcast':
      case 'iTunes':
        return 'fab fa-apple';

      case 'Flickr':
      case 'Flicker':
        return 'fab fa-flickr';

      case 'Threads':
      case 'Thread':
        return 'fab fa-threads';

      default:
        return 'fal fa-globe';
    }
  }

}
