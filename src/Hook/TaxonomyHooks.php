<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\s360_base_theme\ThemeUtils;

/**
 * Hook implementations for taxonomies.
 *
 * Each bundle should have it's own protected method.
 * `protected function preprocess[BundleName](&$variables, $paragraph)`.
 */
class TaxonomyHooks {

  /**
   * Implements hook_preprocess_taxonomy_term().
   */
  #[Hook('preprocess_taxonomy_term')]
  public function preprocessTaxonomyTerm(array &$variables): void {
    /** @var \Drupal\taxonomy\Entity\Term $term */
    $term = $variables['term'];
    $term_bundle = $term->bundle();

    $term_bundle_method = 'preprocess' . ThemeUtils::toPascalCase($term_bundle);
    if (method_exists($this, $term_bundle_method)) {
      $this->$term_bundle_method($variables);
    }
  }

}
