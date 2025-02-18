import brandingBlockTwig from './block.branding-block.twig';
import brandingBlockData from './block.branding-block.yml';
import './block.branding-block.js';

/**
 * Storybook Definition.
 */
export default { title: 'Site Layout/Branding Block' };

export const brandingBlock = (args) => {
  let { block_site_name, block_site_logo } = args ?? '';

  block_site_name = (block_site_name)
    ? block_site_name
    : brandingBlockData.block_site_name;

  block_site_logo = (block_site_logo)
    ? block_site_logo
    : brandingBlockData.block_site_logo;


  return brandingBlockTwig({
    block_site_name,
    block_site_logo
  });
}
brandingBlock.args = brandingBlockData;
