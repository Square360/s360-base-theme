<?php

/**
 * @file
 * setup.php
 */

/**
 * Initial setup before we can create a theme.
 *
 * @return bool|void
 *   FALSE on failure, void on success.
 */
function init() {
  $theme_name = get_cli_option('theme-name');
  $parent_theme = get_cli_option('parent-theme');
  $skip_sb = get_cli_option('skip-sb');

  if (!$theme_name) {
    print 'No theme name provided' . PHP_EOL;
    return FALSE;
  }

  if ($parent_theme && !is_valid_machine_name($parent_theme)) {
    print 'Parent theme must be a valid Drupal machine name (lowercase letters, numbers, underscores, starting with a letter)' . PHP_EOL;
    return FALSE;
  }

  $machine_name = str_replace(' ', '_', strtolower($theme_name));
  $machine_name = sanitize_machine_name($machine_name);
  $kebab_name = str_replace('_', '-', $machine_name);
  $const_name = strtoupper($machine_name);

  create_theme($theme_name, $machine_name, $kebab_name, $const_name, $parent_theme, $skip_sb);
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
 * @param string $const_name
 *   The const name for Drupal.
 * @param string|bool $parent_theme
 *   The parent theme machine name or FALSE.
 * @param bool $skip_sb
 *   Should Storybook files be skipped.
 *
 * @return bool|void
 *   FALSE on failure, void on success.
 */
function create_theme(string $theme_name, string $machine_name, string $kebab_name, string $const_name, $parent_theme = FALSE, $skip_sb = FALSE) {
  $theme_dir = substr(getcwd(), 0, strpos(getcwd(), 'themes') + 6);
  $theme_path = $theme_dir . DIRECTORY_SEPARATOR . 'custom' . DIRECTORY_SEPARATOR . $machine_name;

  if (!is_dir(normalize_path($theme_path))) {
    if (@mkdir(normalize_path($theme_path), 0755, TRUE) !== TRUE) {
      print 'Custom theme could not be created' . PHP_EOL;
      return FALSE;
    }
  }

  if (copy_files(get_files_to_copy($skip_sb), $theme_path) !== TRUE) {
    print 'Failed to copy files' . PHP_EOL;
    return FALSE;
  }

  $alterations = set_alterations($theme_name, $machine_name, $kebab_name, $const_name, $parent_theme);
  if (alter_files($theme_path, get_files_to_alter($skip_sb), $alterations) !== TRUE) {
    print 'Failed to alter files' . PHP_EOL;
    return FALSE;
  }

  if (rename_files(get_files_to_rename(), $theme_path, $machine_name) !== TRUE) {
    print 'Failed to rename files' . PHP_EOL;
    return FALSE;
  }

  print "$theme_name theme created! Happy theming!" . PHP_EOL;
}

/* **************************************************
 * COPY FUNCTIONS
 */

/**
 * The files that need to be copied into the new theme.
 *
 * @param bool $skip_sb
 *   Whether to skip Storybook files.
 *
 * @return array
 *   An array of files to copy.
 */
function get_files_to_copy($skip_sb = FALSE) {
  $files = [
    'config',
    'libraries',
    'theme-hooks',
    'ui/.storybook',
    'ui/dist',
    'ui/plop-templates',
    'ui/src',
    'ui/.babelrc',
    'ui/.nvmrc',
    'ui/.yarnrc.yml',
    'ui/package.json',
    'ui/plopfile.mjs',
    'ui/README.md',
    'ui/webpack.config.js',
    'ui-core',
    '.editorconfig',
    'package.json',
    's360_base_theme.breakpoints.yml',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.style_options.yml',
    's360_base_theme.theme',
  ];

  if ($skip_sb) {
    $files = array_filter($files, function ($file) {
      return strpos($file, '.storybook') === FALSE;
    });
  }

  return $files;
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
 *
 * @return bool
 *   TRUE on success.
 */
function copy_files(array $files, string $theme_path) {
  foreach ($files as $file) {
    $src = getcwd() . DIRECTORY_SEPARATOR . $file;

    $file = explode(DIRECTORY_SEPARATOR, $file);

    if (in_array('ui', $file)) {
      $file = 'ui' . DIRECTORY_SEPARATOR . end($file);
    }
    else {
      $file = end($file);
    }

    $dest = $theme_path . DIRECTORY_SEPARATOR . $file;

    _recursive_copy($src, $dest);
  }

  return TRUE;
}

/* **************************************************
 * ALTER FUNCTIONS
 */

/**
 * The files that need to be altered with the new theme name.
 *
 * @param bool $skip_sb
 *   Whether to skip Storybook files.
 *
 * @return array
 *   An array of files to alter.
 */
function get_files_to_alter($skip_sb = FALSE) {
  $files = [
    'config',
    'libraries',
    'theme-hooks',
    'ui/.storybook',
    'ui/package.json',
    'ui/plop-templates',
    'ui/src',
    'ui-core/package.json',
    's360_base_theme.breakpoints.yml',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.theme',
  ];

  if ($skip_sb) {
    $files = array_filter($files, function ($file) {
      return strpos($file, '.storybook') === FALSE;
    });
  }

  return $files;
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
 *
 * @return bool
 *   TRUE on success, FALSE on failure.
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
 *
 * @return bool
 *   TRUE on success.
 */
function alter_file_str_replace(string $file_path, array $find, array $replace) {
  $file_path = normalize_path($file_path);

  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);

  file_put_contents($file_path, $file_contents);

  return TRUE;
}

/**
 * Sets up the alterations array for string replacements.
 *
 * @param string $theme_name
 *   The human readable name of the theme.
 * @param string $machine_name
 *   The machine_name for Drupal.
 * @param string $kebab_name
 *   The package.json name.
 * @param string $const_name
 *   The PHP const name of the theme.
 * @param string|bool $parent_theme
 *   The parent theme machine name or FALSE.
 *
 * @return array
 *   An associative array of the original theme with it's new counterparts.
 */
function set_alterations(string $theme_name, string $machine_name, string $kebab_name, string $const_name, $parent_theme = FALSE) {
  $base_theme_value = $parent_theme ?: 'false';

  return [
    'S360 Base Theme' => $theme_name,
    's360_base_theme' => $machine_name,
    's360-base-theme' => $kebab_name,
    'S360_BASE_THEME' => $const_name,
    'drupal_base_theme' => $base_theme_value,
  ];
}

/* **************************************************
 * RENAME FUNCTIONS
 */

/**
 * The files that need to be renamed with the new theme name.
 *
 * @return array
 *   An array of files to rename.
 */
function get_files_to_rename() {
  return [
    'libraries/s360_base_theme.block.libraries.yml',
    'libraries/s360_base_theme.component.libraries.yml',
    'libraries/s360_base_theme.field.libraries.yml',
    'libraries/s360_base_theme.form.libraries.yml',
    'libraries/s360_base_theme.media.libraries.yml',
    'libraries/s360_base_theme.navigation.libraries.yml',
    'libraries/s360_base_theme.node.libraries.yml',
    'libraries/s360_base_theme.paragraph.libraries.yml',
    'libraries/s360_base_theme.views.libraries.yml',
    'config/install/block.block.s360_base_theme_content.yml',
    'config/install/block.block.s360_base_theme_messages.yml',
    'config/install/block.block.s360_base_theme_tabs.yml',
    's360_base_theme.breakpoints.yml',
    's360_base_theme.info.yml',
    's360_base_theme.libraries.yml',
    's360_base_theme.style_options.yml',
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
 *
 * @return bool
 *   TRUE on success.
 */
function rename_files(array $files_to_rename, string $theme_path, string $machine_name) {
  foreach ($files_to_rename as $file_to_rename) {
    $file_original_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_rename;
    $file_new_path = $theme_path . DIRECTORY_SEPARATOR . str_replace('s360_base_theme', $machine_name, $file_to_rename);

    rename($file_original_path, normalize_path($file_new_path));
  }

  return TRUE;
}

/* **************************************************
 * UTILITY FUNCTIONS
 */

/**
 * Validates if a string is a valid Drupal machine name.
 *
 * @param string $name
 *   The name to validate.
 *
 * @return bool
 *   TRUE if valid, FALSE otherwise.
 */
function is_valid_machine_name(string $name) {
  // Machine names can only contain lowercase letters, numbers and underscores.
  // Machine names must always begin with a letter.
  return preg_match('/^[a-z][a-z0-9_]*$/', $name) === 1;
}

/**
 * Sanitizes a string to be a valid Drupal machine name.
 *
 * @param string $name
 *   The name to sanitize.
 *
 * @return string
 *   The sanitized machine name.
 */
function sanitize_machine_name(string $name) {
  $search = [
    // Machine names can only contain letters, numbers and underscores.
    '/[^a-z0-9_]/',
    // Machine names must always begin with a letter.
    '/^[^a-z]+/',
  ];

  return preg_replace($search, '', $name);
}

/**
 * Normalizes a path for the current operating system.
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
 *   An associative array of all the CLI options, or FALSE on error.
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

      case '--parent-theme':
        $options['parent-theme'] = $argv[$key + 1];
        break;

      case '--skip-sb':
        $options['skip-sb'] = TRUE;
        break;
    }
  }

  return $options;
}

/**
 * Gets the value of a specific CLI option.
 *
 * @param string $option
 *   The CLI option name.
 *
 * @return string|bool
 *   The value of the CLI option, or FALSE if the option wasn't passed.
 */
function get_cli_option(string $option) {
  $cli_options = get_cli_options();

  return (!empty($cli_options[$option])) ? $cli_options[$option] : FALSE;
}

// Kickoff!
init();
