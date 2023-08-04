Drupal.behaviors.siteHeader = {
  attach(context) {
    const SITE_HEADER = document.querySelector('[data-js="site-header"]');
    if (!SITE_HEADER) return;

    window.addEventListener('resize', () => {
      let root = document.documentElement;

      root.style.setProperty('--site-header-height', `${ SITE_HEADER.clientHeight }px`);
    });

    window.dispatchEvent(new Event('resize'));
  }
}
