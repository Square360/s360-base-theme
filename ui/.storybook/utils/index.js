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

export const COLOR_SCHEME_OPTIONS = {
  '': '- None -',
};

export const colorSchemeControl = {
  options: Object.keys(COLOR_SCHEME_OPTIONS),
  control: {
    type: 'select',
    labels: COLOR_SCHEME_OPTIONS
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
 * @param {string} paragraphText
 * @returns
 */
export function formatParagraphText(paragraphText) {
  if (!paragraphText) return '';

  let paragraphs = paragraphText.split(/\r?\n|\r|\n/g);

  return paragraphs.map((paragraphText) => {
    if (!paragraphText) {
      paragraphText = '&nbsp;';
    }

    return pTwig({ paragraphText });
  }).join('');
}

export function formatParagraphCKEditor(paragraphText) {
  if (!paragraphText) return '';

  return ckEditorTwig({
    field_items: [{
      content: formatParagraphText(paragraphText)
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
export function fakeDrupalMainMenuBlock(menu) {
  return `<nav class="block-main-menu" data-js="block-main-menu">${ menu }</nav>`;
}

export function setPublishedStatus(status) {
  return {
    isPublished() {
      return status;
    }
  }
}
