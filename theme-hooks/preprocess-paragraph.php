<?php

/**
 * @file
 * preprocess-paragraph.php
 *
 * Define all paragraph preprocess HOOKs. Each bundle should provide it's own
 * hook function. e.g. `s360_base_theme_preprocess_paragraph__[bundle]`
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Render\Markup;

/**
 * Implements hook_preprocess_paragraph().
 */
function s360_base_theme_preprocess_paragraph(&$variables) {
  /** @var \Drupal\paragraph\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];
  $paragraph_bundle = $paragraph->bundle();

  $variables['attributes']['id'] = Html::getClass('paragraph-' . $paragraph_bundle . '-' . $paragraph->id());
}

/**
 * Implements hook_preprocess_paragraph() for document_list.
 */
function s360_base_theme_preprocess_paragraph__document_list(&$variables) {
  /** @var \Drupal\paragraph\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];
}

/**
 * Implements hook_preprocess_paragraph() for curated_content.
 */
function s360_base_theme_preprocess_paragraph__curated_content(&$variables) {
  $entity_type_manager = \Drupal::entityTypeManager();

  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];

  if ($paragraph->hasField('field_ern_content')) {
    $field_ern_content = $paragraph->get('field_ern_content');

    if ($field_ern_content->count()) {
      $node_id = $field_ern_content->getString();
    }
  }

  if ($paragraph->hasField('field_content_view_mode')) {
    $field_content_view_mode = $paragraph->get('field_content_view_mode');

    if ($field_content_view_mode->count()) {
      $content_view_mode = $field_content_view_mode->getString();
    }
  }

  if ($field_ern_content && $field_content_view_mode) {
    /** @var \Drupal\node\Entity\Node $node */
    $node = $entity_type_manager->getStorage('node')->load($node_id);

    // Make sure it's a valid node and we have the proper access to view it.
    if ($node && $node->access('view')) {
      $render_controller = $entity_type_manager->getViewBuilder('node');
      $variables['paragraph_curated_node'] = $render_controller->view($node, $content_view_mode);
    }
  }
}

/**
 * Implements hook_preprocess_paragraph() for embed_code.
 */
function s360_base_theme_preprocess_paragraph__embed_code(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];

  if ($paragraph->hasField('field_embedded_media')) {
    $field_embedded_media = $paragraph->get('field_embedded_media');

    if ($field_embedded_media->count()) {
      $embedded_media = $field_embedded_media->first()->getValue();

      $variables['paragraph_embed_type'] . Html::getClass($embedded_media['first']);
      $variables['paragraph_embed_code'] = Markup::create($embedded_media['second']);
    }
  }
}
