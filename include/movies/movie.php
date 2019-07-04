<?php

/**
 *
 */
function register_cpt_movie() {
    register_post_type('movie',
        array(
            'labels' => array(
                'name' => __('Movies'),
                'singular_name' => __('Movie')
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'movies'),
            'supports' => array('title', 'editor', 'thumbnail')
        )
    );
}
add_action('init', 'register_cpt_movie');

/**
 *
 */
function change_default_title_movie($title) {
    $screen = get_current_screen();

    if ($screen->post_type == 'movie') {
        $title = 'Movie Title';
    }

    return $title;
}
add_filter('enter_title_here', 'change_default_title_movie');

// include view
include 'view-movies.php';