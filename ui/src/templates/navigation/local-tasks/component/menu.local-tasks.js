import './menu.local-tasks.scss';
import './menu.local-tasks.scss';

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const menuLocalTasks = document.querySelector('[data-js="menu-local-tasks"]');

  let resizeTimeout;
  let lastMenuLocalTasksHeight = null;

  const updateMenuLocalTasksHeight = () => {
    let menuLocalTasksHeight = menuLocalTasks.clientHeight;

    // Only update if the value has changed to avoid unnecessary DOM updates.
    if (lastMenuLocalTasksHeight !== menuLocalTasksHeight) {
      html.style.setProperty('--menu-local-tasks-height', `${ menuLocalTasksHeight }px`);

      lastMenuLocalTasksHeight = menuLocalTasksHeight;
    }
  };

  /**
   * **************************************************
   * Handlers
   */

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateMenuLocalTasksHeight, 16);
  };

  /**
   * **************************************************
   * Listeners
   */

  window.addEventListener('resize', handleResize, { passive: true });

  updateMenuLocalTasksHeight();
});
