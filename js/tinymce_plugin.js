(function() {
    // Plugin creation
    tinymce.create('tinymce.plugins.lsp_bootstrap', {
        init : function(ed, url) {
          // Shows column personalization dialog
          // It shows a box for a number value between 1 and 12
          // new box will show when enter a value
          function bootstrapDialog() {
            var html = '<div class="bootstrap-dialog">';
            html += '<p class="howto">Add columns based in <a href="http://getbootstrap.com/css/#grid">Bootstrap grid</a></p>';
            html += '<p>Columns size (1-12) in every field. New box will show automatically</p>';
            html += '<div class="columns_container"><input type="text" class="column_width" /></div>';
            html += '<p><input type="checkbox" id="new_row" name="new_row" /> <label for="new_row">New row</p>';
            html += '</div>';
            var panel = {
                type: 'container',
                html: html
            };
            // Opens the dialog
            win = ed.windowManager.open({
                title: "Bootstrap columns",
                spacing: 10,
                padding: 10,
                items: [panel], // panel created before
                buttons: [ // Buttons
                    {text: "Insertar", subtype: 'primary', onclick: function() {
                        var content = ed.getContent();
                        var html = ' ';
                        // New row if checked
                        if (jQuery('#new_row:checked').length == 1) html += '<div class="row">';
                        // One layer for each box
                        jQuery('.column_width').each(function() {
                          var $this = jQuery(this);
                          if ($this.val()) html += '<div class="col-sm-'+$this.val()+'">Column size '+$this.val()+'</div>';
                        });
                        if (jQuery('#new_row:checked').length == 1) html += '</div>';
                        ed.execCommand('mceInsertContent', false, html);
        	        win.close();
                    }},
                    {text: "Close", onclick: function() {
  	                win.close();
                    }}
                ]
             });
          }
          ed.addButton('bootstrap', {
              title : 'Bootstrap columns',
              onclick: bootstrapDialog
          });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : 'Bootstrap columns',
                author : 'SentidoWeb',
                version : "0.1"
            };
        }
    });
    // Register plugin
    tinymce.PluginManager.add( 'lsp_bootstrap', tinymce.plugins.lsp_bootstrap );
})();

jQuery(document).ready(function() {
  // New box if last one is updated
  jQuery('body').on('keyup', '.column_width', function() {
    var $this = jQuery(this);
    var $inputs = jQuery('.column_width');
    if($this.val()) {
      if ($inputs.index(this) == $inputs.length - 1) {
        $this.after('<input type="text" class="column_width" />');
      }
    }
  });
});