require.context('SRC_IMAGES', true, /\.(gif|png|jpe?g|svg)$/);
import './base.scss';

document.addEventListener('DOMContentLoaded', () => {
  const ROOT = document.documentElement;

  const updateScrollbarWidth = () => {
    ROOT.style.setProperty('--scrollbar-width', `${ window.innerWidth - ROOT.clientWidth }px`);
  }

  window.addEventListener('resize', () => {
    updateScrollbarWidth();
  });

  updateScrollbarWidth();
});
