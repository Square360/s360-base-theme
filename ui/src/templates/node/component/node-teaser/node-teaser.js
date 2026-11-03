import './node-teaser.scss';

Drupal.behaviors.nodeTeaser = {
  attach(context) {
    const teasers = once('node-teaser', '.node-teaser', context);
    if (!teasers.length) return;

    teasers.forEach((teaser) => {
      const img = teaser.querySelector('.node-teaser__image');

    });
  }
}
