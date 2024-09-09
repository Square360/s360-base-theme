import './menu-toggle.scss';

Drupal.behaviors.menuToggle = {
  attach(context) {
    const MENU_TOGGLE = context.querySelector('[data-js="menu-toggle"]');
    if (!MENU_TOGGLE) return;

    MENU_TOGGLE.addEventListener('click', () => {
      if (MENU_TOGGLE.getAttribute('aria-expanded') === 'true') {
        MENU_TOGGLE.setAttribute('aria-expanded', 'false');
      }
      else {
        MENU_TOGGLE.setAttribute('aria-expanded', 'true');
      }
    });
  }
}
