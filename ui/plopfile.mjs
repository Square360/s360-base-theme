export default function (plop) {
  // controller generator
  plop.setGenerator('entity', {
    prompts: [
      {
        type: 'list',
        name: 'entityType',
        message: 'Entity Type',
        choices: [
          { name: 'Content Type', value: 'node' },
          { name: 'Paragraph', value: 'paragraph' },
          { name: 'Isolated Component', value: 'components' },
        ]
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Name (Human Readable Name):'
      },
      {
        when(context) {
          return context.entityType === 'node';
        },
        type: 'list',
        name: 'viewMode',
        message: 'View Mode',
        choices: [
          { name: 'Full', value: 'full' },
        ]
      }
    ],
    actions: (data) => {
      data.componentNameToKebabCase = plop.getHelper('kebabCase')(data.componentName);
      data.componentNameToCamelCase = plop.getHelper('camelCase')(data.componentName);

      let actions = [];

      if (data.entityType == 'paragraph') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Layout Components/${ data.componentName }`;

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         */
        data.componentFilenamePartial = data.componentNameToKebabCase;

        /**
         * Set the top level class name for the component.
         * @see component.style.hbs
         */
        data.componentNameCssSelector = data.componentNameToKebabCase;

        /**
         * Set all the classes for the component.
         * @see drupal-component.twig.hbs
        */
        data.componentClasses = [
          data.componentNameToKebabCase
        ];

        /**
         * Set the partial name for the template being extended.
         * @see drupal-component.twig.hbs
         */
        data.drupalEntityTemplatePartial = `${ data.entityType }/${ data.entityType }`;

        /**
         * Set the partial name for the template being included.
         * @see drupal-twig.hbs
         */
        data.componentTemplatePartial = `${ data.entityType }/${ data.componentNameToKebabCase }/component/${ data.componentNameToKebabCase }`;

        let actionPath = `src/templates/${ data.entityType }/${ data.componentNameToKebabCase }`;

        actions.push(addComponentScript(`${ actionPath }/component/${ data.componentFilenamePartial }.js`));
        actions.push(addComponentStyle(`${ actionPath }/component/${ data.componentFilenamePartial }.scss`));
        actions.push(addComponentStories(`${ actionPath }/component/${ data.componentFilenamePartial }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/component/${ data.componentFilenamePartial }.yml`));

        actions.push(addDrupalComponentAction(`${ actionPath }/component/${ data.componentFilenamePartial }.twig`));
        actions.push(addDrupalTwigAction(`${ actionPath }/${ data.entityType }--${ data.componentNameToKebabCase }.html.twig`));
      }
      else if (data.entityType == 'node') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Content Types/${ data.componentName }`;

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         */
        data.componentFilenamePartial = `${ data.componentNameToKebabCase }.${ data.viewMode }`;

        /**
         * Set the top level class name for the component.
         * @see component.style.hbs
         */
        data.componentNameCssSelector = `${ data.entityType }--${ data.componentNameToKebabCase }`;

        /**
         * Set all the classes for the component.
         * @see drupal-component.twig.hbs
        */
        data.componentClasses = [
          `${ data.entityType }`,
          `${ data.entityType }--${ data.componentNameToKebabCase }`,
          `${ data.entityType }--${ data.viewMode }`
        ];

        /**
         * Set the partial name for the template being extended.
         *
         * @see drupal-component.twig.hbs
         */
        data.drupalEntityTemplatePartial = (data.viewMode === 'full')
          ? `${ data.entityType }/${ data.entityType }--${ data.viewMode }.html.twig`
          : `${ data.entityType }/_${ data.entityType }-teaser.twig`;

        /**
         * Set the partial name for the template being included.
         * @see drupal-twig.hbs
         */
        data.componentTemplatePartial = `${ data.entityType }/${ data.componentNameToKebabCase }/${ data.viewMode }/component/${ data.componentFilenamePartial }`;

        let actionPath = `src/templates/${ data.entityType }/${ data.componentNameToKebabCase }/${ data.viewMode }`;

        actions.push(addComponentScript(`${ actionPath }/component/${ data.componentFilenamePartial }.js`));
        actions.push(addComponentStyle(`${ actionPath }/component/${ data.componentFilenamePartial }.scss`));
        actions.push(addComponentStories(`${ actionPath }/component/${ data.componentFilenamePartial }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/component/${ data.componentFilenamePartial }.yml`));

        actions.push(addDrupalComponentAction(`${ actionPath }/component/${ data.componentFilenamePartial }.twig`));
        actions.push(addDrupalTwigAction(`${ actionPath }/${ data.entityType }--${ data.componentNameToKebabCase }--${ data.viewMode }.html.twig`));
      }
      else if (data.entityType == 'components') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Components/${ data.componentName }`;

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         */
        data.componentFilenamePartial = data.componentNameToKebabCase;

        /**
         * Set the top level class name for the component.
         * @see component.style.hbs
         */
        data.componentNameCssSelector = data.componentNameToKebabCase;

        /**
         * Set all the classes for the component.
         * @see drupal-component.twig.hbs
        */
        data.componentClasses = [
          data.entityType,
        ];

        let actionPath = `src/${ data.entityType }/${ data.componentNameToKebabCase }`;

        actions.push(addComponentScript(`${ actionPath }/${ data.componentFilenamePartial }.js`));
        actions.push(addComponentStyle(`${ actionPath }/${ data.componentFilenamePartial }.scss`));
        actions.push(addComponentStories(`${ actionPath }/${ data.componentFilenamePartial }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/${ data.componentFilenamePartial }.yml`));
      }

      return actions;
    }
  });
};

function addComponentScript(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/component.script.hbs',
    skipIfExists: true
  }
}

function addComponentStyle(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/component.style.hbs',
    skipIfExists: true
  }
}

function addComponentStories(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/component.stories.hbs',
    skipIfExists: true
  }
}

function addComponentYml(path) {
  return {
    type: 'add',
    path,
    skipIfExists: true
  }
}


function addDrupalComponentAction(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/drupal-component.twig.hbs',
    skipIfExists: true
  }
}

function addDrupalTwigAction(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/drupal-twig.hbs',
    skipIfExists: true
  }
}
