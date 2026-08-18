import './accordion.scss';

import { Collapsible } from 'utils/Collapsible';

Drupal.behaviors.layoutAccordion = {
  attach(context) {
    once('layout-accordion', '.layout--accordion', context).forEach((layout) => {
      const details = layout.querySelector('.layout__details');
      if (!details) return;

      new Collapsible(details, '.layout__summary', '.layout__regions');
    });
  },
};
