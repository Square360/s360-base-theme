<?php

/**
 * @file
 * preprocess-media.php
 *
 * Define all media preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_media().
 */
function s360_base_theme_preprocess_media(&$variables) {
  $elements = $variables['elements'];

  /** @var \Drupal\media\Entity\Media $media */
  $media = $variables['media'];

  $media_bundle = $media->bundle();
  $media_view_mode = $elements['#view_mode'];

  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'media';
  $variables['attributes']['class'][] = Html::getClass("media--$media_bundle");
  $variables['attributes']['class'][] = Html::getClass("media--$media_view_mode");
}
