/**
 * @see ui-core/_intersection-animator.scss
 */
export class BaseAnimator {
  constructor(
    elements,
    delay = 150,
    transitionDuration = 500,
    propertySetters = {}
  ) {
    this.elements = elements;
    this.delay = delay;
    this.transitionDuration = transitionDuration;

    // Merge custom property setters with defaults.
    this.propertySetters = {
      setAnimatedProperties: this.setAnimatedProperties.bind(this),
      ...propertySetters
    };

    const IS_REDUCED =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (IS_REDUCED) return;

    // Convert elements to array - handles NodeList, HTMLCollection, single
    // element, or existing array.
    let elementsArray = Array.from(elements.length !== undefined ? elements : [elements]);

    elementsArray = elementsArray.map(element => {
      let elementClass = element.getAttribute('class');
      let elementClassChain = elementClass.split('__');
      let elementParent = element.closest(`.${ elementClassChain[0] }`);

      // If "data-no-animation" attr is set return TRUE, FALSE otherwise.
      const noAnimation =
        element.hasAttribute('data-no-animation') ||
        (elementParent && elementParent.hasAttribute('data-no-animation'));

      return { element, noAnimation };
    });

    // Check if IntersectionObserver is available.
    if (typeof IntersectionObserver !== 'undefined') {
      const OBSERVER = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const { element, noAnimation } = elementsArray.find(item => item.element === entry.target);
            const delay = noAnimation ? 0 : index * this.delay;

            element.style.setProperty('transition-delay', `${delay}ms`);
            this.propertySetters.setAnimatedProperties(element);

            OBSERVER.unobserve(element);
          }
        });
      }, {
        root: null,
        threshold: 0,
        rootMargin: '0% 0% -50px 0%'
      });

      elementsArray.forEach(({ element, noAnimation }) => {
        const duration = noAnimation ? 0 : this.transitionDuration;

        element.style.setProperty('transition-duration', `${duration}ms`);
      });

      setTimeout(() => {
        elementsArray.forEach(({ element }) => {
          OBSERVER.observe(element);
        });
      });
    }

    // Fallback: IntersectionObserver not available, apply animated properties
    // immediately.
    else {
      elementsArray.forEach(({ element, noAnimation }) => {
        const duration = noAnimation ? 0 : this.transitionDuration;

        element.style.setProperty('transition-duration', `${duration}ms`);
        this.propertySetters.setAnimatedProperties(element);
      });
    }
  }

  /**
   * Override this method in subclasses to set initial CSS properties
   * @param {HTMLElement} element - The element to set properties on
   */
  setAnimatedProperties(element) { }
}
