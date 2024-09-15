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
          { name: 'Isolated Component', value: 'component' },
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
          'Full',
          'Teaser',
        ]
      }
    ],
    actions: (data) => {
      let actions = [];

      if (data.entityType == 'node') {
        if (plop.getHelper('kebabCase')(data.viewMode) === 'full') {
          /**
           * @see component.stories.hbs
          */
          data.storybookTitle = `Content Types/${ plop.getHelper('titleCase')(data.componentName) }`;
          data.storybookStoryFnName = plop.getHelper('camelCase')(data.componentName);

          /**
           * @see component.twig.hbs
          */
          data.drupalTwigTemplate = '@ui-node/node--full.html.twig';
          data.drupalBlockName = 'node_content';
        }
        else if (plop.getHelper('kebabCase')(data.viewMode).includes('teaser')) {
          data.entityType = 'node-teaser';

          /**
           * @see component.stories.hbs
          */
          // Remove any special chars from the view mode and clean up any double spaces.
          data.storybookTitle = `Content Types/${ plop.getHelper('titleCase')(data.componentName) }/${ data.viewMode.replace(/[^\w\s]/gi, '').replace(/\s\s/gi, ' ') }`;
          data.storybookStoryFnName = plop.getHelper('camelCase')(data.viewMode);

          /**
           * @see component.twig.hbs
          */
          data.drupalTwigTemplate = '@ui-node/component/node-teaser/node-teaser.twig';
          data.drupalBlockName = 'node_teaser_content';
        }

        /**
         * @see component.style.hbs
         */
        data.componentClassName = `${ data.entityType }--${ plop.getHelper('kebabCase')(data.componentName) }`;
        data.componentClassModifier = `${ data.entityType }--${ plop.getHelper('kebabCase')(data.viewMode).replace('teaser-', '') }`;

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         */
        data.componentName = `${ plop.getHelper('kebabCase')(data.componentName) }.${ plop.getHelper('kebabCase')(data.viewMode) }`;

        /**
         * @see component.twig.hbs
        */
        data.componentClasses = [
          `${ data.entityType }`,
          data.componentClassName,
          data.componentClassModifier
        ];

        /**
         * @see drupal-twig.hbs
         */
        data.componentTwigTemplate = `@ui-node/${ data.componentName.replace('.', '/') }/component/${ data.componentName }.twig`;
        data.drupalLibraryAssetPartial = `node.${ data.componentName }`;

        let actionPath = `src/templates/node/${ data.componentName.replace('.', '/') }`;

        actions.push(addComponentScript(`${ actionPath }/component/${ data.componentName }.js`));
        actions.push(addComponentStyle(`${ actionPath }/component/${ data.componentName }.scss`));
        actions.push(addComponentStories(`${ actionPath }/component/${ data.componentName }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/component/${ data.componentName }.yml`));
        actions.push(addComponentTwig(`${ actionPath }/component/${ data.componentName }.twig`));

        actions.push(addDrupalTwig(`${ actionPath }/node--${ data.componentName.replace('.', '--') }.html.twig`));
      }
      else if (data.entityType == 'paragraph') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Layout Components/${ data.componentName }`;
        data.storybookStoryFnName = plop.getHelper('camelCase')(data.componentName);

        /**
         * @see component.style.hbs
         */
        data.componentClassName = plop.getHelper('kebabCase')(data.componentName);

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         */
        data.componentName = plop.getHelper('kebabCase')(data.componentName);

        /**
         * @see component.twig.hbs
         */
        data.drupalTwigTemplate = '@ui-paragraph/paragraph.html.twig';
        data.drupalBlockName = 'paragraph_content';
        data.componentClasses = [
          data.componentClassName
        ];

        /**
         * @see drupal-twig.hbs
         */
        data.componentTwigTemplate = `@ui-paragraph/${ data.componentName }/component/${ data.componentName }.twig`;
        data.drupalLibraryAssetPartial = `paragraph.${ data.componentName }`;

        let actionPath = `src/templates/paragraph/${ data.componentName }`;

        actions.push(addComponentScript(`${ actionPath }/component/${ data.componentName }.js`));
        actions.push(addComponentStyle(`${ actionPath }/component/${ data.componentName }.scss`));
        actions.push(addComponentStories(`${ actionPath }/component/${ data.componentName }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/component/${ data.componentName }.yml`));
        actions.push(addComponentTwig(`${ actionPath }/component/${ data.componentName }.twig`));

        actions.push(addDrupalTwig(`${ actionPath }/paragraph--${ data.componentName }.html.twig`));
      }
      else if (data.entityType == 'component') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Components/${ data.componentName }`;
        data.storybookStoryFnName = plop.getHelper('camelCase')(data.componentName);

        /**
         * @see component.style.hbs
         */
        data.componentClassName = plop.getHelper('kebabCase')(data.componentName);

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         */
        data.componentName = plop.getHelper('kebabCase')(data.componentName);

        /**
         * @see component.twig.hbs
        */
        data.componentClasses = [
          data.componentClassName,
        ];

        let actionPath = `src/components/${ data.componentName }`;

        actions.push(addComponentScript(`${ actionPath }/${ data.componentName }.js`));
        actions.push(addComponentStyle(`${ actionPath }/${ data.componentName }.scss`));
        actions.push(addComponentStories(`${ actionPath }/${ data.componentName }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/${ data.componentName }.yml`));
        actions.push(addComponentTwig(`${ actionPath }/${ data.componentName }.twig`));
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

function addComponentTwig(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/component.twig.hbs',
    skipIfExists: true
  }
}

function addDrupalTwig(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/drupal-twig.hbs',
    skipIfExists: true
  }
}
