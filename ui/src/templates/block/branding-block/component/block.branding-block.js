import './block.branding-block.scss';

Drupal.behaviors.brandingBlock = {
  attach(context) {
    const ROOT = document.documentElement;

    const BRANDING_BLOCK = context.querySelector('[data-js="branding-block"]');
    if (!BRANDING_BLOCK) return;

    const updateBrandingBlockHeight = () => {
      ROOT.style.setProperty('--branding-block-height', `${ BRANDING_BLOCK.clientHeight }px`);
    }

    window.addEventListener('resize', () => {
      updateBrandingBlockHeight();
    });

    updateBrandingBlockHeight();
  }
}
