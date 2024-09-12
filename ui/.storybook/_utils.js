import pTwig from '@ui-base/text/p/_p.twig';

export function formatParagraphText(paragraph_text) {
  let paragraphs = paragraph_text.split(/\r?\n|\r|\n/g);

  return paragraphs.map((paragraph_text) => {
    if (!paragraph_text) {
      paragraph_text = '&nbsp;';
    }

    return pTwig({ paragraph_text });
  }).join('');
}
