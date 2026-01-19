<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Utility\Html;
use Drupal\Core\Hook\Attribute\Hook;

/**
 * Processes for s360_base_theme theme.
 */
class Preprocess {

  public function __construct() {}

  /**
   * Implements hook_preprocess().
   */
  #[Hook('preprocess')]
  public function preprocess(array &$variables): void {
    // Get currently active user and roles.
    $account = \Drupal::currentUser();

    $variables['is_front'] = \Drupal::service('path.matcher')->isFrontPage();
    $variables['user_roles'] = implode(', ', $account->getRoles());
  }

  /**
   * Implements hook_preprocess_html().
   */
  #[Hook('preprocess_html')]
  public function preprocessHtml(array &$variables): void {
    // Add the new class names to the array of classes.
    $variables['attributes']['class'][] = 'site-page';
    $variables['attributes']['data-roles'] = $variables['user_roles'];

    /** @var Symfony\Component\Routing\Route $route */
    $route = \Drupal::routeMatch()->getRouteObject();
    $path = $route->getPath();

    if (str_starts_with($path, '/node')) {
      /** @var \Drupal\node\Entity\Node $node */
      $node = \Drupal::routeMatch()->getParameter('node');

      if (isset($variables['node_type'])) {
        $variables['attributes']['class'][] = Html::getClass('site-page--node-' . $variables['node_type']);
      }
    }

    if (isset($variables['is_front']) && $variables['is_front'] === TRUE) {
      $variables['attributes']['class'][] = 'site-page--is-front';
    }
  }

  /**
   * Implements hook_preprocess_region().
   */
  #[Hook('preprocess_region')]
  public function preprocessRegion(array &$variables): void {
    $elements = $variables['elements'];

    if (isset($elements['#region'])) {
      $region = $elements['#region'];

      // Clear any Drupal classes.
      $variables['attributes']['class'] = [];
      $variables['attributes']['class'] = Html::getClass("region-$region");
    }
  }

  /**
   * Implements hook_preprocess_container().
   */
  #[Hook('preprocess_container')]
  public function preprocessContainer(array &$variables): void {
    $element = $variables['element'];

    if (isset($element['#type'])) {
      if (in_array($element['#type'], ['actions', 'webform_actions'])) {
        // Clear any Drupal classes.
        $variables['attributes']['class'] = [];
        $variables['attributes']['class'][] = 'form__element';
        $variables['attributes']['class'][] = 'form__element--actions';
      }
    }
  }

}
