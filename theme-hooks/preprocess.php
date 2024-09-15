<?php

/**
 * @file
 * preprocess.php
 *
 * Define all the preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess().
 */
function s360_base_theme_preprocess(array &$variables) {
  // Get currently active user and roles.
  $account = \Drupal::currentUser();

  $variables['is_front'] = \Drupal::service('path.matcher')->isFrontPage();
  $variables['user_roles'] = implode(', ', $account->getRoles());
}

/**
 * Implements hook_preprocess_html().
 */
function s360_base_theme_preprocess_html(array &$variables) {
  // Add the new class names to the array of classes.
  $variables['attributes']['class'][] = 'site-page';
  $variables['attributes']['data-roles'] = $variables['user_roles'];

  if (isset($variables['node_type'])) {
    $variables['attributes']['class'][] = Html::getClass('site-page--node-' . $variables['node_type']);
  }

  if (isset($variables['is_front']) && $variables['is_front'] === TRUE) {
    $variables['attributes']['class'][] = 'site-page--is-front';
  }
}

/**
 * Implements hook_preprocess_region().
 */
function s360_base_theme_preprocess_region(array &$variables) {
  $elements = $variables['elements'];

  if (isset($elements['#region'])) {
    $region = $elements['#region'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'] = Html::getClass("region-$region");
  }
}

/**
 * Implements hook_preprocess_container().
 */
function s360_base_theme_preprocess_container(array &$variables) {
  $element = $variables['element'];

  if (isset($element['#type'])) {
    if (in_array($element['#type'], ['actions', 'webform_actions'])) {
      // Clear any Drupal classes.
      $variables['attributes']['class'] = [];

      $variables['attributes']['class'][] = 'form__element';
      $variables['attributes']['class'][] = 'form__element--actions';
    }
  }
}
