require.context('SRC_IMAGES', true, /\.(gif|png|jpe?g|svg)$/);
import './index.scss';

Drupal.behaviors.scrollbarWidth = {
  attach(context) {
    const ROOT = document.documentElement;

    window.addEventListener('resize', () => {
      ROOT.style.setProperty('--scrollbar-width', `${ window.innerWidth - ROOT.clientWidth }px`);
    });

    window.dispatchEvent(new Event('resize'));
  }
}
