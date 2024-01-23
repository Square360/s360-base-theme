import brandingBlockTwig from './branding-block.twig';
import './branding-block.js';

/**
 * Storybook Definition.
 */
export default { title: 'Layout/Branding Block' };

export const brandingBlock = () => {
  return brandingBlockTwig();
}
