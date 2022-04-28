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
  $kebab_name = str_replace('_', '-', $machine_name);

  s360_theme_create($theme_name, $machine_name, $kebab_name);
}

function s360_theme_create($theme_name, $machine_name, $kebab_name) {
  $theme_dir = substr(getcwd(), 0, strpos(getcwd(), 'themes') + 6);

  $theme_path = $theme_dir . DIRECTORY_SEPARATOR . 'custom' . DIRECTORY_SEPARATOR . $machine_name;

  if (!is_dir(normalize_path($theme_path))) {
    $create_custom_theme_dir_status = @mkdir(normalize_path($theme_path), 0755, TRUE);

    if ($create_custom_theme_dir_status !== TRUE) {
      return 'custom theme could not be created' . PHP_EOL;
    }
  }

  $files_to_copy = get_files_to_copy();
  $files_to_copy_status = copy_files($files_to_copy, $theme_path);

  if ($files_to_copy_status !== TRUE) {
    print 'Failed to files' . PHP_EOL;
  }

  $alterations = set_alterations($theme_name, $machine_name, $kebab_name);
  $files_to_alter = get_files_to_alter();
  $files_to_alter_status = alter_files($theme_path, $files_to_alter, $alterations);

  if ($files_to_alter_status !== TRUE) {
    print 'Failed to alter files' . PHP_EOL;
  }

  $files_to_rename = get_files_to_rename();
  $files_to_rename_status = rename_files($files_to_rename, $theme_path, $machine_name);

  if ($files_to_rename_status !== TRUE) {
    print 'Failed to rename files' . PHP_EOL;
  }
}

function _recursive_copy($src, $dest) {
  if (is_dir($src)) {
    // Make the destination directory if not exist
    @mkdir($dest, 0755, TRUE);

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

function copy_files($files, $theme_path) {
  foreach ($files as $file) {
    $src = getcwd() . DIRECTORY_SEPARATOR . $file;

    $file = explode(DIRECTORY_SEPARATOR, $file);

    if (in_array('assets', $file)) {
      $file = 'assets' . DIRECTORY_SEPARATOR . end($file);
    }
    else {
      $file = end($file);
    }

    $dest = $theme_path . DIRECTORY_SEPARATOR . $file;

    $recursive_copy_status = _recursive_copy($src, $dest);
  }

  return TRUE;
}

function get_files_to_copy() {
  $common_files = [
    '.editorconfig',
    's360_base_theme.theme',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    'templates',
    'theme-hooks',
  ];

  if (get_cli_option('storybook')) {
    $storybook_files = [
      'assets/.storybook',
      'assets/components',
      'assets/config',
      'assets/src',
      'assets/.babelrc',
      'assets/package.json',
      'assets/tsconfig.json',
      'assets/webpack.config.ts',
    ];

    $files = array_merge($common_files, $storybook_files);
  }

  return $files;
}

function get_files_to_rename() {
  return [
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.theme',
  ];
}

function rename_files(array $files_to_rename, string $theme_path, string $machine_name) {
  foreach ($files_to_rename as $file_to_rename) {
    $file_original_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_rename;
    $file_new_path = $theme_path . DIRECTORY_SEPARATOR . str_replace('s360_base_theme', $machine_name, $file_to_rename);

    rename($file_original_path, normalize_path($file_new_path));
  }

  return TRUE;
}

function get_files_to_alter() {
  $common_files = [
    'theme-hooks',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.theme',
  ];

  if (get_cli_option('storybook')) {
    $storybook_files = [
      'assets/package.json',
    ];

    $files = array_merge($common_files, $storybook_files);
  }


  return $files;
}

function set_alterations(string $theme_name, string $machine_name, string $kebab_name) {
  return [
    'S360 Base Theme' => $theme_name,
    's360_base_theme' => $machine_name,
    's360-base-theme' => $kebab_name,
  ];
}

function alter_files(string $theme_path, array $files_to_alter, array $alterations, bool $absolute = FALSE) {
  foreach ($files_to_alter as $file_to_alter) {
    if ($absolute === TRUE) {
      $file_type = filetype(realpath($file_to_alter));
      $file_path = $file_to_alter;
    }
    else {
      $file_type = filetype($theme_path . DIRECTORY_SEPARATOR . $file_to_alter);
      $file_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_alter;
    }

    if ($file_type === 'dir') {
      $files = scandir($file_path);
      $files = array_splice($files, 2);

      foreach ($files as $file) {
        $alter_files_status = alter_files($theme_path, [$file_path . DIRECTORY_SEPARATOR . $file], $alterations, TRUE);

        if ($alter_files_status !== TRUE) {
          return FALSE;
        }
      }
    }
    elseif ($file_type === 'file') {
      $string_replace_status = file_str_replace($file_path, array_keys($alterations), $alterations);

      if ($string_replace_status !== TRUE) {
        return FALSE;
      };
    }
  }

  return TRUE;
}

// Utilities

function file_str_replace($file_path, array $find, array $replace) {
  $file_path = normalize_path($file_path);

  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);

  file_put_contents($file_path, $file_contents);

  return TRUE;
}

/**
 * Checks whether current OS is windows.
 *
 * @return boolean
 */
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
