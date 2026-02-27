<?php

declare(strict_types=1);

namespace Drupal\s360_base_theme\Hook;

use Drupal\Component\Serialization\Exception\InvalidDataTypeException;
use Drupal\Component\Serialization\Yaml;
use Drupal\Component\Utility\Html;
use Drupal\Core\Asset\Exception\InvalidLibraryFileException;
use Drupal\Core\Extension\ThemeExtensionList;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Path\PathMatcherInterface;
use Drupal\Core\Render\Markup;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hook implementations for theme.
 */
final class ThemeHooks {

  use StringTranslationTrait;

  /**
   * The theme path.
   *
   * @var string
   */
  private string $themePath;

  /**
   * Constructs a new ThemeHooks instance.
   *
   * @param \Drupal\Core\Session\AccountProxyInterface $currentUser
   *   The current user service.
   * @param \Drupal\Core\Path\PathMatcherInterface $pathMatcher
   *   The path matcher service.
   * @param \Drupal\Core\Routing\RouteMatchInterface $routeMatch
   *   The route match service.
   * @param \Drupal\Core\Extension\ThemeExtensionList $themeExtensionList
   *   The theme extension list service.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   */
  public function __construct(
    private readonly AccountProxyInterface $currentUser,
    private readonly PathMatcherInterface $pathMatcher,
    private readonly RouteMatchInterface $routeMatch,
    private readonly ThemeExtensionList $themeExtensionList,
    private readonly MessengerInterface $messenger,
  ) {
    $this->themePath = $this->themeExtensionList->getPath('s360_base_theme');
  }

  /**
   * Implements hook_preprocess().
   */
  #[Hook('preprocess')]
  public function preprocess(array &$variables): void {
    // Get currently active user and roles.
    $account = $this->currentUser;

    $variables['is_front'] = $this->pathMatcher->isFrontPage();
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
    $route = $this->routeMatch->getRouteObject();
    $path = $route->getPath();

    if (str_starts_with($path, '/node')) {
      /** @var \Drupal\node\Entity\Node $node */
      $node = $this->routeMatch->getParameter('node');

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

  /**
   * Implements hook_page_attachments_alter().
   */
  #[Hook('page_attachments_alter')]
  public function pageAttachmentsAlter(array &$page): void {
    $critical_css_files = [
      'base/base.css',
      'block/branding-block/block.branding-block.css',
      'site-layout/site-header/site-header.css',
      'site-layout/site-main/site-main.css',
      'site-layout/menu-block/menu-block.css',
      'site-layout/menu-toggle/menu-toggle.css',
    ];

    // Early return if no critical CSS files to process.
    if (empty($critical_css_files)) {
      return;
    }

    foreach ($critical_css_files as $css_file) {
      $css = file_get_contents("$this->themePath/ui/dist/$css_file");

      $page['#attached']['html_head'][] = [
        [
          '#tag' => 'style',
          '#value' => Markup::create($css),
        ],
        "s360_base_theme.{$css_file}",
      ];
    }
  }

  /**
   * Implements hook_library_info_alter().
   */
  #[Hook('library_info_alter')]
  public function libraryInfoAlter(&$libraries, $extension) {
    // Alter only the library definitions of the current theme.
    if ($extension == 's360_base_theme') {
      $directory_iterator = new \RecursiveDirectoryIterator($this->themePath . '/libraries/');

      // Iterate over all the files found.
      foreach (new \RecursiveIteratorIterator($directory_iterator) as $file) {
        // Filter out all the files that don't contain "libraries.yml".
        if (str_contains($file->getFilename(), 'libraries.yml')) {
          try {
            // Decode the libraries.yml.
            $new_libraries = Yaml::decode(file_get_contents($file->getRealPath()));

            // Skip if the doesn't contain valid library definitions.
            if (!is_array($new_libraries)) {
              continue;
            }

            // Each libraries.yml could have multiple library-definitions.
            foreach ($new_libraries as $key => $new_library) {
              if (isset($libraries[$key])) {
                // If the library is defined somewhere else already, throw a
                // warning that we have multiple definitions of the same library
                // within the same theme.
                $this->messenger
                  ->addWarning($this->t('The library @key from the theme @themename has multiple definitions.', [
                    '@key' => $key,
                    '@themename' => self::$themePath,
                  ]));
              }
              else {
                $libraries[$key] = $new_library;
              }
            }
          }
          catch (InvalidDataTypeException $e) {
            // Throw a helpful exception to provide context.
            throw new InvalidLibraryFileException(sprintf('Invalid library definition in %s: %s', $file->getRealPath(), $e->getMessage()), 0, $e);
          }
        }
      }
    }
  }

}
