<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\s360_base_theme\ThemeHelper;

/**
 * Hook implementations for taxonomy preprocessing.
 *
 * This class provides centralized node preprocessing functionality. Each menu
 * should have its own private preprocessing method.
 *
 * TaxonomyTerm-specific methods:
 *  `private function preprocess[BundleName](&$variables, $term)`.
 */
final class TaxonomyHooks {

  /**
   * Implements hook_preprocess_taxonomy_term().
   */
  #[Hook('preprocess_taxonomy_term')]
  public function preprocessTaxonomyTerm(array &$variables): void {
    /** @var \Drupal\taxonomy\TermInterface $term */
    $term = $variables['term'];
    $term_bundle = $term->bundle();

    $term_bundle_method = 'preprocess' . ThemeHelper::toPascalCase($term_bundle);
    if (method_exists($this, $term_bundle_method)) {
      $this->$term_bundle_method($variables, $term);
    }
  }

}
