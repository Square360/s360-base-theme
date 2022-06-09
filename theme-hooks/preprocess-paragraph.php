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
function kmha_preprocess_paragraph(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];
  $paragraph_bundle = $paragraph->bundle();

  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'paragraph';
  $variables['attributes']['class'][] = Html::getClass("paragraph--$paragraph_bundle");
}
