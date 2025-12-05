import './view.scss';

import { FadeInSlideUpAnimator } from 'utils/animators/FadeInSlideUpAnimator.js';

Drupal.behaviors.view = {
  attach(context) {
    /**
     * Initializes scroll-based animations for view rows and grid items.
     */
    const animate = () => {
      const VIEW_CONTENTS = context.querySelectorAll('.view__content');
      if (!VIEW_CONTENTS.length) return;

      VIEW_CONTENTS.forEach(viewContent => {
        const VIEW_ROWS = viewContent.querySelectorAll(`
          .view__rows > .view__row,
          .view__grid > .view__grid-item
        `);
        if (!VIEW_ROWS.length) return;

        new FadeInSlideUpAnimator(VIEW_ROWS);
      });
    }

    /**
     * **************************************************
     * Initialize
     */

    animate();
  }
}
