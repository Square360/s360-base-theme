require.context('SRC_IMAGES', true, /\.(gif|png|jpe?g|svg)$/);
import './base.scss';

document.addEventListener('DOMContentLoaded', () => {
  const HTML = document.documentElement;

  let resizeTimeout;
  let contentTimeout;
  let lastScrollbarWidth = null;
  let mutationObserver;
  let resizeObserver;

  /**
   * Calculates and updates the scrollbar width CSS custom property.
   * Only updates if the value has changed to avoid unnecessary DOM updates.
   */
  const updateScrollbarWidth = () => {
    let scrollbarWidth = window.innerWidth - HTML.clientWidth;

    // Only update if the value has changed to avoid unnecessary DOM updates.
    if (lastScrollbarWidth !== scrollbarWidth) {
      HTML.style.setProperty('--scrollbar-width', `${ scrollbarWidth }px`);

      lastScrollbarWidth = scrollbarWidth;
    }
  };

  /**
   * Debounced handler for scrollbar width updates.
   * Used by both resize and mutation observers.
   */
  const debouncedScrollbarUpdate = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateScrollbarWidth, 16);
  };

  /**
   * Opens details elements based on the current hash in the URL.
   * Finds the target element and opens its parent details element if present.
   */
  const openDetailsFromHash = () => {
    const hash = window.location.hash.slice(1); // remove #
    if (!hash) return;

    // Or, if the hash points to something inside a details
    const target = document.getElementById(hash);
    const detailsToOpen = target ? target.closest('details') : null;

    if (detailsToOpen) {
      detailsToOpen.open = true;
      detailsToOpen.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * **************************************************
   * Handlers
   */

  const handleHashchange = () => {
    openDetailsFromHash();
  }

  const handleResize = () => {
    debouncedScrollbarUpdate();
  };

  const handleMutationObserver = () => {
    clearTimeout(contentTimeout);
    contentTimeout = setTimeout(updateScrollbarWidth, 50);
  };

  const handleResizeObserver = () => {
    debouncedScrollbarUpdate();
  };

  /**
   * **************************************************
   * Observers
   */

  // Watch for DOM changes that might affect content height.
  if (typeof MutationObserver !== 'undefined') {
    mutationObserver = new MutationObserver(handleMutationObserver);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden'],
      characterData: true,
    });
  }

  // Set up ResizeObserver to watch for element size changes
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(handleResizeObserver);
    resizeObserver.observe(document.body);
  }

  /**
   * **************************************************
   * Listeners
   */

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('hashchange', handleHashchange, { passive: true });

  /**
   * **************************************************
   * Initialize
   */

  openDetailsFromHash();
  updateScrollbarWidth();
});
