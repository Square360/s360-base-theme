Drupal.behaviors.menuToggle = {
  attach(context) {
    const BODY = document.querySelector('body');

    const MENU_TOGGLE = context.querySelector('[data-js="menu-toggle"]');
    if (!MENU_TOGGLE) return;

    const BLOCK_MAIN_MENU = context.querySelector('[data-js="block-main-menu"]');
    if (!BLOCK_MAIN_MENU) return;

    MENU_TOGGLE.addEventListener('click', () => {
      // Hide the menu.
      if (MENU_TOGGLE.getAttribute('aria-expanded') === 'true') {
        BODY.style.overflowY = 'auto';
        BODY.style.position = 'static';

        MENU_TOGGLE.setAttribute('aria-expanded', 'false');
        BLOCK_MAIN_MENU.setAttribute('aria-hidden', 'true');
      }
      // Show the menu.
      else {
        BODY.style.overflowY = 'scroll';
        BODY.style.position = 'fixed';

        MENU_TOGGLE.setAttribute('aria-expanded', 'true');
        BLOCK_MAIN_MENU.setAttribute('aria-hidden', 'false');
      }
    });
  }
}
