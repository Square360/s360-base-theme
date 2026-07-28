import iconTwig from './icon.twig';
import iconData from './icon.yml';
import './icon.js';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Icon',
};

const groupedIcons = iconData.icon_groups ?? {};
const allIcons = iconData.icons ?? Object.values(groupedIcons).flatMap(group => group.icons ?? []);

export const all = () => {
  let groupsMarkup = [];

  if (Object.keys(groupedIcons).length > 0) {
    Object.values(groupedIcons).forEach(group => {
      const iconsMarkup = (group.icons ?? []).map(icon => `
        <div style="display: flex; flex-direction: column; align-items: center; font-size: 4rem;">
          ${iconTwig({ icon_name: icon })}
          <div style="font-size: 1rem;">${icon}</div>
        </div>
      `);

      groupsMarkup.push(`
        <section style="display:flex; flex-direction:column; gap: 16px; width: 100%;">
          <h2 style="margin: 0; font-size: 1.5rem;">${group.label}</h2>
          <div style="display:flex; flex-wrap: wrap; gap: 40px;">${iconsMarkup.join('')}</div>
        </section>
      `);
    });

    return `<div style="display:flex; flex-direction: column; gap: 40px;">${groupsMarkup.join('')}</div>`;
  }

  const fallbackIcons = allIcons.map(icon => `
    <div style="display: flex; flex-direction: column; align-items: center; font-size: 4rem;">
      ${iconTwig({ icon_name: icon })}
      <div style="font-size: 1rem;">${icon}</div>
    </div>
  `);

  return `<div style="display:flex; flex-wrap: wrap; gap: 40px;">${fallbackIcons.join('')}</div>`;
}

export const icon = (args) => {
  let data = Object.assign(iconData ?? {}, args);

  return iconTwig({
    icon_name: data.icon
  });
};
icon.argTypes = {
  icon: {
    options: [...allIcons],
    control: {
      type: 'select',
    },
  }
}
icon.args = {
  icon: allIcons[0]
}
