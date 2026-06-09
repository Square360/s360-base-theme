import statusMessagesTwig from './status-messages.twig';
import statusMessagesData from './status-messages.yml';
import './status-messages.js';

/**
 * Storybook Definition.
 */
export default {
  title: 'Blocks/Status Messages',
};

export const statusMessages = (args) => {
  const data = Object.assign(structuredClone(statusMessagesData ?? {}), args);
  return statusMessagesTwig({ ...data });
};
statusMessages.args = statusMessagesData;
