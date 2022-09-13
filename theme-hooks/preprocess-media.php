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
use Drupal\Core\Url;

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

  if ($media_bundle !== 'document') {
    $variables['attributes']['role'] = 'group';
  }
  else {
    if ($media_view_mode !== 'default') {
      s360_base_theme_preprocess_media__document($variables);
    }
  }

  $variables['attributes']['class'] = [];
  $variables['attributes']['class'][] = 'media';
  $variables['attributes']['class'][] = Html::getClass("media--$media_bundle");
  $variables['attributes']['class'][] = Html::getClass("media--$media_view_mode");
}

/**
 * Implements hook_preprocess_media() for document.
 */
function s360_base_theme_preprocess_media__document(&$variables) {
  $elements = $variables['elements'];

  $entity_type_manager = \Drupal::entityTypeManager();

  /** @var \Drupal\media\Entity\Media $media */
  $media = $variables['media'];
  $media_label = $media->label();
  $media_view_mode = $elements['#view_mode'];

  if ($media->hasField('field_media_document')) {
    $field_media_document = $media->get('field_media_document');

    if ($field_media_document->count()) {
      /** @var \Drupal\file\Entity\File $file */
      $file = $entity_type_manager->getStorage('file')->load($field_media_document->target_id);
      $file_mime_type = $file->getMimeType();
      $file_size = $file->getSize();
      $file_filename = $file->getFilename();
      $file_url = $file->createFileUrl();

      $media_url = Url::fromUri(\Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri()));

      switch ($file_mime_type) {
        // .pdf extension.
        case 'application/pdf':
          $icon_class = 'fal fa-file-pdf';
          break;

        // .doc and .docx extensions.
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          $icon_class = 'fal fa-file-word';
          break;

        // .xls and .xlsx extensions.
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          $icon_class = 'fal fa-file-excel';
          break;

        default:
          $icon_class = 'fal fa-file';
          break;
      }

      if ($media_view_mode === 'icon_only') {
        $variables['media_link'] = [
          '#type' => 'link',
          '#attributes' => [
            'title'=> $media_label,
            'aria-label' => "Download $media_label",
          ],
          '#title' => Markup::create('<i class="' . $icon_class . '"></i>'),
          '#url' => $media_url,
        ];
      }
      else {
        $variables['media_link'] = [
          '#type' => 'link',
          '#title' => Markup::create('<i class="' . $icon_class . '"></i><span>' . $media_label . '</span>'),
          '#url' => $media_url,
        ];
      }
    }
  }
}
