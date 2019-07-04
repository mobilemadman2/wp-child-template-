<?php

/**
 *
 */
function update_jquery_version() {
    wp_deregister_script('jquery');

    wp_register_script('jquery', get_stylesheet_directory_uri() . '/dist/vendor/jquery/dist/jquery.min.js', array(), '3.4.1', false);
    wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'update_jquery_version');

/**
 *
 */
function enqueue_theme_scripts() {
    wp_enqueue_style('animate.css', get_stylesheet_directory_uri() . '/dist/vendor/animate.css/animate.min.css', array(), '3.7.2');
    wp_enqueue_style('css-ripple-effect', get_stylesheet_directory_uri() . '/dist/vendor/css-ripple-effect/dist/ripple.min.css', array(), '1.0.5');
    wp_enqueue_style('owl.theme', get_stylesheet_directory_uri() . '/dist/vendor/owl.carousel/dist/assets/owl.carousel.min.css', array(), '2.3.4');
    wp_enqueue_style('owl.theme.default', get_stylesheet_directory_uri() . '/dist/vendor/owl.carousel/dist/assets/owl.theme.default.min.css', array(), '2.3.4');

    wp_enqueue_script('jquery-parallax.js', get_stylesheet_directory_uri() . '/dist/vendor/jquery-parallax.js/parallax.min.js', array('jquery'), '1.5.0', true);
    wp_enqueue_script('owl.carousel', get_stylesheet_directory_uri() . '/dist/vendor/owl.carousel/dist/owl.carousel.min.js', array('jquery'), '2.3.4', true);

    wp_enqueue_script('bundle', get_stylesheet_directory_uri() . '/dist/scripts/bundle.min.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_theme_scripts');

/**
 *
 */
function override_mce_options($settings) {
    $opts = '*[*]';

    $settings['valid_elements'] = $opts;
    $settings['extended_valid_elements'] = $opts;
    $settings['visualblocks_default_state'] = true;

    return $settings;
}
add_filter('tiny_mce_before_init', 'override_mce_options');

/**
 *
 */
function unregister_menus() {
    unregister_nav_menu('primary');
}
add_action('init', 'unregister_menus');

/**
 *
 */
function register_menus() {
    register_nav_menus(array(
        'header_menu' => __('Header Menu', 'header_menu'),
        'social_menu' => __('Social Menu', 'social_menu')
    ));
}
add_action('init', 'register_menus');

// custom logo support
add_theme_support('custom-logo');

// include
include 'include/movies/movie.php';