import './section-menu.scss';

Drupal.behaviors.sectionMenu = {
  attach(context) {
    if (context !== document) {
      return;
    }

    const MQ_1024 = window.matchMedia('(min-width: 1024px)');

    const SECTION_MENUS = document.querySelectorAll('[data-js="section-menu"]');
    if (!SECTION_MENUS) return;

    // **************************************************
    // MEDIA QUERIES

    MQ_1024.onchange = (e) => {
      mq1024OnChange(e);
    }

    function mq1024OnChange(e) {
      SECTION_MENUS.forEach(sectionMenu => {
        sectionMenu.removeAttribute('open');
        sectionMenu.setAttribute('data-dark-mode', true);

        // Desktop
        if (e.matches) {
          sectionMenu.setAttribute('open', true);
          sectionMenu.removeAttribute('data-dark-mode');
        }
      });
    }

    mq1024OnChange(MQ_1024);
  }
}
