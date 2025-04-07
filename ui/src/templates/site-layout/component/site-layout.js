Drupal.behaviors.siteLayout = {
  attach(context) {
    const MAIN_MENU_MQ = window.matchMedia(`(${ getComputedStyle(document.documentElement).getPropertyValue('--main-menu-mq') })`);
    const ROOT = document.documentElement;

    const BLOCK_MENU = context.querySelector('[data-js="block-main-menu"]');
    if (!BLOCK_MENU) return;

    const MENU_TOGGLE = context.querySelector('[data-js="menu-toggle"]');
    if (!MENU_TOGGLE) return;

    const SITE_HEADER = document.querySelector('[data-js="site-header"]');
    if (!SITE_HEADER) return;

    // Remove the opacity style.
    BLOCK_MENU.style.opacity = null;

    MENU_TOGGLE.addEventListener('click', () => {
      // Hide the menu.
      if (MENU_TOGGLE.getAttribute('aria-expanded') === 'true') {
        hideBlockMenu();
        collapseMenuToggle();
      }
      // Show the menu.
      else {
        showBlockMenu();
        expandMenuToggle();
      }
    });

    // Window events
    window.addEventListener('load', () => {
      setAdminPadding();
    });

    window.addEventListener('resize', () => {
      setAdminPadding();

      ROOT.style.setProperty('--site-header-height', `${ SITE_HEADER.clientHeight }px`);
    });

    MAIN_MENU_MQ.onchange = (e) => {
      mqOnChange(e);
    }

    function mqOnChange(e) {
      // Desktop
      if (e.matches) {
        showBlockMenu();
        collapseMenuToggle();
      }
      // Mobile
      else {
        hideBlockMenu();
      }
    }

    function setAdminPadding() {
      ROOT.style.setProperty('--site-padding-top', `${ ROOT.style['scroll-padding-top'] }`);
    }

    function showBlockMenu() {
      BLOCK_MENU.setAttribute('aria-hidden', 'false');
    }

    function hideBlockMenu() {
      BLOCK_MENU.setAttribute('aria-hidden', 'true');
    }

    function expandMenuToggle() {
      MENU_TOGGLE.setAttribute('aria-expanded', 'true');
    }

    function collapseMenuToggle() {
      MENU_TOGGLE.setAttribute('aria-expanded', 'false');
    }

    // Kickoff!
    window.dispatchEvent(new Event('resize'));
    mqOnChange(MAIN_MENU_MQ);
  }
}
