<?php

/**
 * @file
 * theme-suggestions.php
 *
 * Defines all the theme suggestion HOOKs.
 */

/**
 * Implements hook_theme_suggestions_page_alter().
 */
function s360_base_theme_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  $exception = Drupal::requestStack()->getCurrentRequest()->attributes->get('exception');

  if (!is_null($exception)) {
    $suggestions[] = 'page__' . (string) $exception->getStatusCode();
  }

  // Add content type suggestions.
  if ($node = \Drupal::request()->attributes->get('node')) {
    array_splice($suggestions, 1, 0, 'page__node__' . $node->getType());
  }
}

/**
 * Implements hook_theme_suggestions_taxonomy_term_alter().
 */
function s360_base_theme_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  $term = $variables['elements']['#taxonomy_term'];
  $term_bundle = $term->bundle();

  $view_mode = strtr($variables['elements']['#view_mode'], '.', '_');

  $suggestions = [];

  $suggestions[] = 'taxonomy_term__' . $view_mode;
  $suggestions[] = 'taxonomy_term__' . $term_bundle;
  $suggestions[] = 'taxonomy_term__' . $term_bundle . '__' . $view_mode;
  $suggestions[] = 'taxonomy_term__' . $term->id();
  $suggestions[] = 'taxonomy_term__' . $term->id() . '__' . $view_mode;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function s360_base_theme_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  if (isset($variables['element']['#type'])) {
    if ($variables['element']['#type'] == 'view') {
      $suggestions[] = 'container__' .
        $variables['element']['#type'];

      $suggestions[] = 'container__' .
        $variables['element']['#type'] . '__' .
        $variables['element']['#name'];

      $suggestions[] = 'container__' .
        $variables['element']['#type'] . '__' .
        $variables['element']['#name'] . '__' .
        $variables['element']['#display_id'];
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function s360_base_theme_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'form__' . str_replace('-', '_', $variables['element']['#id']);
}
