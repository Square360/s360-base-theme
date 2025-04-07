import './node-teaser.scss';

Drupal.behaviors.nodeTeaser = {
  attach(context) {
    const TEASERS = context.querySelectorAll('.node-teaser');
    if (!TEASERS) return;

    const IS_REDUCED = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (IS_REDUCED) return;

    // Fade node teasers in.
    const DELAY_TIMER = 150; // milliseconds
    const OPACITY_START = '0';
    const OPACITY_END = '1';
    const TRANSLATION_START = '0 20px';
    const TRANSLATION_END = '0 0';

    const OBSERVER = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const teaser = entry.target;

          teaser.style.setProperty('--node-teaser--opacity', OPACITY_END);
          teaser.style.setProperty('--node-teaser--translate', TRANSLATION_END);

          OBSERVER.unobserve(teaser);
        }
      });
    }, {
      root: null,
      threshold: 0,
      rootMargin: '0% 0% -50px 0%'
    });

    TEASERS.forEach(teaser => {
      teaser.style.setProperty('--node-teaser--opacity', OPACITY_START);
      teaser.style.setProperty('--node-teaser--translate', TRANSLATION_START);

      // Check if the parent has an index to stagger the fade in.
      if (teaser.parentElement.getAttribute('data-index')) {
        const DELAY = Number(teaser.parentElement.getAttribute('data-index')) * DELAY_TIMER;
        teaser.style.setProperty('--node-teaser--transition-delay', DELAY + 'ms');
      }

      OBSERVER.observe(teaser);
    });
  }
}
