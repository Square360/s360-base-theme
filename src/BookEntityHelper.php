<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Template\Attribute;
use Drupal\book\BookInterface;
use Drupal\node\NodeInterface;

/**
 * Helper class for book operations.
 */
final class BookEntityHelper {

  /**
   * Gets a book's menu links below the book's root page.
   *
   * @param \Drupal\node\NodeInterface|\Drupal\book\BookInterface $node
   *   Any node in the book.
   * @param int $depth
   *   How many levels of links to include below the root; 1 is the top level.
   *
   * @return array|null
   *   An array with the 'menu' render array (links in #items) and its 'cache'
   *   metadata, or NULL when the node is not in a book or there are no links.
   */
  public static function getBookMenu(NodeInterface|BookInterface $node, int $depth = 1): ?array {
    if (!static::isInBook($node)) {
      return NULL;
    }

    $bid = (int) $node->getBook()['bid'];

    /** @var \Drupal\book\BookManager $book_manager */
    $book_manager = \Drupal::service('book.manager');
    $root_link = $book_manager->loadBookLink($bid);

    if (!$root_link) {
      return NULL;
    }

    // The root is depth 1, so its children start at depth 2.
    // Expanded, so the whole tree to $depth is built, not only the active trail.
    $tree_data = $book_manager->bookTreeAllData($bid, $root_link, $depth + 1, NULL, TRUE);
    $tree = reset($tree_data);

    if (!is_array($tree) || empty($tree['below'])) {
      return NULL;
    }

    $menu = $book_manager->bookTreeOutput($tree['below']);

    if (empty($menu['#items'])) {
      return NULL;
    }

    // The tree is filtered by the current user's access to each page.
    $cache = CacheableMetadata::createFromRenderArray($menu);
    $cache->addCacheContexts(['user.permissions', 'user.node_grants:view']);

    // Recursively gathers the node IDs of every link, nested ones included.
    $collect_nids = static function (array $items) use (&$collect_nids): array {
      $nids = [];

      foreach ($items as $nid => $item) {
        $nids[] = $nid;
        $nids = array_merge($nids, $collect_nids($item['below'] ?? []));
      }

      return $nids;
    };

    $nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadMultiple($collect_nids($menu['#items']));

    return [
      'menu' => $menu,
      'cache' => $cache,
    ];
  }

  /**
   * Gets the root page of a node's book as link parts.
   *
   * @param \Drupal\node\NodeInterface|\Drupal\book\BookInterface $node
   *   Any node in the book.
   * @param \Drupal\Core\Cache\CacheableMetadata|null $cache
   *   Receives the cache metadata of the root and the access check, even when
   *   no parent is returned, so the caller can bubble it.
   *
   * @return array|null
   *   An array with 'title', 'title_override' (NULL when empty), 'url' and
   *   'cache', or NULL when the node is not in a book, or the root is missing
   *   or not viewable by the current user.
   */
  public static function getBookParent(NodeInterface|BookInterface $node, ?CacheableMetadata $cache = NULL): ?array {
    if (!static::isInBook($node)) {
      return NULL;
    }

    $parent = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->load((int) $node->getBook()['bid']);

    if (!$parent instanceof NodeInterface) {
      return NULL;
    }

    $access = $parent->access('view', NULL, TRUE);
    $parent_cache = CacheableMetadata::createFromObject($parent)->addCacheableDependency($access);
    $cache?->merge($parent_cache);

    if (!$access->isAllowed()) {
      return NULL;
    }

    return [
      'title' => $parent->label(),
      'url' => NodeEntityHelper::getNodeUrl($parent),
      'cache' => $parent_cache,
    ];
  }

  /**
   * Builds the book menu block.
   *
   * @param array $book_menu
   *   The result of ::getBookMenu().
   * @param array $book_parent
   *   The result of ::getBookParent().
   *
   * @return array
   *   A system menu block render array, using the menu__book theme hook.
   */
  public static function buildBookMenu(array $book_menu, array $book_parent): array {
    return static::buildMenuBlock('book', $book_menu, $book_parent);
  }

  /**
   * Checks whether a node is part of a book tree, root included.
   *
   * @param \Drupal\node\NodeInterface|\Drupal\book\BookInterface $node
   *   The current node entity to check.
   *
   * @return bool
   *   TRUE if the node is part of a book, FALSE otherwise.
   */
  public static function isInBook(NodeInterface|BookInterface $node): bool {
    if (!$node instanceof BookInterface) {
      return FALSE;
    }

    // Nodes can be an allowed book type, but if getBook return empty they are
    // not part of a book tree.
    return !empty($node->getBook());
  }

  /**
   * Checks whether a node is the root page of its book.
   *
   * @param \Drupal\node\NodeInterface|\Drupal\book\BookInterface $node
   *   The current node entity to check.
   *
   * @return bool
   *   TRUE if the node is the book's root, FALSE otherwise.
   */
  public static function isBookRoot(NodeInterface|BookInterface $node): bool {
    return static::isInBook($node) && (int) $node->getBook()['bid'] === (int) $node->id();
  }

  /**
   * Builds a book menu wrapped in a system menu block, so it gets its <nav>.
   *
   * @param string $variant
   *   The menu variant: 'book' or 'microsite'. Sets the theme hook, menu name
   *   and block id.
   * @param array $book_menu
   *   The result of ::getBookMenu().
   * @param array $book_parent
   *   The result of ::getBookParent().
   *
   * @return array
   *   The block render array, with the cache metadata of the menu and parent.
   */
  private static function buildMenuBlock(string $variant, array $book_menu, array $book_parent): array {
    $parent_title = $book_parent['title_override'] ?? $book_parent['title'];

    $menu = $book_menu['menu'];
    $menu['#theme'] = "menu__{$variant}";
    $menu['#menu_name'] = $variant;
    $menu['#items'] = array_merge([
      [
        'title' => $parent_title,
        'url' => $book_parent['url'],
        'attributes' => new Attribute(['class' => 'menu__item--parent']),
      ],
    ], $menu['#items']);

    // Recursively wraps each link title, nested ones included, in a span. The
    // override title is shown in place of the node title when set.
    $wrap_titles = static function (array &$items) use (&$wrap_titles): void {
      foreach ($items as &$item) {
        if (isset($item['title'])) {
          $item['title'] = [
            '#type' => 'html_tag',
            '#tag' => 'span',
            '#value' => $item['title_override'] ?? $item['title'],
          ];
        }

        if (!empty($item['below'])) {
          $wrap_titles($item['below']);
        }
      }
      unset($item);
    };
    $wrap_titles($menu['#items']);

    $block = [
      '#theme' => 'block',
      '#base_plugin_id' => 'system_menu_block',
      '#plugin_id' => "system_menu_block:{$variant}",
      '#derivative_plugin_id' => $variant,
      '#id' => $variant,
      '#configuration' => [
        'id' => $variant,
        'label' => "{$parent_title} Menu",
        'label_display' => FALSE,
        'provider' => 'system',
      ],
      'content' => $menu,
    ];

    (new CacheableMetadata())
      ->merge($book_menu['cache'])
      ->merge($book_parent['cache'])
      ->applyTo($block);

    return $block;
  }

}
