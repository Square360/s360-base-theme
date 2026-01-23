<?php

namespace Drupal\s360_base_theme;

/**
 * Utility function for the theme.
 */
class ThemeUtils {

  /**
   * Converts a string to PascalCase format.
   *
   * @param string $string
   *   The string to convert (can contain hyphens, underscores, or spaces).
   *
   * @return string
   *   The converted string in PascalCase format.
   */
  public static function toPascalCase($string): string {
    // Replace hyphens and underscores with spaces.
    $string = str_replace(['-', '_'], ' ', $string);

    // Convert the entire string to lowercase first.
    $string = strtolower($string);

    // Capitalize the first letter of each word.
    $string = ucwords($string);

    // Remove all spaces.
    $pascalCaseString = str_replace(' ', '', $string);

    return $pascalCaseString;
  }

  /**
   * Returns FA classes based on the name of a social network or a global.
   *
   * @param string $social_name
   *   The name of a social network.
   *
   * @return string
   *   The FontAwesome classes of the provided social network.
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
