<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\Markup;

/**
 * Menu preprocesses for s360_base_theme theme.
 */
class PreprocessMenu {

  public function __construct() {}

  /**
   * Implements hook_preprocess_menu().
   */
  #[Hook('preprocess_menu')]
  public function preprocessMenu(&$variables): void {
    $menu_name = $variables['menu_name'];

    $variables['menu_name'] = Html::getClass($menu_name);

    $menu_name_method = 'preprocess' . convertToPascalCase($menu_name) . 'Menu';
    if (method_exists($this, $menu_name_method)) {
      $this->$menu_name_method($variables);
    }
  }

  /**
   * Preprocess for social menu.
   */
  public function preprocessSocialMenu(&$variables): void {
    $site_name = \Drupal::config('system.site')->get('name');

    foreach ($variables['items'] as &$item) {
      $item_title = &$item['title'];

      $item['url']->setOptions([
        'attributes' => [
          'aria-label' => "Go to $site_name's $item_title page",
          'title' => $item_title,
        ],
      ]);

      $fa_icon = s360_base_theme_get_social_icon($item_title);

      $item_title = Markup::create('<i class="' . $fa_icon . '"></i>');
    }
  }

}
