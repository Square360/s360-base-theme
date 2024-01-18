<?php

/**
 * @file
 * preprocess-media.php
 *
 * Define all media preprocess HOOKs.
 */

/**
 * Implements hook_preprocess_media().
 */
function s360_base_theme_preprocess_media(&$variables) {
  /** @var \Drupal\media\Entity\Media $media */
  $media = $variables['media'];
}
