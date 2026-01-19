<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Field preprocesses for s360_base_theme theme.
 */
class PreprocessField {

  public function __construct() {}

  /**
   * Implements hook_preprocess_field().
   */
  #[Hook('preprocess_field')]
  public function proprocessField(&$variables): void {
    // The machine name of the field.
    $field_name = $variables['field_name'];

    // The type of field.
    $field_type = $variables['field_type'];

    $field_name_method = 'preprocess' . s360_base_theme_convert_to_pascal_case($field_name);
    if (method_exists($this, $field_name_method)) {
      $this->$field_name_method($variables);
    }

    $field_type_method = 'preprocess' . s360_base_theme_convert_to_pascal_case($field_type);
    if (method_exists($this, $field_type_method)) {
      $this->$field_type_method($variables);
    }
  }

}
