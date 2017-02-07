<?php
/*
Plugin Name: Bootstrap TinyMCE
Description: Allows to add extra content (Bootstrap classes) to any WordPress widgets 
Version: 1.0
*/

class Bootstrap_Tinymce {
  
  
  function Bootstrap_Tinymce() {
    $this->init();  
  }
  
  /**
   * Adds init actions
   */
  function init() {
    // Filters for tinymce
    add_action( 'init', array($this, 'mce_buttons' ));
    // New tinymce button CSS
    add_action( 'admin_enqueue_scripts', array($this, 'admin_css') );
    // Visual tab CSS
    add_filter( 'mce_css', array($this, 'mce_css') );

  }
  
  /**
   * Filters for tinymce buttons
   */
  function mce_buttons() {
      add_filter( "mce_external_plugins", array($this, "mce_add_buttons") );
      add_filter( 'mce_buttons', array($this, 'mce_register_buttons') );
  }
  
  /**
   * Adds js to new tinymce button
   * 
   * @param array $plugin_array
   * @return array
   */
  function mce_add_buttons( $plugin_array ) {
      $plugin_array['lsp_bootstrap'] = plugins_url( '/js/tinymce_plugin.js', __FILE__ ) ;
      return $plugin_array;
  }
  
  /**
   * New 'bootstrap' button
   * 
   * @param array $buttons Tinymce buttons
   * @return array
   */
  function mce_register_buttons( $buttons ) {
      array_push( $buttons, 'bootstrap' ); 
      return $buttons;
  }
  
  /**
   * New button CSS
   * 
   * @param string $wp list of stiles
   * @return string
   */
  function mce_css($wp) {
    // Bootstrap for showing into Visual Tab and new button CSS
  	$wp .= ',https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css,' . get_bloginfo('stylesheet_directory') . '/css/tinymce.css';
  	return $wp;
  }
  
  /**
   * Admin CSS
   */
  function admin_css() {
    wp_enqueue_style( 'lsp_admin', plugins_url( './css/admin.css', __FILE__ ) );
  }
  
}

$bootmce = new Bootstrap_Tinymce();