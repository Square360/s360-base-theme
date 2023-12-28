const twigDrupal = require('twig-drupal-filters');
const twigAddAttributes = require('add-attributes-twig-extension');

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

  return twig;
};
