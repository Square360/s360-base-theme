/**
 * @file
 * Utility functions and controls for Storybook stories.
 * Provides formatting helpers, theme controls, and Drupal-specific utilities.
 */

import pTwig from '@ui-base/text/p/_p.twig';
import ckEditorTwig from '@ui-field/ckeditor/component/ckeditor.twig';
import drupalAttribute from 'drupal-attribute';

/**
 * Available CTA link style options.
 * @type {Object.<string, string>}
 */
export const CTA_LINK_STYLE_OPTIONS = {
  'primary': 'Primary',
  'secondary': 'Secondary',
};

/**
 * Storybook control configuration for CTA link styles.
 * @type {Object}
 */
export const ctaLinkStyleControl = {
  options: Object.keys(CTA_LINK_STYLE_OPTIONS),
  control: {
    type: 'select',
    labels: CTA_LINK_STYLE_OPTIONS
  },
}

/**
 * Available color scheme options.
 * @type {Object.<string, string>}
 */
export const COLOR_SCHEME_OPTIONS = {
  '': '- None -',
};

/**
 * Storybook control configuration for color schemes.
 * @type {Object}
 */
export const colorSchemeControl = {
  options: Object.keys(COLOR_SCHEME_OPTIONS),
  control: {
    type: 'select',
    labels: COLOR_SCHEME_OPTIONS
  },
}

/**
 * Available image position options.
 * @type {Object.<string, string>}
 */
const IMAGE_POSITION_OPTIONS = {
  'left': 'Left',
  'right': 'Right',
}

/**
 * Storybook control configuration for image positioning.
 * @type {Object}
 */
export const imagePositionControl = {
  options: Object.keys(IMAGE_POSITION_OPTIONS),
  control: {
    type: 'select',
    labels: IMAGE_POSITION_OPTIONS
  },
}

/**
 * Formats paragraph text by splitting on line breaks and wrapping each
 * paragraph in a paragraph template.
 *
 * @param {string} paragraphText - The text to format into paragraphs.
 * @returns {string} The formatted HTML string with each paragraph wrapped.
 */
export function formatParagraphText(paragraphText) {
  if (!paragraphText) return '';

  let paragraphs = paragraphText.split(/\r?\n|\r|\n/g);

  return paragraphs.map((paragraphText) => {
    if (!paragraphText) {
      paragraphText = '&nbsp;';
    }

    return pTwig({ paragraph_text: paragraphText });
  }).join('');
}

/**
 * Formats paragraph text and wraps it in a CKEditor container.
 *
 * @param {string} paragraphText - The text to format into paragraphs.
 * @returns {string} The formatted HTML string wrapped in CKEditor markup.
 */
export function formatParagraphCKEditor(paragraphText) {
  if (!paragraphText) return '';

  return wrapWithCkEdtior(formatParagraphText(paragraphText));
}

/**
 * Wraps any content in a CKEditor-classed div container.
 *
 * @param {string} content - The HTML content to wrap.
 * @returns {string} The content wrapped in CKEditor markup.
 */
export function wrapWithCkEdtior(content) {
  return ckEditorTwig({
    field_items: [{
      content: content
    }]
  });
}

/**
 * Checks the storyTheme againsts the activeTheme and if they are different
 * display a message to the user. Otherwise, render the story.
 *
 * @param {string} storyTheme - The theme the story needs to render correctly.
 * @param {string} activeTheme - The current theme that is selected.
 * @param {string} story - The story to render.
 * @returns {string}
 */
export function renderStoryWithTheme(storyTheme, activeTheme, story) {
  if (activeTheme !== storyTheme) {
    return `Sorry, this story can only be rendered using the <strong>${ storyTheme }</strong> theme.`;
  }

  return story;
}

/**
 * Sets the Drupal attributes on a menu item and recursively on its children.
 * Initializes a new drupalAttribute instance for each menu item.
 *
 * @param {Object} item - The menu item object.
 * @param {Object} [item.below] - Optional array of child menu items.
 * @returns {void}
 */
export function setMenuItemAttribues(item) {
  item.attributes = new drupalAttribute();

  if (item.below) {
    item.below.forEach(childItem => {
      setMenuItemAttribues(childItem);
    })
  }
}

/**
 * Creates a fake `<nav>` tag to wrap the menu, similar to Drupal's
 * system menu block structure.
 *
 * @param {string} id - The machine name/ID of the menu.
 * @param {string} menu - The menu HTML rendered as a string.
 * @returns {string} The menu wrapped in a nav element with Drupal-like attributes.
 */
export function fakeDrupalSystemMenuBlock(id, menu) {
  return `
    <nav
      id="block-${id}"
      class="block-${id}-menu"
      role="navigation"
      aria-labelledby="block-${id}-menu"
      data-js="block-${id}-menu">
      <h2 id="block-${id}-menu" class="visually-hidden">Menu</h2>
      ${ menu }
    </nav>`;
}

/**
 * Creates a mock object with an isPublished method for testing purposes.
 *
 * @param {boolean} status - The published status to return.
 * @returns {Object} An object with an isPublished() method.
 * @returns {Function} returns.isPublished - Function that returns the provided status.
 */
export function setPublishedStatus(status) {
  return {
    isPublished() {
      return status;
    }
  }
}
