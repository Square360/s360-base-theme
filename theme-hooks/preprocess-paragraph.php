<?php

/**
 * @file
 * preprocess-paragraph.php
 *
 * Define all paragraph preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_paragraph().
 */
function s360_base_theme_preprocess_paragraph(&$variables) {
  $elements = $variables['elements'];

  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];
  $paragraph_bundle = $paragraph->bundle();
  $paragraph_view_mode = $elements['#view_mode'];

  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'paragraph';
  $variables['attributes']['class'][] = Html::getClass("paragraph--$paragraph_bundle");
  $variables['attributes']['class'][] = Html::getClass("paragraph--$paragraph_view_mode");
}
