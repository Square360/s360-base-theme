<?php

/**
 * @file
 * preprocess-paragraph.php
 *
 * Define all paragraph preprocess HOOKs. Each bundle should provide it's own
 * hook function. e.g. `s360_base_theme_preprocess_paragaraph__[bundle]`
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_paragraph().
 */
function s360_base_theme_preprocess_paragraph(&$variables) {
  /** @var \Drupal\paragraph\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];
  $paragraph_bundle = $paragraph->bundle();
  $paragraph_bundle_safe = Html::getClass($paragraph_bundle);

  $variables['attributes']['id'] = 'paragraph-' . $paragraph_bundle_safe . '-' . $paragraph->id();
}
