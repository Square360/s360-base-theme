<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Taxonomy preprocesses for s360_base_theme theme.
 *
 * Each bundle should provide it's own hook function.
 */
class PreprocessTaxonomy {

  public function __construct() {}

  /**
   * Implements hook_preprocess_taxonomy_term().
   */
  #[Hook('preprocess_taxonomy_term')]
  public function preprocessTaxonomyTerm(array &$variables): void {
    /** @var \Drupal\taxonomy\Entity\Term $term */
    $term = $variables['term'];
    $term_bundle = $term->bundle();

    $term_bundle_method = 'preprocess' . s360_base_theme_convert_to_pascal_case($term_bundle);
    if (method_exists($this, $term_bundle_method)) {
      $this->$term_bundle_method($variables);
    }
  }

}
