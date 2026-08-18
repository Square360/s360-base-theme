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
 * Field-specific methods:
 *   Some fields like "title" don't start with "field_", but the method to
 *   process them will.
 *  `protected function preprocessField[FieldName](&$variables)`
 *   Example: `preprocessFieldTitle()`, `preprocessFieldBody()`
 *
 * Field type methods:
 *  `protected function preprocessType[FieldType](&$variables)`
 *   Example: `preprocessTypeEntityReference()`, `preprocessTypeImage()`
 */
final class FieldHooks {

  /**
   * Implements hook_preprocess_field().
   */
  #[Hook('preprocess_field')]
  public function proprocessField(array &$variables): void {
    /* **************************************************
     * Field machine name preprocessing
     */

    $field_name = $variables['field_name'];

    // Remove "field_" prefix if it exists.
    if (str_starts_with($field_name, 'field_')) {
      $field_name = substr($field_name, 6);
    }

    $field_name_method = ThemeHelper::toPascalCase("preprocessField{$field_name}");
    if (method_exists($this, $field_name_method)) {
      $this->$field_name_method($variables);
    }

    /* *************************************************
     * Field type preprocessing
     */

    $field_type = $variables['field_type'];

    $field_type_method = ThemeHelper::toPascalCase("preprocessType{$field_type}");
    if (method_exists($this, $field_type_method)) {
      $this->$field_type_method($variables);
    }
  }

  /**
   * Implements hook_preprocess_field() for field_social_links.
   */
  protected function preprocessFieldSocialLinks(array &$variables) {
    $element = $variables['element'];

    /** @var \Drupal\Core\Entity\EntityInterface $object */
    $object = $element['#object'];
    $object_label = $object->label();

    foreach ($variables['items'] as &$item) {
      $url = $item['content']['#url'];
      $item_content_title = &$item['content']['#title'];

      $social_info = ThemeHelper::getSocialInfo($item_content_title);

      $url->setOptions([
        'attributes' => [
          'aria-label' => "Go to {$object_label}'s {$social_info['name']} page",
        ],
      ]);

      $item_content_title = [
        '#theme' => 'social_icon',
        '#social_name' => $social_info['icon'],
      ];
    }
  }

}
