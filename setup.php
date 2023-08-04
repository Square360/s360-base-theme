<?php

/**
 * @file
 * setup.php
 */

/**
 * Initial setup before we can create a theme.
 */
function init() {
  $theme_name = get_cli_option('theme-name');

  if (!$theme_name) {
    print 'No theme name provided' . PHP_EOL;
    return FALSE;
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

  create_theme($theme_name, $machine_name, $kebab_name);
}

/**
 * Creates a new theme.
 *
 * @param string $theme_name
 *   The human readable name of the theme.
 * @param string $machine_name
 *   The machine_name for Drupal.
 * @param string $kebab_name
 *   The package.json name.
 */
function create_theme(string $theme_name, string $machine_name, string $kebab_name) {
  $theme_dir = substr(getcwd(), 0, strpos(getcwd(), 'themes') + 6);
  $theme_path = $theme_dir . DIRECTORY_SEPARATOR . 'custom' . DIRECTORY_SEPARATOR . $machine_name;

  if (!is_dir(normalize_path($theme_path))) {
    if (@mkdir(normalize_path($theme_path), 0755, TRUE) !== TRUE) {
      print 'Custom theme could not be created' . PHP_EOL;
      return FALSE;
    }
  }

  if (copy_files(get_files_to_copy(), $theme_path) !== TRUE) {
    print 'Failed to copy files' . PHP_EOL;
    return FALSE;
  }

  $alterations = set_alterations($theme_name, $machine_name, $kebab_name);
  if (alter_files($theme_path, get_files_to_alter(), $alterations) !== TRUE) {
    print 'Failed to alter files' . PHP_EOL;
    return FALSE;
  }

  if (rename_files(get_files_to_rename(), $theme_path, $machine_name) !== TRUE) {
    print 'Failed to rename files' . PHP_EOL;
    return FALSE;
  }
}

/**
 * **************************************************
 * COPY FUNCTIONS.
 */

/**
 * The files that need to be copied into the new theme.
 *
 * @return array
 *   An array of files to copy.
 */
function get_files_to_copy() {
  return [
    'assets/.storybook',
    'assets/config',
    'assets/dist',
    'assets/src',
    'assets/.babelrc',
    'assets/.nvmrc',
    'assets/package.json',
    'assets/plopfile.mjs',
    'assets/tsconfig.json',
    'assets/webpack.config.ts',
    'assets/yarn.lock',
    'templates',
    'theme-hooks',
    '.editorconfig',
    's360_base_theme.breakpoints.yml',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.theme',
  ];
}

/**
 * Copy every file inside a directory.
 *
 * @param string $src
 *   The directory inside the base theme.
 * @param string $dest
 *   The directory inside the new theme.
 */
function _recursive_copy(string $src, string $dest) {
  if (is_dir($src)) {
    // Make the destination directory if not exist.
    @mkdir($dest, 0755, TRUE);

    $dir_handle = opendir($src);

    while ($file = readdir($dir_handle)) {
      if ($file != '.' && $file != '..') {
        _recursive_copy($src . DIRECTORY_SEPARATOR . $file, $dest . DIRECTORY_SEPARATOR . $file);
      }
    }

    closedir($dir_handle);
  }
  else {
    copy($src, $dest);
  }
}

/**
 * Copy the files.
 *
 * @param array $files
 *   An array of files to copy, including folders.
 * @param string $theme_path
 *   The path for the new theme.
 */
function copy_files(array $files, string $theme_path) {
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

    _recursive_copy($src, $dest);
  }

  return TRUE;
}

/**
 * **************************************************
 * ALTER FUNCTIONS.
 */

/**
 * The files that need to be altered with the new theme name.
 *
 * @return array
 *   An array of files to alter.
 */
function get_files_to_alter() {
  return [
    'assets/.storybook',
    'assets/package.json',
    'templates',
    'theme-hooks',
    's360_base_theme.breakpoints.yml',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.theme',
  ];
}

/**
 * Alter the files.
 *
 * @param string $theme_path
 *   The path for the new theme.
 * @param array $files
 *   An array of files to alter, including folders.
 * @param array $alterations
 *   The associative array of alterations.
 * @param bool $absolute
 *   If the file path is absolute or relative.
 */
