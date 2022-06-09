<?php

/**
 * @file
 * preprocess-form.php
 *
 * Define all form preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Template\Attribute;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_preprocess_form().
 */
function s360_base_theme_preprocess_form(&$variables) {
  $element = $variables['element'];

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  $variables['attributes']['class'][] = 'form';
  $variables['attributes']['class'][] = Html::getClass('form--' . $element['#form_id']);
}

/**
 * Implements hook_preprocess_webform().
 */
function s360_base_theme_preprocess_webform(&$variables) {
  $element = $variables['element'];

  $variables['attributes']['class'][] = 'form';
  $variables['attributes']['class'][] = 'form--' . Html::getClass($element['#webform_id']);
}

/**
 * Implements hook_preprocess_form_element().
 */
function s360_base_theme_preprocess_form_element(&$variables) {
  $element = $variables['element'];

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  $variables['attributes']['class'][] = 'form__element';

  if (isset($element['#theme'])) {
    $variables['attributes']['class'][] = Html::getClass('form__element--' . str_replace('__', '-', $element['#theme']));

    // Apply a wrapping div around select elements.
    if ($element['#theme'] === 'select') {
      $variables['children'] = Markup::create('<div class="form__select-wrapper">' . $variables['children'] . '</div>');
    }
  }

  if (isset($element['#name'])) {
    $variables['attributes']['class'][] = Html::getClass('form__element--' . $element['#name']);
  }

  // Create an error attribute.
  $variables['error']['attributes'] = new Attribute();
  $variables['error']['attributes']['class'] = 'form__element-error-message';

  $variables['description']['attributes']['class'] = new Attribute();
  $variables['description']['attributes']['class'][] = 'form__description';
}

/**
 * Implements hook_preprocess_form_element_label().
 */
function s360_base_theme_preprocess_form_element_label(&$variables) {
  $element = $variables['element'];

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  $variables['attributes']['class'][] = 'form__label';
  $variables['attributes']['class'][] = Html::getClass('form__label--' . $element['#title']);

  if (isset($element['#required']) && $element['#required']) {
    $variables['attributes']['class'][] = 'form-element__label--required';
  }
}

/**
 * Implements hook_preprocess_fieldset().
 */
function s360_base_theme_preprocess_fieldset(&$variables) {
  $element = $variables['element'];

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  // Add the new class names to the array of classes.
  $variables['attributes']['class'][] = 'form__fieldset';
  $variables['attributes']['class'][] = Html::getClass('form__fieldset--' . $element['#name']);

  // Clear any Drupal classes.
  $variables['legend']['attributes']['class'] = [];

  $variables['legend']['attributes']['class'] = 'form__legend';
}

/**
 * Implements hook_preprocess_radios().
 */
function s360_base_theme_preprocess_radios(&$variables) {
  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'form__radios';
}

/**
 * Implements hook_preprocess_checkboxes().
 */
function s360_base_theme_preprocess_checkboxes(&$variables) {
  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'form__checkboxes';
}

/**
 * Implements hook_preprocess_input().
 */
function s360_base_theme_preprocess_input(&$variables) {
  $element = $variables['element'];

  $variables['attributes']['class'][] = 'form__input';
  $variables['attributes']['class'][] = Html::getClass('form__input--' . $element['#type']);
}
