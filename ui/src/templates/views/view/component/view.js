import './view.scss';

import { FadeInSlideUpAnimator } from 'utils/animators/FadeInSlideUpAnimator.js';
import { Collapsible } from 'utils/Collapsible';

Drupal.behaviors.view = {
  attach(context) {
    /**
     * Initializes scroll-based animations for view rows and grid items.
     */
    const animate = () => {
      const viewContents = context.querySelectorAll('.view__content');
      if (!viewContents.length) return;

      viewContents.forEach(viewContent => {
        const viewRows = viewContent.querySelectorAll(`
          .view__rows > .view__row,
          .view__grid > .view__grid-item
        `);
        if (!viewRows.length) return;

        new FadeInSlideUpAnimator(viewRows);
      });
    }

    const exposed = () => {
      const MQ_768 = window.matchMedia('(min-width: 768px)');

      const exposedFiltersList = once('exposed-filters', '[data-js="exposed-filters"]', context);
      if (!exposedFiltersList.length) return;

      exposedFiltersList.forEach(exposedFilters => {
        new Collapsible(exposedFilters, '.view__filter-summary', '.view__filters');
      });

      // **************************************************
      // MEDIA QUERIES

      MQ_768.onchange = (e) => {
        mq768OnChange(e);
      }

      function mq768OnChange(e) {
        exposedFiltersList.forEach(exposedFilters => {
          exposedFilters.removeAttribute('open');

          // Desktop
          if (e.matches) {
            exposedFilters.setAttribute('open', true);
          }
        });
      }

      mq768OnChange(MQ_768);
    }

    /**
     * **************************************************
     * Initialize
     */

    animate();
  }
}
