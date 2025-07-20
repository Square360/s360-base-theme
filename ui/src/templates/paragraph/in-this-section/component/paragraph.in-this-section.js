import './paragraph.in-this-section.scss';

Drupal.behaviors.sectionMenu = {
  attach(context) {
    if (context !== document) {
      return;
    }

    const MQ_1024 = window.matchMedia('(min-width: 1024px)');

    const SECTION_MENUS = document.querySelectorAll('[data-js="in-this-section"]');
    if (!SECTION_MENUS) return;

    // **************************************************
    // MEDIA QUERIES

    MQ_1024.onchange = (e) => {
      mq1024OnChange(e);
    }

    function mq1024OnChange(e) {
      SECTION_MENUS.forEach(sectionMenu => {
        sectionMenu.removeAttribute('open');

        // Desktop
        if (e.matches) {
          sectionMenu.setAttribute('open', true);
        }
      });
    }

    mq1024OnChange(MQ_1024);
  }
}
