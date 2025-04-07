import pTwig from '@ui-base/text/p/_p.twig';
import ckEditorTwig from '@ui-field/ckeditor/component/ckeditor.twig';
import drupalAttribute from 'drupal-attribute';

// CTA Link Styles

export const CTA_LINK_STYLE_OPTIONS = {
  'primary': 'Primary',
  'secondary': 'Secondary',
};

export const ctaLinkStyleControl = {
  options: Object.keys(CTA_LINK_STYLE_OPTIONS),
  control: {
    type: 'select',
    labels: CTA_LINK_STYLE_OPTIONS
  },
}

export const COLOR_THEME_OPTIONS = {
  '': '- None -',
};

export const colorThemeControl = {
  options: Object.keys(COLOR_THEME_OPTIONS),
  control: {
    type: 'select',
    labels: COLOR_THEME_OPTIONS
  },
}

// Image Position

const IMAGE_POSITION_OPTIONS = {
  'left': 'Left',
  'right': 'Right',
}

export const imagePositionControl = {
  options: Object.keys(IMAGE_POSITION_OPTIONS),
  control: {
    type: 'select',
    labels: IMAGE_POSITION_OPTIONS
  },
}

/**
 *
 * @param {string} paragraph_text
 * @returns
 */
export function formatParagraphText(paragraph_text) {
  if (!paragraph_text) return '';

  let paragraphs = paragraph_text.split(/\r?\n|\r|\n/g);

  return paragraphs.map((paragraph_text) => {
    if (!paragraph_text) {
      paragraph_text = '&nbsp;';
    }

    return pTwig({ paragraph_text });
  }).join('');
}

export function formatParagraphCKEditor(paragraph_text) {
  if (!paragraph_text) return '';

  return ckEditorTwig({
    field_items: [{
      content: formatParagraphText(paragraph_text)
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
 * @returns
 */
export function renderStoryWithTheme(storyTheme, activeTheme, story) {
  if (activeTheme !== storyTheme) {
    return `Sorry, this story can only be rendered using the <strong>${ storyTheme }</strong> theme.`;
  }

  return story;
}

/**
 * Sets the Drupal attributes on the menu item.
 *
 * @param {object} item The menu item.
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
 * Wraps the given menu in `<nav></nav>` tags.

 * Create a fake `<nav>` tag to wrap the menu.
 *
 * @param {string} menu The menu rendered as a string.
 * @returns {string}
 */
export function fakeSystemMenuBlock(menu) {
  return `<nav class="block-main-menu" data-js="block-main-menu">${ menu }</nav>`;
}
