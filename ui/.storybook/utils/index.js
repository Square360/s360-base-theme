import pTwig from '@ui-base/text/p/_p.twig';
import drupalAttribute from 'drupal-attribute';

export const CTA_LINK_STYLE_OPTIONS = {
  'primary': 'Primary',
  'secondary': 'Secondary',
};

export const COLOR_THEME_OPTIONS = {
  '': '- None -',
};

export const paragraphFieldCtaLinkStyle = {
  options: Object.keys(CTA_LINK_STYLE_OPTIONS),
  control: {
    type: 'select',
    labels: CTA_LINK_STYLE_OPTIONS
  },
}

export function formatParagraphText(paragraph_text) {
  let paragraphs = paragraph_text.split(/\r?\n|\r|\n/g);

  return paragraphs.map((paragraph_text) => {
    if (!paragraph_text) {
      paragraph_text = '&nbsp;';
    }

    return pTwig({ paragraph_text });
  }).join('');
}

/**
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

export function setMenuItemAttribues(item) {
  item.attributes = new drupalAttribute();

  if (item.below) {
    item.below.forEach(childItem => {
      setMenuItemAttribues(childItem);
    })
  }
}
