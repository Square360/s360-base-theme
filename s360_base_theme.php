<?php

s360_theme_init();

function s360_theme_init() {
  $theme_name = get_cli_option('theme-name');

  if (!$theme_name) {
    print "WTF";
    return false;
  }

  $machine_name = str_replace(' ', '_', strtolower($theme_name));

  $search = [
    // Machine names can only contain letters, numbers and underscores.
    '/[^a-z0-9_]/',
    // Machine names must always begin with a letter.
    '/^[^a-z]+/',
  ];

  $machine_name = preg_replace($search, '', $machine_name);

  s360_theme_create($theme_name, $machine_name);
}

function s360_theme_create($theme_name, $machine_name) {
  $theme_dir = substr(getcwd(), 0, strpos(getcwd(), 'themes') + 6);

  $custom_theme_path = $theme_dir . DIRECTORY_SEPARATOR . 'custom' . DIRECTORY_SEPARATOR . $machine_name;

  $create_custom_theme_dir_status = @mkdir(normalize_path($custom_theme_path), 0755, TRUE);
  if ($create_custom_theme_dir_status !== TRUE) {
    return 'custom theme could not be created';
  }

  // $directories_to_copy = get_directories_to_copy();
  // $directories_to_copy_status = copy_directories($directories_to_copy, $custom_theme_path);
  // if ($directories_to_copy_status !== TRUE) {
  //   return 'Failed to copy directories';
  // }

  $files_to_copy = get_files_to_copy();
  $files_to_copy_status = copy_directories($files_to_copy, $custom_theme_path);

  if ($files_to_copy_status !== TRUE) {
    return 'Failed to files';
  }
}

function is_windows() {
  return strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';
}

function normalize_path($path) {
  if (is_windows()) {
    $path = str_replace('/', '\\', strtolower($path));
  }
  else {
    $path = str_replace('\\', '/', $path);
  }

  return trim($path);
}

function get_cli_options() {
  global $argv;

  $options = [];

  foreach ($argv as $key => $arg) {
    // if (strpos($arg, '=') !== FALSE) {
    //   dt('Error: Please do not use equal signs in your options.');
    //   exit;
    // }
    switch ($arg) {
      case "-theme-name":
      case "--theme-name":
        $options['theme-name'] = $argv[$key + 1];
        break;
      case "-storybook":
      case "--storybook":
        $options['storybook'] = TRUE;
        break;
    }
  }

  return $options;
}

function get_cli_option($option) {
  $cli_options = get_cli_options();

  return (!empty($cli_options[$option])) ? $cli_options[$option] : FALSE;
}

function _recursive_copy($src, $dest) {
  if (is_dir($src)) {
    // Make the destination directory if not exist
    @mkdir($dest);

    $dir_handle = opendir($src);

    while ($file = readdir($dir_handle)) {
      if ($file != "." && $file != "..") {
        _recursive_copy($src . DIRECTORY_SEPARATOR . $file, $dest . DIRECTORY_SEPARATOR . $file);
      }
    }

    closedir($dir_handle);
  }
  else {
    copy($src, $dest);
  }
}

function copy_directories($files, $theme_path) {
  foreach ($files as $file) {
    $src = getcwd() . DIRECTORY_SEPARATOR . $file;

    $file = explode(DIRECTORY_SEPARATOR, $file);
    $dest = $theme_path . DIRECTORY_SEPARATOR . end($file);

    print "SRC: " . $src . PHP_EOL;
    print "DEST: " . $dest . PHP_EOL;
//
    _recursive_copy($src, $dest);
  }
}

// /**
//  * Returns an array of directories to be copied.
//  *
//  * @return array
//  */
// function get_directories_to_copy() {
//   if (get_cli_option('storybook')) {
//     $directories = [
//       'storybook_base/.storybook',
//       'storybook_base/components',
//       'storybook_base/scripts',
//       'storybook_base/util',
//       'storybook_base/webpack',
//       'templates',
//       'theme-hooks'
//     ];
//   }
//   else {
//     $directories = [
//       'templates',
//       'theme-hooks'
//     ];
//   }

//   return $directories;
// }

/// FILES ///

// function copy_files($files, $theme_path) {
//   foreach ($files as $file) {
//     copy(
//       getcwd() . DIRECTORY_SEPARATOR . $file,
//       $theme_path . DIRECTORY_SEPARATOR . $file
//     );
//   }
// }

function get_files_to_copy() {
  if (get_cli_option('storybook')) {
    $files = [
      // '.browserslistrc',
      '.editorconfig',
      // '.eslintignore',
      // '.eslintrc.yml',
      // '.gitignore',
      // '.npmrc',
      // 'a11y.config.js',
      // 'babel.config.js',
      // 'lint-staged.config.js',
      // 'package.json',
      's360_base_theme.theme',
      'storybook_setup/postcss.config.js',
      'storybook_setup/.storybook',
      // 'prettier.config.js',
      'storybook_setup/s360_base_theme.info.yml',
      'storybook_setup/s360_base_theme.libraries.yml',
    ];
  }
  else {
    $files = [
      '.editorconfig',
      's360_base_theme.theme',
      's360_base_theme.info.yml',
      's360_base_theme.libraries.yml',
    ];
  }


  return $files;
}

// function get_files_to_rename() {
//   return [
//     's360_base_theme.breakpoints.yml',
//     's360_base_theme.info.yml',
//     's360_base_theme.libraries.yml',
//     's360_base_theme.theme',
//   ];
// }

// function get_files_to_alter() {
//   return [
//     'theme-hooks',
//     's360_base_theme.info.yml',
//     's360_base_theme.libraries.yml',
//     's360_base_theme.theme',
//   ];
// }

// read the entire string
// $str = file_get_contents('s360_base_theme.theme');

// $str = str_replace('s360_base_theme', 'new_theme', $str);

// //write the entire string
// file_put_contents('s360_base_theme.theme', $str);
