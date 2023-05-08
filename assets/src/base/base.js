require.context('SRC_IMAGES', true, /\.(gif|png|jpe?g|svg)$/);
import './base.scss';

require('what-input');

Drupal.behaviors.scrollbarWidth = {
  attach(context) {
    const ROOT = document.documentElement;
    const BODY = document.querySelector('body');

    window.addEventListener('resize', () => {
      ROOT.style.setProperty('--scrollbar-width', `${ window.innerWidth - ROOT.clientWidth }px`);
    });

    window.dispatchEvent(new Event('resize'));
  }
}
