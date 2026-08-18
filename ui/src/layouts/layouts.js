import './layout.scss';

import { FadeInSlideUpAnimator, FadeInSlideRightAnimator, FadeInSlideLeftAnimator } from 'utils/animators';

document.addEventListener('DOMContentLoaded', () => {
  const animateLayoutRegionItems = () => {
    const layouts = document.querySelectorAll('.layout:not(.layout--two-column');
    if (!layouts) return;

    layouts.forEach(layout => {
      const regionItems = layout.querySelectorAll('.layout__region-item');
      if (!regionItems) return;

      new FadeInSlideUpAnimator(regionItems);
    });
  };

  const animateLayoutTwoColumnRegionItems = () => {
    const layouts = document.querySelectorAll('.layout--two-column');
    if (!layouts) return;

    layouts.forEach(layout => {
      const regionFirstItems = layout.querySelectorAll('.layout__region--first .layout__region-item');
      if (regionFirstItems) {
        new FadeInSlideRightAnimator(regionFirstItems);
      }

      const regionSecondItems = layout.querySelectorAll('.layout__region--second .layout__region-item');
      if (regionSecondItems) {
        new FadeInSlideLeftAnimator(regionSecondItems);
      }
    });
  };

  /**
   * **************************************************
   * Initialize
   */

  animateLayoutRegionItems();
  animateLayoutTwoColumnRegionItems();
});
