import './block.branding-block.scss';

Drupal.behaviors.brandingBlock = {
  attach(context) {
    const HTML = document.documentElement;

    const brandingBlock = context.querySelector('[data-js="branding-block"]');
    if (!brandingBlock) return;

    /**
     *
     */
    const updateBrandingBlockHeight = () => {
      HTML.style.setProperty('--branding-block-height', `${brandingBlock.clientHeight}px`);
    }

    /**
     * **************************************************
     * Listeners
     */

    window.addEventListener('resize', updateBrandingBlockHeight, { passive: true});

    /**
     * **************************************************
     * Initialize
     */

    updateBrandingBlockHeight();
  }
}
