<?php

/**
 * @file
 * preprocess-paragraph.php
 *
 * Define all paragraph preprocess HOOKs. Each bundle should provide it's own
 * hook function. e.g. `s360_base_theme_preprocess_paragraph__[bundle]`
 */

use Drupal\Component\Utility\Html;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Render\Markup;
use Drupal\menu_link_content\Entity\MenuLinkContent;

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
  $variables['documents'] = '';
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
    $variables['embed_type'] = Html::getClass($field_embedded_media['first']);
  }
}

/**
 * Implements hook_preprocess_paragraph() for in_this_section.
 */
function s360_base_theme_preprocess_paragraph__in_this_section(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];

  // If no target menu is set, default to "main".
  $field_target_menu = $paragraph?->get('field_target_menu')->getString() ?: 'main';

  if ($field_target_menu === 'main') {
    $menu_link_content_query = \Drupal::entityQuery('menu_link_content')
      ->condition('link.uri', 'entity:node/' . $paragraph->getParentEntity()->id())
      ->condition('menu_name', $field_target_menu, 'IN')
      ->sort('id', 'ASC')
      ->accessCheck(TRUE)
      ->range(0, 1);

    $menu_link_content_query_result = $menu_link_content_query->execute();
    $menu_link_id = !empty($menu_link_content_query_result)
      ? reset($menu_link_content_query_result)
      : FALSE;

    if ($menu_link_id) {
      $menu_link = MenuLinkContent::load($menu_link_id);

      $menu_for_current_node = [
        'entity_id' => $menu_link->id(),
        'id' => $menu_link->getPluginId(),
        'title' => $menu_link->getTitle(),
        'menu_name' => $menu_link->getMenuName(),
        'parent' => $menu_link->getParentId(),
      ];
    }
  }

  $parameters = new MenuTreeParameters();
  $parameters->setMinDepth(1);
  $parameters->setMaxDepth(1);
  $parameters->setRoot($menu_for_current_node['id']);

  $menu_link_tree = Drupal::service('menu.link_tree');
  $menu_links = $menu_link_tree->load($menu_for_current_node['menu_name'], $parameters);

  $parent_menu_title = $menu_for_current_node['title'];
  $parent_menu_link = '';

  // No menu links with current root, try the parent.
  if (!$menu_links) {
    // No parent from the current node, do nothing.
    if (empty($menu_for_current_node['parent'])) {
      return;
    }

    $parent_menu_uuid = explode(':', $menu_for_current_node['parent'])[1];

    /** @var Drupal\menu_link_content\Entity\MenuLinkContent $parent_menu_link_content */
    $parent_menu_link_content = \Drupal::entityTypeManager()->getStorage('menu_link_content')->loadByProperties(['uuid' => $parent_menu_uuid]);
    $parent_menu_link_content = reset($parent_menu_link_content);

    $parent_menu_title = $parent_menu_link_content->getTitle();
    $parent_menu_link = $parent_menu_link_content->getUrlObject()->toString();

    $parameters->excludeRoot();
    $parameters->setRoot($menu_for_current_node['parent']);

    $menu_links = $menu_link_tree->load($menu_for_current_node['menu_name'], $parameters);
  }

  $manipulators = [
    ['callable' => 'menu.default_tree_manipulators:checkAccess'],
    ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
  ];

  $menu_links = $menu_link_tree->transform($menu_links, $manipulators);
  $build = $menu_link_tree->build($menu_links);

  $build['#cache']['contexts'][] = 'url.path';
  $build['#menu_name'] = 'section-menu';
  $build["#theme"] = 'menu__section_menu';

  $variables['menu'] = $build;
  $variables['parent_label'] = $parent_menu_title;
  $variables['parent_label_link'] = $parent_menu_link;
}
