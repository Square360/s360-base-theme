<?php

/**
 * @file
 * preprocess-paragraph.php
 *
 * Define all paragraph preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_paragraph().
 */
function kmha_preprocess_paragraph(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];

}
