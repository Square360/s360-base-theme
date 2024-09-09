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

  $content_view_mode = $paragraph?->field_content_view_mode?->getString();
  $node_id = $paragraph?->field_ern_content?->getString();

  if (!$content_view_mode || !$node_id) {
    return;
  }

  /** @var \Drupal\node\Entity\Node $node */
  $node = $entity_type_manager->getStorage('node')->load($node_id);

  // Make sure it's a valid node and we have the proper access to view it.
  if ($node && $node->access('view')) {
    $render_controller = $entity_type_manager->getViewBuilder('node');
    $variables['curated_node'] = $render_controller->view($node, $content_view_mode);
  }
}

/**
 * Implements hook_preprocess_paragraph() for embed_code.
 */
function s360_base_theme_preprocess_paragraph__embed_code(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];

  $field_embedded_media = $paragraph->field_embedded_media?->first()?->getValue();

  if ($field_embedded_media) {
    $variables['embed_code'] = Markup::create($field_embedded_media['second']);
    $variables['embed_type'] . Html::getClass($field_embedded_media['first']);
  }
}

/**
 * Implements hook_preprocess_paragraph() for in_this_section.
 */
function s360_base_theme_preprocess_paragraph__in_this_section(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];

}
