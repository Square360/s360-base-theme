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
