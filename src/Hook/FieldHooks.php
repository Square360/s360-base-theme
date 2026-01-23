<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\s360_base_theme\ThemeUtils;

/**
 * Hook implementations for fields.
 *
 * Each field machine_name should have it's own protected method. Some fields
 * like "title" don't start with "field_", but the method to process them will.
 * `protected function preprocessField[FieldName](&$variables)`.
 *
 * Each `field_type` should have it's own protected method.
 * `protected function preprocessType[PluginId](&$variables)`.
 */
class FieldHooks {

  /**
   * Implements hook_preprocess_field().
   */
  #[Hook('preprocess_field')]
  public function proprocessField(&$variables): void {
    /*
     * ***********************************************
     * The machine name of the field.
     */

    $field_name = $variables['field_name'];

    // Remove "field_" prefix if it exists.
    if (str_starts_with($field_name, 'field_')) {
      $field_name = substr($field_name, 6);
    }
    $field_name_method = 'preprocessField' . ThemeUtils::toPascalCase($field_name);
    if (method_exists($this, $field_name_method)) {
      $this->$field_name_method($variables);
    }

    /*
     * *************************************************
     * The type of field.
     */

    $field_type = $variables['field_type'];

    $field_type_method = 'preprocessType' . ThemeUtils::toPascalCase($field_type);
    if (method_exists($this, $field_type_method)) {
      $this->$field_type_method($variables);
    }
  }

}
