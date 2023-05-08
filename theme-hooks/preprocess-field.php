<?php

/**
 * @file
 * preprocess-field.php
 *
 * Define all field preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_field().
 */
function s360_base_theme_preprocess_field(&$variables) {
}

/**
 * Implements hook_preprocess_field() for address.
 */
function s360_base_theme_preprocess_field__address(&$variables) {
  // We always want to remove United States.
  if ($variables['items'][0]['content']['country']['#value'] === 'United States') {
    $variables['items'][0]['content']['country']['#value'] = '';
  }
}
