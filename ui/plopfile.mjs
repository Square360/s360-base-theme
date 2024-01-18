export default function (plop) {
  // controller generator
  plop.setGenerator('entity', {
    prompts: [
      {
        type: 'list',
        name: 'entityType',
        message: 'Entity Type',
        choices: [
          'node',
          'paragraph'
        ]
      },
      {
        type: 'input',
        name: 'bundle',
        message: 'Bundle Name (Human Readable Name):'
      },
      // {
      //   when(context) {
      //     return context.entityType === 'node';
      //   },
      //   type: 'list',
      //   name: 'viewMode',
      //   message: 'View Mode',
      //   choices: [
      //     'full',
      //     'teaser'
      //   ]
      // }
    ],
    actions: (data) => {
      let templatePath = `src/templates/${ data.entityType }/${ plop.getHelper('kebabCase')(data.bundle) }`;
      let drupalTemplateName = '';

      if (data.entityType == 'paragraph') {
        data.componentName = plop.getHelper('kebabCase')(data.bundle);
        data.storyBookTitle = `Layout Components/${ data.bundle }`;
        drupalTemplateName = `${ data.entityType }--${ plop.getHelper('kebabCase')(data.bundle) }.html.twig`;
      }
      else if (data.entityType == 'node') {
        data.viewMode = 'full';
        data.componentName = `${ plop.getHelper('kebabCase')(data.bundle) }.${ data.viewMode }`;
        data.storyBookTitle = `Content Types/${ data.bundle }`;

        drupalTemplateName = `${ data.entityType }--${ plop.getHelper('kebabCase')(data.bundle) }--${ data.viewMode }.html.twig`;
        templatePath = `${ templatePath }/${ data.viewMode }`;
      }

      let actions = [
        {
          type: 'add',
          path: `${ templatePath }/component/{{ componentName }}.js`,
          templateFile: './plop-templates/component.script.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: `${ templatePath }/component/{{ componentName }}.scss`,
          templateFile: './plop-templates/component.style.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: `${ templatePath }/component/{{ componentName }}.stories.js`,
          templateFile: './plop-templates/component.stories.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: `${ templatePath }/component/{{ componentName }}.yml`,
          skipIfExists: true
        },
        {
          type: 'add',
          path: `${ templatePath }/component/{{ componentName }}.twig`,
          templateFile: './plop-templates/component.twig.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: `${ templatePath }/${ drupalTemplateName }`,
          templateFile: './plop-templates/drupal-twig.hbs',
          skipIfExists: true
        }
      ];

      return actions;
    }
  });
};
