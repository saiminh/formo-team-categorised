<?php
/**
 * Plugin Name:       Formo Team Categorised
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       formo-team-categorised
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
// function create_block_formo_team_categorised_block_init() {
// 	register_block_type( __DIR__ . '/build' );
// }
// add_action( 'init', 'create_block_formo_team_categorised_block_init' );

function render_query_teammembers( $block_attributes, $content) {
  global $result;
  //get all values of the custom taxonomy 'department' of the post type 'formo2022_teammember'
  $terms = get_terms( array(
    'taxonomy' => 'department',
    'hide_empty' => false,
  ) );
  // create HTML string for each term 
  $termsAsString = '';
  $i = 0;
  foreach ($terms as $term) {
    //first term is active, the rest are not
    if ($i == 0) {
      $termsAsString = $termsAsString.'<a data-filter="'.$term->slug.'" data-filter-active="true">'.$term->name.'</a>';
    } else {
      $termsAsString = $termsAsString.'<a data-filter="'.$term->slug.'" data-filter-active="false">'.$term->name.'</a>';
    }
    $i++;
  }

  $result = '<div class="formo2022-team-members">';
  $result = $result.'<div class="formo2022-team-departments">'.$termsAsString.'</div>';
  $result = $result.'<div class="formo2022-team-query">';
  $args = array(  
    'post_type' => 'formo2022_teammember',
    'post_status' => 'publish',
    'posts_per_page' => -1, 
    'order' => 'ASC',
  );

  global $more;
  $loop = new WP_Query( $args ); 
      
  if ( !$loop->have_posts() ) {

      $result = $result.'<p class="no-events">There are no upcoming events at the moment.</p>';

  } else {

    while ( $loop->have_posts() ) { 
      $loop->the_post();
      //get the department value of the current post and convert them to a string
      $department = get_the_terms( get_the_ID(), 'department' );
      $departmentString = '';
      if ($department !== false) {
        foreach ($department as $dep) {
          $departmentString = $departmentString.' '.$dep->slug;
        }
      } else {
        $departmentString = 'bio-rd';
      }
      
      
      $fullname = get_post_meta( get_the_ID(), '_teammember_fullname_meta_key', true );
      if (empty($fullname)) {
        $fullname = get_the_title();
      }
      $content = get_the_content();
      //remove all the <!-- --> comments from the content
      $content = preg_replace('/<!--(.|\s)*?-->/', '', $content);
      // from $content, get the text from '<figure' up until '</figure>'
      $contentImage = substr($content, strpos($content, '<figure'), strpos($content, '</figure>') - strpos($content, '<figure') + 9);
      // if $contentImage contains a sizes="*anything*" attribute, replace it it to 'sizes="(max-width: 782px) 40vw, 22vw"'
      if (strpos($contentImage, 'sizes=') !== false) {
        $contentImage = preg_replace('/sizes=".*?"/', 'sizes="(max-width: 782px) 40vw, 22vw"', $contentImage);
      } else {
        $contentImage = preg_replace('/<img/', '<img sizes="(max-width: 782px) 40vw, 22vw"', $contentImage);
      }


      // from $content, get all <p>
      $contentDescription = substr($content, strpos($content, '<p'), strpos($content, '</p>') - strpos($content, '<p') + 4);
      
      
        $result = $result.
          '<div class="formo2022-teammember" data-department='.$departmentString.'>'.
            // htmlspecialchars($contentImage, ENT_QUOTES).
            $contentImage.
              '<div class="formo2022-teammember-content">'.
                '<h2 class="formo2022-teammember-fullname">'.$fullname.'</h2>'.
                '<div class="formo2022-teammember-description">'.$contentDescription.'</div>'.
              '</div>'.
          '</div>';
        $more = 1;
    }
    wp_reset_postdata(); 
  }
      
  $result = $result.'</div>';
  $result = $result.'</div>';
  return $result;
}

function create_block_teammember_categorised_query_block_init() {
  register_block_type( __DIR__ . '/build', array(
    'attributes'        => array(
      'api_version'       => 2,
      'layout'   => array( 'type' => 'string' ),
    ),
    'render_callback' => 'render_query_teammembers',
  ) );
}
add_action( 'init', 'create_block_teammember_categorised_query_block_init' );

