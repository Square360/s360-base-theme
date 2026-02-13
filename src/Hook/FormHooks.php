<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;
use Drupal\Core\Template\Attribute;

/**
 * Hook implementations for form preprocessing.
 *
 * This class provides centralized form preprocessing functionality.
 */
final class FormHooks {

  /**
   * Implements hook_preprocess_form().
   */
  #[Hook('preprocess_form')]
  public function preprocessForm(&$variables): void {
    $element = $variables['element'];

    $variables['form_name'] = Html::getClass($element['#form_id']);

    $variables['attributes']['class'][] = 'form';
    $variables['attributes']['class'][] = Html::getClass('form--' . $element['#form_id']);
  }

  /**
   * Implements hook_preprocess_webform().
   */
  #[Hook('preprocess_webform')]
  public function preprocessWebform(&$variables): void {
    $element = $variables['element'];

    $variables['form_name'] = Html::getClass($element['#webform_id']);

    $variables['attributes']['class'][] = 'form';
    $variables['attributes']['class'][] = 'form--webform';
    $variables['attributes']['class'][] = Html::getClass('form--' . $element['#webform_id']);
  }

  /**
   * Implements hook_preprocess_form_element().
   */
  #[Hook('preprocess_form_element')]
  public function preprocessFormElement(&$variables): void {
    $element = $variables['element'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'][] = 'form__element';

    if (isset($element['#theme'])) {
      $variables['attributes']['class'][] = Html::getClass('form__element--' . str_replace('__', '-', $element['#theme']));

      // Apply a wrapping div around select elements.
      if ($element['#theme'] === 'select') {
        if (isset($element['#multiple']) && $element['#multiple']) {
          $variables['attributes']['class'][] = Html::getClass('form__element--multiple');
        }

        $variables['children'] = Markup::create('<div class="form__select-wrapper">' . $variables['children'] . '</div>');
      }
    }

    if (isset($element['#name'])) {
      $variables['attributes']['class'][] = Html::getClass('form__element--' . $element['#name']);
    }

    if ($variables['label_display'] !== 'none') {
      $variables['attributes']['class'][] = 'form__element--has-label';
    }

    if (isset($variables['description'])) {
      $variables['attributes']['class'][] = 'form__element--has-description';
    }

    // Create an error attribute.
    $variables['error']['attributes'] = new Attribute();
    $variables['error']['attributes']['class'] = 'form__element-error-message';

    // Create a description attribute.
    $variables['description']['attributes']['class'] = new Attribute();
    $variables['description']['attributes']['class'][] = 'form__description';
  }

  /**
   * Implements hook_preprocess_form_element_label().
   */
  #[Hook('preprocess_form_element_label')]
  public function preprocessFormElementLabel(&$variables): void {
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
  #[Hook('preprocess_fieldset')]
  public function preprocessFieldset(&$variables): void {
    $element = $variables['element'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'][] = 'form__fieldset';

    // Add the new class names to the array of classes.
    if (isset($element['#name'])) {
      $variables['attributes']['class'][] = Html::getClass('form__fieldset--' . $element['#name']);
    }

    // Clear any Drupal classes.
    $variables['legend']['attributes']['class'] = [];
    $variables['legend']['attributes']['class'] = 'form__legend';
  }

  /**
   * Implements hook_preprocess_radios().
   */
  #[Hook('preprocess_radios')]
  public function preprocessRadios(&$variables): void {
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'][] = 'form__radios';
  }

  /**
   * Implements hook_preprocess_checkboxes().
   */
  #[Hook('preprocess_checkboxes')]
  public function preprocessCheckboxes(&$variables): void {
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'][] = 'form__checkboxes';
  }

  /**
   * Implements hook_preprocess_input().
   */
  #[Hook('preprocess_input')]
  public function preprocessInput(&$variables): void {
    $element = $variables['element'];
    $id = $element['#id'];

    $type = $element['#type'];

    // Set the form input type "class" to reset.
    if ($type === 'submit' && str_contains($id, 'reset')) {
      $type = 'reset';
    }

    $variables['attributes']['class'][] = 'form__input';
    $variables['attributes']['class'][] = Html::getClass('form__input--' . $type);
  }

}
