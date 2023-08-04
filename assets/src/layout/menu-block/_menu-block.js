Drupal.behaviors.menuBlock = {
  attach(context) {
    const BODY = document.querySelector('body');
    const MQ_1280 = window.matchMedia('(min-width: 1280px)');

    const MENU_TOGGLE = context.querySelector('[data-js="menu-toggle"]');
    if (!MENU_TOGGLE) return;

    const BLOCK_MAIN_MENU = context.querySelector('[data-js="block-main-menu"]');
    if (!BLOCK_MAIN_MENU) return;

    MQ_1280.onchange = (e) => {
      mq1280OnChange(e);
    }

    function mq1280OnChange(e) {
      // Desktop
      if (e.matches) {
        BODY.style.overflowY = 'auto';
        BODY.style.position = 'static';
        BLOCK_MAIN_MENU.setAttribute('aria-hidden', 'false');
      }
      // Mobile
      else {
        BLOCK_MAIN_MENU.setAttribute('aria-hidden', MENU_TOGGLE.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');

        if (MENU_TOGGLE.getAttribute('aria-expanded') === 'true') {
          BODY.style.overflowY = 'scroll';
          BODY.style.position = 'fixed';
        }
      }
    }

    mq1280OnChange(MQ_1280);
  }
}
