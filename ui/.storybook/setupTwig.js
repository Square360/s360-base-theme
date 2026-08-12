const twigDrupal = require('twig-drupal-filters');
const twigAddAttributes = require('add-attributes-twig-extension');
const { addDrupalExtensions } = require('drupal-twig-extensions/twig');

const { link } = require('@ui-base/link/link.stories.js');
const { breadcrumb } = require('@ui-navigation/breadcrumb/component/menu.breadcrumb.stories.js');

/**
 * Configures and extends a standard twig object.
 *
 * @param {Twig} twig - twig object that should be configured and extended.
 *
 * @returns {Twig} configured twig object.
 */
module.exports.setupTwig = function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigAddAttributes(twig);

  // Add the extensions for Drupal.
  addDrupalExtensions(twig, {
  });

  // Fake the menu_attribute function provided by the Drupal module.
  twig.extendFunction("menus_attribute", function() {
    return true;
  });

  /**
   * Map of Drupal block IDs to Storybook component renderers.
   */
  const blockMap = {
    'system_breadcrumb_block': breadcrumb(),
  };

  twig.extendFunction('drupal_block', function(blockId) {
    const story = blockMap[blockId];

    if (story) {
      return story;
    }

    return `<div>No Storybook mapping found for block ID "${ blockId }"</div>`;
  });

  const includeMap = {};

  twig.extendFunction('include', function(template) {
    const story = includeMap[template];

    if (story) {
      return story;
    }

    return `<div>No Storybook mapping found for include name "${ template }"</div>`;
  });

  // Tries to mimic the Drupal link function which returns the link text wrapped
  // in span. Used mostly for menus, will be applied everywhere link() is used.
  twig.extendFunction('link', function(title, url) {
    if (url.routeName === '<nolink>') {
      return `<span>${title}</span>`;
    }

    return link({ link_text: title });
  });

  return twig;
};
