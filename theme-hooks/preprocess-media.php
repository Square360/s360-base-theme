<?php

/**
 * @file
 * preprocess-media.php
 *
 * Define all media preprocess HOOKs.
 */

use Drupal\Component\Utility\Html;
use Drupal\image\Entity\ImageStyle;
use Drupal\responsive_image\Entity\ResponsiveImageStyle;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_preprocess_responsive_image() for images.
 */
function s360_base_theme_preprocess_responsive_image(&$variables) {
  // Set explicit height and width
  // See https://www.drupal.org/project/drupal/issues/3192234.
  // Get width and height from fallback responsive image style and transfer them
  // to img tag so browser can do aspect ratio calculation and prevent
  // recalculation of layout on image load.
  // We are assuming that all image styles in this responsive image have the
  // same aspect ratio.
  $responsive_image_style = ResponsiveImageStyle::load($variables['responsive_image_style_id']);
  $image_style = ImageStyle::load($responsive_image_style->getFallbackImageStyle());
  $build_uri = $image_style->buildUri($variables['uri']);

  if (!file_exists($build_uri)) {
    $image_style->createDerivative($variables['uri'], $build_uri);
  }

  $image_factory = \Drupal::service('image.factory')->get($build_uri);
  $height = $image_factory->getToolkit()->getHeight();
  $width = $image_factory->getToolkit()->getWidth();
  $variables['img_element']['#attributes']['class'][] = $variables['responsive_image_style_id'];

  if ($width && $height) {
    $variables['img_element']['#width'] = $width;
    $variables['img_element']['#height'] = $height;
    // @todo add width and height attributes per source.
  }
}

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
