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
        message: 'Bundle Name'
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
      data.bundle = plop.getHelper('kebabCase')(data.bundle);
      data.componentName = data.bundle;

      let templatePath = `src/templates/${ data.entityType }/${ data.bundle }`;
      let drupalTemplateName = '';

      if (data.entityType == 'paragraph') {
        data.storyBookTitle = `Layout Components/${ plop.getHelper('titleCase')(data.bundle).replaceAll('-', ' ') }`;
        drupalTemplateName = `${ data.entityType }--${ data.bundle }.html.twig`;
      }
      else if (data.entityType == 'node') {
        data.viewMode = 'full';
        data.componentName = `${ data.bundle }.${ data.viewMode }`;
        data.storyBookTitle = `Content Types/${ plop.getHelper('titleCase')(data.bundle).replaceAll('-', ' ') }`;

        drupalTemplateName = `${ data.entityType }--${ data.bundle }--${ data.viewMode }.html.twig`;
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
          templateFile: './plop-templates/component.yml.hbs',
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
