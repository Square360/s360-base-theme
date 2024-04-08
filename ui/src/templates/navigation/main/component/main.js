import "./main.scss";

Drupal.behaviors.mainMenu = {
  attach(context) {
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;
    let activeDetailsElement;
    let mouseTimeout;

    const MAIN_MENU = context.querySelector('[data-js="main-menu"]');
    if (!MAIN_MENU) return;
  }
};
