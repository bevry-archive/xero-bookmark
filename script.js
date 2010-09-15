/**
 * Xero Bookmark Script
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
(function(){
	// Handle
	var jqueryReady = function($){
		
		// Upgrade Xero
		$(function(){
			// Prepare
			var	$toolbar = $('#x-toolbar-left'),
				$categoriseAll = $('<button>Categorise All</button>').appendTo($toolbar),
				$transactions = $('.x-transgrid-row.transactional'),
				$checkboxes = $;

			// Bind Event to $categoriseAll
			$categoriseAll.click(function(){
				// Fetch Category
				var category = prompt('Type category would you like to assign to the selected:');
				if ( !category ) {
					return;
				}
	
				// Open Edit Box
				$transactions.find('td.edit a.dontfollow').trigger('click');
	
				// Wait a second
				setTimeout(function(){
					// Apply Category
					$transactions.find('td.expand div.fields.edit-name label.category :text').val(category);
		
					// Save Change
					$transactions.find('td.expand a.ok_button').trigger('click');
				},1000);
			});

			// Add Checkboxes
			$transactions.find('td:first-child').append('<input type="checkbox" class="multi"/>');
			$checkboxes = $transactions.find(':checkbox.multi');

			// Done
		});
	};

	// Prepare
	var jqueryInserted = null;
		ensureFunction = function(){
			// Ensure jQuery
			if ( typeof jQuery === 'undefined' ) {
				// Insert?
				if ( jqueryInserted === null ) {
					// Log
					window.status = 'Loading jQuery... Please wait..';
					// Insert
					var e = document.createElement('script');
					e.setAttribute('language','javascript');
					e.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
					document.body.appendChild(e);
					delete e;
				}
				// Recall
				setTimeout(ensureFunction, 500);
			}
			else {
				// jQuery is Loaded
				
				// Enter NoConflict Mode
				jQuery.noConflict();
				
				// Fire Ready
				jqueryReady(jQuery);
			}
		};
		
	// Ensure
	ensureFunction();
})();