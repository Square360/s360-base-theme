<?php

/**
 * @file
 * preprocess-taxonomy.php
 *
 * Define all the preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_taxonomy_term().
 */
function s360_base_theme_preprocess_taxonomy_term(array &$variables) {
  $elements = $variables['elements'];

  if (isset($elements['#taxonomy_term'])) {
    /** @var \Drupal\taxonomy\Entity\Term $taxonomy_term */
    $taxonomy_term = $elements['#taxonomy_term'];
    $taxonomy_term_bundle = $taxonomy_term->bundle();
    $taxonomy_term_view_mode = $elements['#view_mode'];

    // Clear any Drupal classes.
    $variables['attributes']['class'] = [];

    // Add the new class names to the array of classes.
    $variables['attributes']['class'][] = Html::getClass('taxonomy');
    $variables['attributes']['class'][] = Html::getClass("taxonomy--$taxonomy_term_bundle");
    $variables['attributes']['class'][] = Html::getClass('taxonomy--term-' . $taxonomy_term->getName());
    $variables['attributes']['class'][] = Html::getClass("taxonomy--$taxonomy_term_view_mode");

    unset($variables['attributes']['about']);
  }
}
