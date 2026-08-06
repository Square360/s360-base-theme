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
 * should have its own protected preprocessing method.
 *
 * Menu-specific methods:
 *  `protected function preprocess[MenuName]Menu(&$variables)`
 */
final class MenuHooks {

  /**
   * Implements hook_preprocess_menu().
   */
  #[Hook('preprocess_menu')]
  public function preprocessMenu(array &$variables): void {
    $menu_name = $variables['menu_name'];

    $variables['menu_name'] = Html::getClass($menu_name);

    if (!in_array($menu_name, ['admin', 'devel'])) {
      // Clear any Drupal classes.
      $variables['attributes']['class'] = [];
    }

    $menu_name_method = ThemeHelper::toPascalCase("preprocess{$menu_name}Menu");
    if (method_exists($this, $menu_name_method)) {
      $this->$menu_name_method($variables);
    }
  }

  /**
   * Implements hook_preprocess_menu_local_task().
   */
  #[Hook('preprocess_menu_local_task')]
  public function preprocessMenuLocalTask(array &$variables) {
    $variables['attributes']['class'][] = 'menu__item';
  }

  /**
   * Preprocesses Social Menu variables.
   *
   * @param array $variables
   *   An associative array containing:
   *   - items: Array of menu link items to be enhanced.
   */
  protected function preprocessSocialMenu(array &$variables): void {
    $site_name = ThemeHelper::config('system.site')->get('name');

    foreach ($variables['items'] as &$item) {
      $item_title = &$item['title'];

      $social_info = ThemeHelper::getSocialInfo($item_title);

      $item['url']->setOptions([
        'attributes' => [
          'aria-label' => "Go to $site_name's {$social_info['name']} page",
          'title' => $item_title,
        ],
      ]);

      $item_title = [
        '#theme' => 'social_icon',
        '#social_name' => $social_info['icon'],
      ];
    }
  }

}
