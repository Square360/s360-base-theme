import pTwig from '@ui-base/text/p/_p.twig';

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
