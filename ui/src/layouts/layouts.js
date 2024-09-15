import './layout.scss';
import './accordion/_accordion.scss';
import './one-column/_one-column.scss';
import './two-column/_two-column.scss';
import './three-column/_three-column.scss';
import './four-column/_four-column.scss';

document.addEventListener('DOMContentLoaded', () => {
  const LAYOUTS = document.querySelectorAll('.layout');
  if (!LAYOUTS) return;

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
        const section = entry.target;
        section.style.setProperty('--layout-region--opacity', OPACITY_END);
        section.style.setProperty('--layout-region--translate', TRANSLATION_END);

        OBSERVER.unobserve(section);
      }
    });
  }, {
    root: null,
    threshold: 0,
    rootMargin: '0% 0% -50px 0%'
  });

  LAYOUTS.forEach(layout => {
    const REGIONS = layout.querySelectorAll('.layout__region');

    REGIONS.forEach((region, index) => {
      region.style.setProperty('--layout-region--opacity', OPACITY_START);
      region.style.setProperty('--layout-region--translate', TRANSLATION_START);
      region.style.setProperty('--layout-region--transition-delay', `${ index * DELAY_TIMER }ms`);

      OBSERVER.observe(region);
    });
  });
});
