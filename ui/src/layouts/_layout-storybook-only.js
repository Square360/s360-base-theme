import './_layout-storybook-only.scss';

const REGION_WIDTH_LABEL_CLASS = 'layout__region-width';

/**
 * Create a consistent region width label.
 *
 * @param {number} width
 *   The region width.
 *
 * @returns {string}
 *   The formatted width string.
 */
function formatRegionWidth(width) {
  return `${ Math.round(width) }px`;
}

/**
 * Ensure a width badge exists for the region.
 *
 * @param {HTMLElement} region
 *   The layout region element.
 *
 * @returns {HTMLElement}
 *   The width badge element.
 */
function getRegionWidthLabel(region) {
  let label = region.querySelector(`.${ REGION_WIDTH_LABEL_CLASS }`);

  if (!label) {
    label = document.createElement('span');
    label.classList.add(REGION_WIDTH_LABEL_CLASS);
    label.setAttribute('aria-hidden', 'true');
    region.prepend(label);
  }

  return label;
}

/**
 * Update the region width badge.
 *
 * @param {HTMLElement} region
 *   The layout region element.
 */
function updateRegionWidth(region) {
  const label = getRegionWidthLabel(region);
  label.textContent = formatRegionWidth(region.getBoundingClientRect().width);
}

/**
 * Update all region width badges.
 *
 * @param {NodeListOf<HTMLElement>} regions
 *   The layout region elements.
 */
function updateAllRegionWidths(regions) {
  regions.forEach(region => {
    updateRegionWidth(region);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const regions = document.querySelectorAll('.layout--debug .layout__region');

  if (!regions.length) {
    return;
  }

  const regionWidthObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      updateRegionWidth(entry.target);
    });
  });

  updateAllRegionWidths(regions);

  regions.forEach(region => {
    regionWidthObserver.observe(region);
  });

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(() => {
      updateAllRegionWidths(regions);
    });
  });
});
