Drupal.behaviors.siteLayout = {
  attach(context) {
    const MAIN_MENU_MQ = window.matchMedia(`(${ getComputedStyle(document.documentElement).getPropertyValue('--main-menu-mq') })`);
    const ROOT = document.documentElement;

    const BLOCK_MAIN_MENU = context.querySelector('[data-js="block-main-menu"]');
    if (!BLOCK_MAIN_MENU) return;

    const MENU_TOGGLE = context.querySelector('[data-js="menu-toggle"]');
    if (!MENU_TOGGLE) return;

    const SITE_HEADER = document.querySelector('[data-js="site-header"]');
    if (!SITE_HEADER) return;

    // Remove the opacity style.
    BLOCK_MAIN_MENU.style.opacity = null;

    MENU_TOGGLE.addEventListener('click', () => {
      // Hide the menu.
      if (MENU_TOGGLE.getAttribute('aria-expanded') === 'true') {
        hideBlockMainMenu();
      }
      // Show the menu.
      else {
        showBlockMainMenu();
      }
    });

    window.addEventListener('resize', () => {
      ROOT.style.setProperty('--site-header-height', `${ SITE_HEADER.clientHeight }px`);
    });

    MAIN_MENU_MQ.onchange = (e) => {
      mqOnChange(e);
    }

    function mqOnChange(e) {
      // Desktop
      if (e.matches) {
        showBlockMainMenu();
      }
      // Mobile
      else {
        hideBlockMainMenu();
      }
    }

    function showBlockMainMenu() {
      BLOCK_MAIN_MENU.setAttribute('aria-hidden', 'false');
    }

    function hideBlockMainMenu() {
      BLOCK_MAIN_MENU.setAttribute('aria-hidden', 'true');
    }

    // Kickoff!

    window.dispatchEvent(new Event('resize'));
    mqOnChange(MAIN_MENU_MQ);
  }
}
