import { BaseAnimator } from './BaseAnimator.js';

export class FadeInSlideRightAnimator extends BaseAnimator {
  constructor(elements, delay, transitionDuration) {
    super(elements, delay, transitionDuration, {
      setAnimatedProperties: (element) => {
        element.style.setProperty('opacity', 1);
        element.style.setProperty('translate', '0px 0px');
      }
    });
  }
}
