import './branding-block.scss';

Drupal.behaviors.brandingBlock = {
  attach(context) {
    const ROOT = document.documentElement;

    const BRANDING_BLOCK = context.querySelector('[data-js="branding-block"]');
    if (!BRANDING_BLOCK) return;

    window.addEventListener('resize', () => {
      ROOT.style.setProperty('--branding-block-height', `${ BRANDING_BLOCK.clientHeight }px`);
    });

    // Kickoff!

    window.dispatchEvent(new Event('resize'));
  }
}
