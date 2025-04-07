import brandingBlockTwig from './block.branding-block.twig';
import brandingBlockData from './block.branding-block.yml';
import './block.branding-block.js';

/**
 * Storybook Definition.
 */
export default { title: 'Site Layout/Branding Block' };

export const brandingBlock = (args) => {
  let data = args ?? brandingBlockData;

  return brandingBlockTwig({
    ...data,
  });
}
brandingBlock.args = brandingBlockData;
