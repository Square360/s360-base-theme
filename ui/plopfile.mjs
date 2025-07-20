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
      let componentBaseClass = '';
      let actionPath = '';

      data.componentName = plop.getHelper('kebabCase')(data.componentName);

      if (data.entityType == 'node') {
        data.viewMode = plop.getHelper('kebabCase')(data.viewMode);

        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Content Types/${ plop.getHelper('titleCase')(data.componentName).replace(/[^\w\s]/gi, ' ') }/${ plop.getHelper('titleCase')(data.viewMode).replace(/[^\w\s]/gi, ' ') }`;
        data.storybookFunctionName = plop.getHelper('camelCase')(data.viewMode);
        data.storybookComponentName = plop.getHelper('camelCase')(`${ data.componentName } ${ data.viewMode }`);

        if (data.viewMode === 'full') {
          componentBaseClass = 'node';

          /**
           * @see component.twig.hbs
           */
          data.drupalTwigTemplate = '@ui-node/node--full.html.twig';
          data.drupalBlockName = 'node_content';
        }
        else if (data.viewMode.includes('teaser')) {
          componentBaseClass = 'node-teaser';

          /**
           * @see component.twig.hbs
           */
          data.drupalTwigTemplate = '@ui-node/component/node-teaser/node-teaser.twig';
          data.drupalBlockName = 'node_teaser_content';
        }

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         * @see drupal-twig.hbs
         */
        data.componentFilename = `node.${ data.componentName }.${ data.viewMode }`;

        /**
         * @see component.style.hbs
         */
        data.componentClassName = `${ componentBaseClass }--${ data.componentName }`;
        data.componentClassModifier = `${ componentBaseClass }--${ data.viewMode.replace('teaser-', '') }`;

        /**
         * @see component.twig.hbs
         */
        data.componentClasses = [
          componentBaseClass,
          data.componentClassName,
          data.componentClassModifier
        ];

        /**
         * @see drupal-twig.hbs
         */
        data.componentTwigTemplate = `@ui-node/${ data.componentName }/${ data.viewMode }/component/${ data.componentFilename }.twig`;

        actionPath = `src/templates/node/${ data.componentName }/${ data.viewMode }`;

        actions.push(addComponentScript(`${ actionPath }/component/${ data.componentFilename }.js`));
        actions.push(addComponentStyle(`${ actionPath }/component/${ data.componentFilename }.scss`));
        actions.push(addComponentStories(`${ actionPath }/component/${ data.componentFilename }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/component/${ data.componentFilename }.yml`));
        actions.push(addDrupalComponentTwig(`${ actionPath }/component/${ data.componentFilename }.twig`));

        actions.push(addDrupalTwig(`${ actionPath }/node--${ data.componentName }--${ data.viewMode }.html.twig`));
      }
      else if (data.entityType == 'paragraph') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Layout Components/${ plop.getHelper('titleCase')(data.componentName).replace(/[^\w\s]/gi, ' ') }`;
        data.storybookFunctionName = plop.getHelper('camelCase')(data.componentName);
        data.storybookComponentName = plop.getHelper('camelCase')(data.componentName);

        /**
         * @see component.twig.hbs
         */
        data.drupalTwigTemplate = '@ui-paragraph/paragraph.html.twig';
        data.drupalBlockName = 'paragraph_content';

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         * @see drupal-twig.hbs
         */
        data.componentFilename = `paragraph.${ data.componentName }`;

        /**
         * @see component.style.hbs
         */
        data.componentClassName = data.componentName;

        /**
         * @see component.twig.hbs
         */
        data.componentClasses = [
          data.componentClassName,
        ];

        /**
         * @see drupal-twig.hbs
         */
        data.componentTwigTemplate = `@ui-paragraph/${ data.componentName }/component/${ data.componentFilename }.twig`;

        actionPath = `src/templates/paragraph/${ data.componentName }`;

        actions.push(addComponentScript(`${ actionPath }/component/${ data.componentFilename }.js`));
        actions.push(addComponentStyle(`${ actionPath }/component/${ data.componentFilename }.scss`));
        actions.push(addComponentStories(`${ actionPath }/component/${ data.componentFilename }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/component/${ data.componentFilename }.yml`));
        actions.push(addDrupalComponentTwig(`${ actionPath }/component/${ data.componentFilename }.twig`));

        actions.push(addDrupalTwig(`${ actionPath }/paragraph--${ data.componentName }.html.twig`));
      }
      else if (data.entityType == 'component') {
        /**
         * @see component.stories.hbs
         */
        data.storybookTitle = `Components/${ plop.getHelper('titleCase')(data.componentName).replace(/[^\w\s]/gi, ' ') }`;
        data.storybookFunctionName = plop.getHelper('camelCase')(data.componentName);
        data.storybookComponentName = plop.getHelper('camelCase')(data.componentName);

        /**
         * @see component.script.hbs
         * @see component.stories.hbs
         * @see drupal-twig.hbs
         */
        data.componentFilename = `${ data.componentName }`;

        /**
         * @see component.style.hbs
         */
        data.componentClassName = data.componentName;

        /**
         * @see component.twig.hbs
         */
        data.componentClasses = [
          data.componentClassName,
        ];

        let actionPath = `src/component/${ data.componentName }`;

        actions.push(addComponentScript(`${ actionPath }/${ data.componentFilename }.js`));
        actions.push(addComponentStyle(`${ actionPath }/${ data.componentFilename }.scss`));
        actions.push(addComponentStories(`${ actionPath }/${ data.componentFilename }.stories.js`));
        actions.push(addComponentYml(`${ actionPath }/${ data.componentFilename }.yml`));
        actions.push(addComponentTwig(`${ actionPath }/${ data.componentFilename }.twig`));
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

function addDrupalComponentTwig(path) {
  return {
    type: 'add',
    path,
    templateFile: './plop-templates/drupal-component.twig.hbs',
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
