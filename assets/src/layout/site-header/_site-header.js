Drupal.behaviors.siteHeader = {
  attach(context) {
    const ROOT = document.documentElement;
    const SITE_HEADER = document.querySelector('[data-js="site-header"]');
    if (!SITE_HEADER) return;

    const updateSiteHeaderHeight = () => {
      ROOT.style.setProperty('--site-header-height', `${ SITE_HEADER.clientHeight }px`);
    }

    window.addEventListener('load', () => {
      updateSiteHeaderHeight();
    });

    window.addEventListener('resize', () => {
      updateSiteHeaderHeight();
    });
  }
}
