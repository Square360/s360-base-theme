<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for menu preprocessing.
 *
 * This class provides centralized menu preprocessing functionality. Each menu
 * should have its own private preprocessing method.
 *
 * Menu-specific methods:
 *  `private function preprocess[MenuName]Menu(&$variables)`
 */
final class MenuHooks {

  /**
   * Implements hook_preprocess_menu().
   */
  #[Hook('preprocess_menu')]
  public function preprocessMenu(&$variables): void {
    $menu_name = $variables['menu_name'];

    $variables['menu_name'] = Html::getClass($menu_name);

    if (!in_array($menu_name, ['admin', 'devel'])) {
      // Clear any Drupal classes.
      $variables['attributes']['class'] = [];
    }

    $menu_name_method = 'preprocess' . ThemeHelper::toPascalCase($menu_name) . 'Menu';
    if (method_exists($this, $menu_name_method)) {
      $this->$menu_name_method($variables);
    }
  }

  /**
   * Preprocesses Social Menu variables.
   *
   * @param array $variables
   *   An associative array containing:
   *   - items: Array of menu link items to be enhanced.
   */
  private function preprocessSocialMenu(array &$variables): void {
    $site_name = \Drupal::config('system.site')->get('name');

    foreach ($variables['items'] as &$item) {
      $item_title = &$item['title'];

      $item['url']->setOptions([
        'attributes' => [
          'aria-label' => "Go to $site_name's $item_title page",
          'title' => $item_title,
        ],
      ]);

      $fa_icon = ThemeHelper::getSocialIcon($item_title);

      $item_title = Markup::create('<i class="' . $fa_icon . '"></i>');
    }
  }

}
