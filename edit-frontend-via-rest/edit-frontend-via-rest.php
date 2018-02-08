<?php
/*
* Plugin Name: Edit Front-End Via Rest-API
* Description: To add JS Front-End via REST API.
* Author: Pontus Ljungstrand
*/

function editFrontEndViaRest() {
// echo 'Lel';

if(!is_admin() && is_single()){
wp_enqueue_script('edit-frontend-via-rest',
plugin_dir_url(__FILE__).'js/edit-frontend-via-rest.js',
array('jquery'), 0.1, true);

wp_localize_script('edit-frontend-via-rest', 'WPsettings', array(
  'root' => esc_url_raw(rest_url()),
  'nonce' => wp_create_nonce('wp_rest'),
  'current_ID' => get_the_ID()
));
}
}
add_action('wp_enqueue_scripts', 'editFrontEndViaRest')

?>
