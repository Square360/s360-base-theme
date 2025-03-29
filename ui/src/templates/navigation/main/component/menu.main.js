import "./menu.main.scss";

document.addEventListener('DOMContentLoaded', (event) => {
  let focusableElements;
  let firstFocusableElement;
  let lastFocusableElement;
  let activeDetailsElement;
  let mouseTimeout;

  const MAIN_MENU = document.querySelector('[data-js="main-menu"]');
  if (!MAIN_MENU) return;

  const DETAILS_ALL = MAIN_MENU.querySelectorAll('details');
  if (!DETAILS_ALL) return;

  const LEVEL_0_LINKS = MAIN_MENU.querySelectorAll('.menu--level-0 > li > a');

  // Any top level links that aren't inside summary tags.
  LEVEL_0_LINKS.forEach((link) => {
    link.addEventListener('mouseover', () => {
      closeActiveDetails(activeDetailsElement);
      clearTimeout(mouseTimeout);
    })
  });

  // Add the event listeners.
  DETAILS_ALL.forEach((targetDetail) => {
    let summary = targetDetail.querySelector('summary');
    let summaryLink = summary.querySelector('summary a');
    let submenu = targetDetail.querySelector('ul.menu--submenu');
    let newMenuItem = document.createElement('li');

    // Create a new submenu item.
    newMenuItem.classList.add('menu__item');

    if (summaryLink) {
      // Add the summary link to that menu item.
      newMenuItem.appendChild(summaryLink.cloneNode(true));
    }

    // Add the new menu item to the submenu.
    submenu.prepend(newMenuItem);

    // Show menu when hovering.
    targetDetail.addEventListener('mouseover', () => {
      activeDetailsElement = targetDetail;
      activeDetailsElement.setAttribute('open', true);

      clearTimeout(mouseTimeout);
      closeDetails(targetDetail);
      openActiveDetails();
    });

    targetDetail.addEventListener('mouseleave', () => {
      mouseTimeout = setTimeout(() => {
        closeActiveDetails();
      }, 500);
    });

    // Close any open menus when clicking.
    targetDetail.addEventListener('click', (evt) => {
      activeDetailsElement = targetDetail;

      closeDetails(targetDetail);
      openActiveDetails();
    });
  });

  /**
   * Close any open details element that isn't the [].
   */
  function closeDetails(targetDetail) {
    DETAILS_ALL.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute('open');
      }
    });
  }

  /**
   * Closes the active details element and removes the key down listener.
   */
  function closeActiveDetails() {
    document.removeEventListener('keydown', handleKeyDown);

    if (activeDetailsElement) {
      activeDetailsElement.removeAttribute('open');
    }
  }

  function openActiveDetails() {
    document.addEventListener('keydown', handleKeyDown);

    focusableElements = activeDetailsElement.querySelectorAll('summary, a, button');
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
  }

  function handleKeyDown(event) {
    const KEY_TAB = 9;
    const KEY_ESC = 27;

    switch (event.keyCode) {
      case KEY_TAB:
        if (focusableElements === 1) {
          event.preventDefault();
          break;
        }

        // Tabbing backwards
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            closeActiveDetails();
          }
        }
        // Tabbing forwards
        else {
          if ([...focusableElements].indexOf(document.activeElement) === -1) {
            firstFocusableElement.focus();
          }

          if (document.activeElement === lastFocusableElement) {
            closeActiveDetails();
          }
        }
        break;

      case KEY_ESC:
        closeActiveDetails();
        break;

      default:
        break;
    }
  }
});
