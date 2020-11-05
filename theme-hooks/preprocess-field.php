<?php

/**
 * @file
 * preprocess-field.php
 *
 * Define all field preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_field__address().
 */
function s360_base_theme_preprocess_field__address(&$variables) {
  // Remove the country if it's United States.
  if ($variables['items'][0]['content']['country']['#value'] == 'United States') {
    $variables['items'][0]['content']['country']['#value'] = '';
  }
}

/**
 * Implements hook_preprocess_field__field_email().
 */
function s360_base_theme_preprocess_field__field_email(&$variables) {
  $element = $variables['element'];

  $object = $element['#object'];
  $object_label = $object->label();

  foreach ($variables['items'] as &$item) {
    $url = $item['content']['#url'];

    $url->setOptions([
      'attributes' => [
        'aria-label' => 'Email ' . $object_label,
      ],
    ]);
  }
}