function alter_files(string $theme_path, array $files, array $alterations, bool $absolute = FALSE) {
  foreach ($files as $file) {
    if ($absolute === TRUE) {
      $file_type = filetype(realpath($file));
      $file_path = $file;
    }
    else {
      $file_type = filetype($theme_path . DIRECTORY_SEPARATOR . $file);
      $file_path = $theme_path . DIRECTORY_SEPARATOR . $file;
    }

    if ($file_type === 'dir') {
      $files = scandir($file_path);
      $files = array_splice($files, 2);

      foreach ($files as $file) {
        $alter_files = alter_files($theme_path, [$file_path . DIRECTORY_SEPARATOR . $file], $alterations, TRUE);
        if ($alter_files !== TRUE) {
          return FALSE;
        }
      }
    }
    elseif ($file_type === 'file') {
      if (alter_file_str_replace($file_path, array_keys($alterations), $alterations) !== TRUE) {
        return FALSE;
      };
    }
  }

  return TRUE;
}

/**
 * Use the alterations array to alter a file.
 *
 * @param string $file_path
 *   The path of the file to alter.
 * @param array $find
 *   The keys of the associative array of alterations.
 * @param array $replace
 *   The associative array of alterations.
 */
function alter_file_str_replace(string $file_path, array $find, array $replace) {
  $file_path = normalize_path($file_path);

  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);

  file_put_contents($file_path, $file_contents);

  return TRUE;
}

/**
 * Creates a new theme.
 *
 * @param string $theme_name
 *   The human readable name of the theme.
 * @param string $machine_name
 *   The machine_name for Drupal.
 * @param string $kebab_name
 *   The package.json name.
 *
 * @return array
 *   An associative array of the original theme with it's new counterparts.
 */
function set_alterations(string $theme_name, string $machine_name, string $kebab_name) {
  return [
    'S360 Base Theme' => $theme_name,
    's360_base_theme' => $machine_name,
    's360-base-theme' => $kebab_name,
  ];
}

/**
 * **************************************************
 * RENAME FUNCTIONS.
 */

/**
 * The files that need to be renamed with the new theme name.
 *
 * @return array
 *   An array of files to rename.
 */
function get_files_to_rename() {
  return [
    's360_base_theme.breakpoints.yml',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.theme',
  ];
}

/**
 * Renames files.
 *
 * @param array $files_to_rename
 *   The files to rename.
 * @param string $theme_path
 *   The path for the new theme.
 * @param string $machine_name
 *   The machine_name for Drupal.
 */
function rename_files(array $files_to_rename, string $theme_path, string $machine_name) {
  foreach ($files_to_rename as $file_to_rename) {
    $file_original_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_rename;
    $file_new_path = $theme_path . DIRECTORY_SEPARATOR . str_replace('s360_base_theme', $machine_name, $file_to_rename);

    rename($file_original_path, normalize_path($file_new_path));
  }

  return TRUE;
}

/**
 * **************************************************
 * UTILITY FUNCTIONS.
 */

/**
 * An unnormalized path.
 *
 * @param string $path
 *   The path to normalize.
 *
 * @return string
 *   The normalized path.
 */
function normalize_path(string $path) {
  if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $path = str_replace('/', '\\', strtolower($path));
  }
  else {
    $path = str_replace('\\', '/', $path);
  }

  return trim($path);
}

/**
 * Returns all the passed in CLI options.
 *
 * @return array|bool
 *   An associative array of the all the CLI options.
 */
function get_cli_options() {
  global $argv;

  $options = [];

  foreach ($argv as $key => $arg) {
    if (strpos($arg, '=') !== FALSE) {
      print 'Do not use equal signs in your options.' . PHP_EOL;
      return FALSE;
    }

    switch ($arg) {
      case '--theme-name':
        $options['theme-name'] = $argv[$key + 1];
        break;
    }
  }

  return $options;
}

/**
 * The value of the CLI option.
 *
 * @param string $option
 *   The CLI option.
 *
 * @return string|bool
 *   The value of the CLI option, false if the CLI option wasn't passed.
 */
function get_cli_option(string $option) {
  $cli_options = get_cli_options();

  return (!empty($cli_options[$option])) ? $cli_options[$option] : FALSE;
}

// Kickoff!
init();
