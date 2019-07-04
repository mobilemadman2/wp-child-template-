<?php

/**
 *
 */
function sc_movies() {
    $loop = new WP_Query(array(
        'post_type' => 'movie'
    ));

    if ($loop->have_posts()) {
        while ($loop->have_posts()) { $loop->the_post();

            // HTML content below

            ?>

            <h3>A collection of posts will be displayed here.</h3>

            <?php
        }
    } else {
        // no posts
    }

    wp_reset_postdata();
}
add_shortcode('movies', 'sc_movies');