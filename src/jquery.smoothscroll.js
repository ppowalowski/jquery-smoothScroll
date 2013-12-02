/*################
	Smooth Scroller
#############*/
	$(function() {	
	
		function filterPath(string) {
			return string
			.replace(/^\//,'')
			.replace(/(index|default).[a-zA-Z]{3,4}$/,'')
			.replace(/\/$/,'');
		}
	
		var locationPath = filterPath(location.pathname);
		var scrollElem = scrollableElement('html', 'body');
		var $scrollElem = $(scrollElem);
		var lastClicked;
	
		// Any links with hash tags in them (can't do ^= because of fully qualified URL potential)
		$(window).on('scroll',function(e){
			
		});
		$('a[href*=#]').each(function() {
	
			// Ensure it's a same-page link
			var thisPath = filterPath(this.pathname) || locationPath;
			if (  locationPath == thisPath
				&& (location.hostname == this.hostname || !this.hostname)
				&& this.hash.replace(/#/,'') ) {
					// Ensure target exists
					var $target = $(this.hash), target = this.hash;
					if ($target.length) {
						$(this).click(function(event) {
							// Prevent jump-down
							event.preventDefault();
							
							// Find location of target
							var targetOffset = $target.offset().top;
	
							// Animate to target
							
							if(lastClicked == this)
								return
							
							$scrollElem.stop();
							lastClicked = this;
							$scrollElem.animate({scrollTop: targetOffset}, 400, function() {
	
								// Set hash in URL after animation successful
								location.hash = target;
								lastClicked = false;
	
							});
						});
					}
			}
	
		});
	
		// Use the first element that is "scrollable"  (cross-browser fix?)
		function scrollableElement(els) {
			for (var i = 0, argLength = arguments.length; i <argLength; i++) {
				var el = arguments[i],
				$scrollElement = $(el);
				if ($scrollElement.scrollTop()> 0) {
					return el;
				} else {
					$scrollElement.scrollTop(1);
					var isScrollable = $scrollElement.scrollTop()> 0;
					$scrollElement.scrollTop(0);
					if (isScrollable) {
						return el;
					}
				}
			}
			return [];
		}
	
	});