const twigDrupal = require('twig-drupal-filters');
const twigAddAttributes = require('add-attributes-twig-extension');
const { addDrupalExtensions } = require('drupal-twig-extensions/twig');

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

  return twig;
};
