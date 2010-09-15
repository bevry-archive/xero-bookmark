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
			var	$toolbar = $('.x-toolbar-left:has(.xtb-text)'),
				$selectAll = $('<button>Select All</button>').appendTo($toolbar),
				$categoriseAll = $('<button>Categorise Selected</button>').appendTo($toolbar),
				$transactions = $('tr.x-transgrid-row.transactional'),
				$checkbox = $('<input type="checkbox" class="multi"/>');
			
			// Bind Event to $selectAll
			$selectAll.click(function(){
				$transactions.find(':checkbox.multi').attr('checked', true);
			});
			
			// Bind Event to $categoriseAll
			$categoriseAll.click(function(){
				// Fetch Category
				var category = prompt('Type category would you like to assign to the selected:');
				if ( !category ) {
					return;
				}
				
				// Filter
				var $checkedTransasctions = $transactions.filter(':has(:checkbox.multi:checked)'),
					$categories = $checkedTransasctions.find('td.expand div.fields.edit-name label.category :text');
				
				// Open Edit Box
				$checkedTransasctions.addClass('opened');
				
				// Prepare
				var prepareFunction = function(){
					// Prepare Category
					$categories.trigger('focus');
					
					// Apply
					var applyFunction = function(){
						// Apply Category
						$categories.val(category);
						
						// Make Buttons Blue
						$checkedTransasctions.find('.small.blue.button:has(> a.ok_button)').removeClass('disabled gray');
						
						// Save Change
						$checkedTransasctions.find('td.expand a.ok_button').trigger('click');
					};
					setTimeout(applyFunction,750);
				};
				setTimeout(prepareFunction,200);
			});

			// Add Checkboxes
			$transactions.find('td:first-child').click(function(){
				var $td = $(this),
					$parent = $td.parent();
				var killOpen = function(){
					$parent.removeClass('opened');
				};
				for ( var i = 0, n = 1000; i<=n; i+=50 ) {
					setTimeout(killOpen, i);
				}
			}).prepend($checkbox);
		
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