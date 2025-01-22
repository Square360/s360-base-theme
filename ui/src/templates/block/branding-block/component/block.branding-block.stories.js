import brandingBlockTwig from './block.branding-block.twig';
import brandingBlockData from './block.branding-block.yml';
import './block.branding-block.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Branding Block' };

export const brandingBlock = (args) => {
  return brandingBlockTwig({
    ...args
  });
}
brandingBlock.args = brandingBlockData;
