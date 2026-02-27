import './layout.scss';
import './accordion/_accordion.scss';
import './flex/_flex.scss';
import './one-column/_one-column.scss';
import './two-column/_two-column.scss';
import './three-column/_three-column.scss';
import './four-column/_four-column.scss';

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
