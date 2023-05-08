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
      }
    ],
    actions: (data) => {
      let drupalTemplatePath = '';

      if (data.entityType == 'paragraph') {
        drupalTemplatePath = '../templates/{{ entityType }}/{{ entityType }}--{{ kebabCase bundle }}.html.twig';
      }
      else if (data.entityType == 'node') {
        drupalTemplatePath = '../templates/{{ entityType }}/{{ kebabCase bundle }}/{{ entityType }}--{{ kebabCase bundle }}--full.html.twig';
      }

      let actions = [
        {
          type: 'add',
          path: 'src/components/{{ entityType }}/{{ kebabCase bundle }}/{{ kebabCase bundle }}.js',
          templateFile: './config/plop-templates/component.script.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ entityType }}/{{ kebabCase bundle }}/{{ kebabCase bundle }}.scss',
          templateFile: './config/plop-templates/component.style.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ entityType }}/{{ kebabCase bundle }}/{{ kebabCase bundle }}.stories.js',
          templateFile: './config/plop-templates/component.stories.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ entityType }}/{{ kebabCase bundle }}/{{ kebabCase bundle }}.yml',
          templateFile: './config/plop-templates/component.yml.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ entityType }}/{{ kebabCase bundle }}/{{ kebabCase bundle }}.twig',
          templateFile: './config/plop-templates/component.twig.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: `${ drupalTemplatePath }`,
          templateFile: './config/plop-templates/component.drupal-twig.hbs',
          skipIfExists: true
        }
      ];

      return actions;
    }
  });
};
