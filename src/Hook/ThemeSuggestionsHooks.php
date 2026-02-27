<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Hook implementations for theme suggestions.
 */
final class ThemeSuggestionsHooks {

  public function __construct(private readonly RequestStack $requestStack) {}

  /**
   * Implements hook_theme_suggestions_page_alter().
   */
  #[Hook('theme_suggestions_page_alter')]
  public function themeSuggestionsPageAlter(array &$suggestions, array $variables) {
    $exception = $this->requestStack->getCurrentRequest()->attributes->get('exception');

    if (!is_null($exception)) {
      $suggestions[] = 'page__' . (string) $exception->getStatusCode();
    }

    // Add content type suggestions.
    if ($node = $this->requestStack->getCurrentRequest()->attributes->get('node')) {
      array_splice($suggestions, 1, 0, 'page__node__' . $node->getType());
    }
  }

  /**
   * Implements hook_theme_suggestions_taxonomy_term_alter().
   */
  #[Hook('theme_suggestions_taxonomy_term_alter')]
  public function themeSuggestionsTaxonomyTermAlter(array &$suggestions, array $variables) {
    /** @var \Drupal\taxonomy\Entity\Term $term */
    $term = $variables['elements']['#taxonomy_term'];
    $term_bundle = $term->bundle();

    $view_mode = strtr($variables['elements']['#view_mode'], '.', '_');

    $suggestions = [];

    $suggestions[] = 'taxonomy_term__' . $view_mode;
    $suggestions[] = 'taxonomy_term__' . $term_bundle;
    $suggestions[] = 'taxonomy_term__' . $term_bundle . '__' . $view_mode;
    $suggestions[] = 'taxonomy_term__' . $term->id();
    $suggestions[] = 'taxonomy_term__' . $term->id() . '__' . $view_mode;
  }

  /**
   * Implements hook_theme_suggestions_HOOK_alter().
   */
  #[Hook('theme_suggestions_container_alter')]
  public function themeSuggestionsContainerAlter(array &$suggestions, array $variables) {
    if (isset($variables['element']['#type'])) {
      if ($variables['element']['#type'] == 'view') {
        $suggestions[] = 'container__' .
          $variables['element']['#type'];

        $suggestions[] = 'container__' .
          $variables['element']['#type'] . '__' .
          $variables['element']['#name'];

        $suggestions[] = 'container__' .
          $variables['element']['#type'] . '__' .
          $variables['element']['#name'] . '__' .
          $variables['element']['#display_id'];
      }
    }
  }

  /**
   * Implements hook_theme_suggestions_form_alter().
   */
  #[Hook('theme_suggestions_form_alter')]
  public function themeSuggestionsFormAlter(array &$suggestions, array $variables) {
    $suggestions[] = 'form__' . str_replace('-', '_', $variables['element']['#id']);
  }

}
