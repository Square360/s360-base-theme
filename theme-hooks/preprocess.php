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
  $variables['is_front'] = \Drupal::service('path.matcher')->isFrontPage();
}

/**
 * Implements hook_preprocess_html().
 */
function s360_base_theme_preprocess_html(array &$variables) {
  // Get currently active user and roles.
  $account = \Drupal::currentUser();
  $roles = $account->getRoles();

  // Clear any Drupal classes.
  $variables['attributes']['class'] = [];

  // Add the new class names to the array of classes.
  $variables['attributes']['class'][] = 'site-page';

  if (isset($variables['node_type'])) {
    $variables['attributes']['class'][] = Html::getClass('site-page--node-' . $variables['node_type']);
  }

  if (isset($variables['is_front'])) {
    $variables['attributes']['class'][] = 'site-page--is-front';
  }

  // The getRoles() method will return us the machine names, so there is no need
  // to process roles names additionally. However, I suggest prefixing the names
  // with "role-", so it's more obvious.
  foreach ($roles as $role) {
    $variables['attributes']['class'][] = 'role-' . $role;
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
    $variables['attributes']['class'] = 'region-' . Html::getClass($region);
  }
}

/**
 * Implements hook_preprocess_block().
 */
function s360_base_theme_preprocess_block(array &$variables) {
  $elements = $variables['elements'];

  if (isset($elements['#id'])) {
    $block_name = $elements['#id'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];
    $variables['attributes']['class'][] = 'block-' . Html::getClass($block_name);

    unset($variables['attributes']['id']);
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
