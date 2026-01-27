<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for field preprocessing.
 *
 * This class provides centralized field preprocessing functionality. Fields can
 * be preprocessed by either their machine name or field type, allowing for
 * flexible theming:
 *
 * Field-specific preprocessing:
 *  `protected function preprocessField[FieldName](&$variables)`
 *   Some fields like "title" don't start with "field_", but the method to
 *   process them will.
 *   Example: `preprocessFieldTitle()`, `preprocessFieldBody()`
 *
 * Field type preprocessing:
 *  `protected function preprocessType[FieldType](&$variables)`
 *   Example: `preprocessTypeEntityReference()`, `preprocessTypeImage()`
 */
class FieldHooks {

  /**
   * Implements hook_preprocess_field().
   */
  #[Hook('preprocess_field')]
  public function proprocessField(&$variables): void {
    /* **************************************************
     * Field machine name preprocessing
     */

    $field_name = $variables['field_name'];

    // Remove "field_" prefix if it exists.
    if (str_starts_with($field_name, 'field_')) {
      $field_name = substr($field_name, 6);
    }

    $field_name_method = 'preprocessField' . ThemeHelper::toPascalCase($field_name);
    if (method_exists($this, $field_name_method)) {
      $this->$field_name_method($variables);
    }

    /* *************************************************
     * Field type preprocessing
     */

    $field_type = $variables['field_type'];

    $field_type_method = 'preprocessType' . ThemeHelper::toPascalCase($field_type);
    if (method_exists($this, $field_type_method)) {
      $this->$field_type_method($variables);
    }
  }

}
