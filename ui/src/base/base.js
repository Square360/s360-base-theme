require.context('SRC_IMAGES', true, /\.(gif|png|jpe?g|svg)$/);
import './base.scss';

Drupal.behaviors.scrollbarWidth = {
  attach(context) {
    const ROOT = document.documentElement;

    const updateScrollbarWidth = () => {
      ROOT.style.setProperty('--scrollbar-width', `${ window.innerWidth - ROOT.clientWidth }px`);
    }

    window.addEventListener('load', () => {
      updateScrollbarWidth();
    });

    window.addEventListener('resize', () => {
      updateScrollbarWidth();
    });
  }
}
