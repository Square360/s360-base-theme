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

  return twig;
};
