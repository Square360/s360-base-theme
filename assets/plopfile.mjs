export default function (plop) {
  // controller generator
  plop.setGenerator('entity', {
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Entity Type',
        choices: [
          'node',
          'paragraph'
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Bundle Name'
      }
    ],
    actions: (data) => {
      // let drupalTemplatePath = '';

      // if (data.type == 'paragraph') {
      //   drupalTemplatePath = '../templates/{{ type }}/{{ type }}--{{ kebabCase name }}.html.twig';
      // }
      // else if (data.type == 'node') {
      //   drupalTemplatePath = '../templates/{{ type }}/{{ kebabCase name }}/{{ type }}--{{ kebabCase name }}--full.html.twig';
      // }

      let actions = [
        {
          type: 'add',
          path: 'src/components/{{ type }}/{{ kebabCase name }}/{{ kebabCase name }}.js',
          templateFile: './config/plop-templates/component.script.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ type }}/{{ kebabCase name }}/{{ kebabCase name }}.scss',
          templateFile: './config/plop-templates/component.style.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ type }}/{{ kebabCase name }}/{{ kebabCase name }}.stories.js',
          templateFile: './config/plop-templates/component.stories.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ type }}/{{ kebabCase name }}/{{ kebabCase name }}.yml',
          templateFile: './config/plop-templates/component.yml.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/components/{{ type }}/{{ kebabCase name }}/{{ kebabCase name }}.twig',
          templateFile: './config/plop-templates/component.twig.hbs',
          skipIfExists: true
        }
      ];

      // actions.push({
      //   type: 'add',
      //   path: `${ drupalTemplatePath }/--{{ kebabCase name }}.html.twig`,
      //   templateFile: './config/plop-templates/component.drupal-twig.hbs',
      //   skipIfExists: true
      // });

      return actions;
    }
  });
};
