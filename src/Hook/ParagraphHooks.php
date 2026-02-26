<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Entity\EntityDisplayRepositoryInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Render\Markup;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\menu_link_content\Entity\MenuLinkContent;
use Drupal\paragraphs\ParagraphInterface;
use Drupal\s360_base_theme\ParagraphsEntityHelper;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for paragraphs preprocessing.
 *
 * This class provides centralized paragraphs preprocessing functionality. Each
 * menu should have its own private preprocessing method.
 *
 * Paragraphs-specific methods:
 *  `private function preprocess[BundleName](&$variables, $paragraph)`.
 */
final class ParagraphHooks {

  /**
   * Constructs a new ParagraphHooks instance.
   *
   * @param \Drupal\Core\Menu\MenuLinkTreeInterface $menuLinkTree
   *   The menu link tree service.
   * @param \Drupal\Core\Session\AccountProxyInterface $currentUser
   *   The current user service.
   * @param \Drupal\Core\Entity\EntityDisplayRepositoryInterface $entityDisplayRepository
   *   The entity display repository service.
   */
  public function __construct(
    private readonly MenuLinkTreeInterface $menuLinkTree,
    private readonly AccountProxyInterface $currentUser,
    private readonly EntityDisplayRepositoryInterface $entityDisplayRepository,
  ) {}

  /**
   * Implements hook_preprocess_paragraph().
   */
  #[Hook('preprocess_paragraph')]
  public function preprocessParagraph(array &$variables): void {
    /** @var \Drupal\paragraphs\Entity\ParagraphInterface $paragraph */
    $paragraph = $variables['paragraph'];
    $paragraph_bundle = $paragraph->bundle();

    $variables['attributes']['id'] = Html::getClass('paragraph-' . $paragraph_bundle . '-' . $paragraph->id());

    $paragraph_bundle_method = 'preprocess' . ThemeHelper::toPascalCase($paragraph_bundle);
    if (method_exists($this, $paragraph_bundle_method)) {
      $this->$paragraph_bundle_method($variables, $paragraph);
    }
  }

  /**
   * Preprocesses document_list paragraph variables.
   *
   * @param array $variables
   *   The paragraph variables array being preprocessed.
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The Views Reference paragraph entity.
   */
  private function preprocessDocumentList(&$variables, ParagraphInterface $paragraph): void {
    $variables['documents'] = '';
  }

  /**
   * Preprocesses curated_content paragraph variables.
   *
   * @param array $variables
   *   The paragraph variables array being preprocessed.
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The Views Reference paragraph entity.
   */
  private function preprocessCuratedContent(&$variables, ParagraphInterface $paragraph): void {
    $content_view_mode = $paragraph?->field_content_view_mode?->getString();

    /** @var \Drupal\node\NodeInterface $node */
    $node = $paragraph?->field_ern_content?->entity;

    // Missing node: hide for anonymous.
    if (!$node) {
      if ($this->currentUser->isAnonymous()) {
        return;
      }

      $variables['curated_node'] = [
        '#type' => 'inline_template',
        '#template' => "{% trans %} Node was deleted and cannot be displayed. {% endtrans %}",
      ];

      return;
    }

    $node_bundle = $node->bundle();
    $node_title = $node->label();

    // User does not have access to view this node.
    if (!$node->access('view')) {
      return;
    }

    $entity_display_repository = $this->entityDisplayRepository->getViewModeOptionsByBundle('node', $node_bundle);

    $all_view_modes = array_keys($entity_display_repository);

    // Invalid view mode for node bundle.
    if (!in_array($content_view_mode, $all_view_modes)) {
      if ($this->currentUser->isAnonymous()) {
        return;
      }

      $paragraph->status = FALSE;

      $variables['curated_node'] = [
        '#type' => 'inline_template',
        '#template' => "{% trans %} Node: <strong>'{{ node_title }}'</strong> cannot be display using view mode: <strong>{{ node_view_mode }}</strong>. {% endtrans %}",
        '#context' => [
          'node_title' => $node_title,
          'node_view_mode' => $content_view_mode,
        ],
      ];

      return;
    }

    $view_builder = ThemeHelper::entityTypeManager()->getViewBuilder('node');
    $variables['curated_node'] = $view_builder->view($node, $content_view_mode);

    $variables['#cache']['tags'] = $node->getCacheTags();
    $variables['#cache']['contexts'] = $node->getCacheContexts();
    $variables['#cache']['max-age'] = $node->getCacheMaxAge();
  }

  /**
   * Preprocesses embed_code paragraph variables.
   *
   * @param array $variables
   *   The paragraph variables array being preprocessed.
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The Views Reference paragraph entity.
   */
  private function preprocessEmbedCode(array &$variables, ParagraphInterface $paragraph): void {
    $field_embedded_media = $paragraph->field_embedded_media?->first()?->getValue();

    if ($field_embedded_media) {
      $variables['embed_code'] = Markup::create($field_embedded_media['second']);
      $variables['embed_type'] = Html::getClass($field_embedded_media['first']);
    }
  }

  /**
   * Preprocesses in_this_section paragraph variables.
   *
   * @param array $variables
   *   The paragraph variables array being preprocessed.
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The Views Reference paragraph entity.
   */
  private function preprocessInThisSection(array &$variables, ParagraphInterface $paragraph): void {
    // If no target menu is set, default to "main".
    $field_target_menu = $paragraph?->get('field_target_menu')->getString() ?: 'main';

    $menu_for_current_node = [];

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

    $menu_link_tree = \Drupal::service('menu.link_tree');
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
      $parent_menu_link_content = ThemeHelper::entityTypeManager()->getStorage('menu_link_content')->loadByProperties(['uuid' => $parent_menu_uuid]);
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
    $build['#menu_name'] = 'in-this-section-menu';
    $build["#theme"] = 'menu__in-this-section_menu';

    $variables['menu'] = $build;
    $variables['parent_label'] = $parent_menu_title;
    $variables['parent_label_link'] = $parent_menu_link;
  }

  /**
   * Preprocesses views_reference paragraph variables.
   *
   * @param array $variables
   *   The paragraph variables array being preprocessed.
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The Views Reference paragraph entity.
   */
  private function preprocessViewsReference(array &$variables, ParagraphInterface $paragraph): void {
    // Add the url (complete) as a cache context to field_views_reference.
    $variables["content"]["field_views_reference"]["#cache"]["contexts"][] = 'url';
  }

  /**
   * Preprocesses image paragraph variables.
   *
   * @param array $variables
   *   The paragraph variables array being preprocessed.
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   *   The Views Reference paragraph entity.
   */
  private function preprocessImage(array &$variables, ParagraphInterface $paragraph): void {
    ParagraphsEntityHelper::processImageCaption($paragraph);
  }

}
