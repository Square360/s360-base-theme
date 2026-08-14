/**
 * @file
 * Collapsible component with smooth animated expand/collapse transitions.
 * Uses native HTML details/summary elements with WAAPI animations.
 */

/**
 * Collapsible component class.
 * Manages the animated expand/collapse behavior of details elements.
 */
export class Collapsible {
  /**
   * Create a collapsible instance.
   * @param {HTMLDetailsElement} el - The details element to make collapsible.
   */
  constructor(el, summarySelector, contentSelector) {
    this.el = el;
    this.summary = el.querySelector(summarySelector);
    this.content = el.querySelector(contentSelector);

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;

    // Store if the element is closing
    this.isClosing = false;

    // Store if the element is expanding
    this.isExpanding = false;

    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.handleClick(e));
  }

  /**
   * Handle click events on the summary element.
   * @param {Event} e - The click event.
   */
  handleClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();

    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';

    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    }
    // Check if the element is being openned or is already open
    else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  /**
   * Animate the collapsible element closing (shrinking).
   */
  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-in-out'
    });

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);

    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  /**
   * Open the collapsible element.
   * Sets the open attribute and triggers the expand animation.
   */
  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;

    // Force the [open] attribute on the details element
    this.el.open = true;

    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  /**
   * Animate the collapsible element opening (expanding).
   */
  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;

    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;

    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-in-out'
    });

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);

    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  /**
   * Callback when animation completes.
   * Cleans up animation state and inline styles.
   * @param {boolean} open - Whether the element should be open or closed.
   */
  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;

    // Clear the stored animation
    this.animation = null;

    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;

    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}
