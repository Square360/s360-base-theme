import './includes/menu-toggle/_menu-toggle.scss';
import './site-header.scss';

Drupal.behaviors.siteLayout = {
  attach(context) {
    const MQ_MAIN_MENU = window.matchMedia(`(min-width: ${ getComputedStyle(document.documentElement).getPropertyValue('--main-menu-mq') })`);
    const HTML = document.documentElement;

    const [siteHeader] = once('site-header', '[data-js="site-header"]', context);
    if (!siteHeader) return;

    const [blockMainMenu] = once('block-main-menu', '[data-js="block-main-menu"]', context);
    if (!blockMainMenu) return;

    const menuToggle = siteHeader.querySelector('[data-js="menu-toggle"]');
    if (!menuToggle) return;

    // Remove the opacity style.
    blockMainMenu.style.opacity = null;

    function mqMainMenuOnChange(e) {
      // Desktop
      if (e.matches) {
        showMenu();
        collapseMenuToggle();
      }
      // Mobile
      else {
        hideMenu();
      }
    }

    function setAdminPadding() {
      HTML.style.setProperty('--site-padding-top', `${HTML.style['scroll-padding-top']}`);
    }

    function setSiteHeaderHeight() {
      const headerStyles = getComputedStyle(siteHeader);
      const marginTop = parseFloat(headerStyles.marginTop) || 0;
      const marginBottom = parseFloat(headerStyles.marginBottom) || 0;
      const heightWithMargins = siteHeader.getBoundingClientRect().height + marginTop + marginBottom;

      HTML.style.setProperty('--site-header-height', `${heightWithMargins}px`);
    }

    function showMenu() {
      blockMainMenu.setAttribute('aria-hidden', 'false');
    }

    function hideMenu() {
      blockMainMenu.setAttribute('aria-hidden', 'true');
    }

    function expandMenuToggle() {
      menuToggle.setAttribute('aria-expanded', 'true');
    }

    function collapseMenuToggle() {
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * **************************************************
     * Listeners
     */

    window.addEventListener('load', setAdminPadding, { passive: true });
    window.addEventListener('resize', () => {
      setAdminPadding();
      setSiteHeaderHeight();
    }, { passive: true });

    menuToggle.addEventListener('click', () => {
      // Hide the menu.
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        hideMenu();
        collapseMenuToggle();
      }
      // Show the menu.
      else {
        showMenu();
        expandMenuToggle();
      }
    });

    /**
     * **************************************************
     * Initialize
     */

    window.dispatchEvent(new Event('resize'));
    mqMainMenuOnChange(MQ_MAIN_MENU);

  }
}
