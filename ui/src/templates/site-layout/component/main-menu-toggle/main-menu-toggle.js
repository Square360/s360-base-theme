import './main-menu-toggle.scss';

document.addEventListener('DOMContentLoaded', () => {
  const MAIN_MENU_TOGGLE = document.querySelector('[data-js="main-menu-toggle"]');
  if (!MAIN_MENU_TOGGLE) return;

  MAIN_MENU_TOGGLE.addEventListener('click', () => {
    if (MAIN_MENU_TOGGLE.getAttribute('aria-expanded') === 'true') {
      MAIN_MENU_TOGGLE.setAttribute('aria-expanded', 'false');
    }
    else {
      MAIN_MENU_TOGGLE.setAttribute('aria-expanded', 'true');
    }
  });
});
