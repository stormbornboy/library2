/* Start BX slider*/
jQuery(document).ready(function($){	   
/* BX slider 1*/


   if ($('.main_slider').length){
		$('.main_slider').bxSlider({ minSlides: 1, maxSlides: 8, slideMargin: 18,  speed: 1500, auto: true, adaptiveHeightSpeed: 800 });
    }
	   if ($('.book_detail_slider').length){
		$('.book_detail_slider').bxSlider({ minSlides: 1, maxSlides: 8, slideMargin: 18,  speed: 1500  });
    }
 	   if ($('#mobile_slider').length){
		$('#mobile_slider').bxSlider({ minSlides: 1, maxSlides: 8, slideMargin: 18,  mode: 'horizontal',  useCSS: false, easing: 'easeOutElastic',  speed: 2000 });
    }
	   if ($('#author_slider').length){
		$('#author_slider').bxSlider({ auto:true, minSlides: 1, maxSlides: 8, slideMargin: 30,  speed: 500  });
	}
		if ($('#testimonials').length){
		$('#testimonials').bxSlider({ minSlides: 1, maxSlides: 8, slideMargin: 25,  speed: 500  });
	}
	if ($('#books-slider').length){
		$('#books-slider').bxSlider({ minSlides: 1, maxSlides: 8, slideMargin: 0,  speed: 500  });
	}
	if ($('#books-slider2').length){
		$('#books-slider2').bxSlider({ minSlides: 1, maxSlides: 8, slideMargin: 0,  speed: 500  });
	}
/* BX slider 1*/
});
/* End BX slider*/


/* Start Flip Slider Slider*/
(function() {

	var event = jQuery.event,

		//helper that finds handlers by type and calls back a function, this is basically handle
		// events - the events object
		// types - an array of event types to look for
		// callback(type, handlerFunc, selector) - a callback
		// selector - an optional selector to filter with, if there, matches by selector
		//     if null, matches anything, otherwise, matches with no selector
		findHelper = function( events, types, callback, selector ) {
			var t, type, typeHandlers, all, h, handle, 
				namespaces, namespace,
				match;
			for ( t = 0; t < types.length; t++ ) {
				type = types[t];
				all = type.indexOf(".") < 0;
				if (!all ) {
					namespaces = type.split(".");
					type = namespaces.shift();
					namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
				}
				typeHandlers = (events[type] || []).slice(0);

				for ( h = 0; h < typeHandlers.length; h++ ) {
					handle = typeHandlers[h];
					
					match = (all || namespace.test(handle.namespace));
					
					if(match){
						if(selector){
							if (handle.selector === selector  ) {
								callback(type, handle.origHandler || handle.handler);
							}
						} else if (selector === null){
							callback(type, handle.origHandler || handle.handler, handle.selector);
						}
						else if (!handle.selector ) {
							callback(type, handle.origHandler || handle.handler);
							
						} 
					}
					
					
				}
			}
		};

	/**
	 * Finds event handlers of a given type on an element.
	 * @param {HTMLElement} el
	 * @param {Array} types an array of event names
	 * @param {String} [selector] optional selector
	 * @return {Array} an array of event handlers
	 */
	event.find = function( el, types, selector ) {
		var events = ( $._data(el) || {} ).events,
			handlers = [],
			t, liver, live;

		if (!events ) {
			return handlers;
		}
		findHelper(events, types, function( type, handler ) {
			handlers.push(handler);
		}, selector);
		return handlers;
	};
	/**
	 * Finds all events.  Group by selector.
	 * @param {HTMLElement} el the element
	 * @param {Array} types event types
	 */
	event.findBySelector = function( el, types ) {
		var events = $._data(el).events,
			selectors = {},
			//adds a handler for a given selector and event
			add = function( selector, event, handler ) {
				var select = selectors[selector] || (selectors[selector] = {}),
					events = select[event] || (select[event] = []);
				events.push(handler);
			};

		if (!events ) {
			return selectors;
		}
		//first check live:
		/*$.each(events.live || [], function( i, live ) {
			if ( $.inArray(live.origType, types) !== -1 ) {
				add(live.selector, live.origType, live.origHandler || live.handler);
			}
		});*/
		//then check straight binds
		findHelper(events, types, function( type, handler, selector ) {
			add(selector || "", type, handler);
		}, null);

		return selectors;
	};
	event.supportTouch = "ontouchend" in document;
	
	$.fn.respondsTo = function( events ) {
		if (!this.length ) {
			return false;
		} else {
			//add default ?
			return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
		}
	};
	$.fn.triggerHandled = function( event, data ) {
		event = (typeof event == "string" ? $.Event(event) : event);
		this.trigger(event, data);
		return event.handled;
	};
	/**
	 * Only attaches one event handler for all types ...
	 * @param {Array} types llist of types that will delegate here
	 * @param {Object} startingEvent the first event to start listening to
	 * @param {Object} onFirst a function to call 
	 */
	event.setupHelper = function( types, startingEvent, onFirst ) {
		if (!onFirst ) {
			onFirst = startingEvent;
			startingEvent = null;
		}
		var add = function( handleObj ) {

			var bySelector, selector = handleObj.selector || "";
			if ( selector ) {
				bySelector = event.find(this, types, selector);
				if (!bySelector.length ) {
					$(this).delegate(selector, startingEvent, onFirst);
				}
			}
			else {
				//var bySelector = event.find(this, types, selector);
				if (!event.find(this, types, selector).length ) {
					event.add(this, startingEvent, onFirst, {
						selector: selector,
						delegate: this
					});
				}
			}
		},
			remove = function( handleObj ) {
				var bySelector, selector = handleObj.selector || "";
				if ( selector ) {
					bySelector = event.find(this, types, selector);
					if (!bySelector.length ) {
						$(this).undelegate(selector, startingEvent, onFirst);
					}
				}
				else {
					if (!event.find(this, types, selector).length ) {
						event.remove(this, startingEvent, onFirst, {
							selector: selector,
							delegate: this
						});
					}
				}
			};
		$.each(types, function() {
			event.special[this] = {
				add: add,
				remove: remove,
				setup: function() {},
				teardown: function() {}
			};
		});
	};
})(jQuery);
(function($){
var isPhantom = /Phantom/.test(navigator.userAgent),
	supportTouch = !isPhantom && "ontouchend" in document,
	scrollEvent = "touchmove scroll",
	// Use touch events or map it to mouse events
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
	data = function(event){
		var d = event.originalEvent.touches ?
			event.originalEvent.touches[ 0 ] :
			event;
		return {
			time: (new Date).getTime(),
			coords: [ d.pageX, d.pageY ],
			origin: $( event.target )
		};
	};

/**
 * @add jQuery.event.swipe
 */
var swipe = $.event.swipe = {
	/**
	 * @attribute delay
	 * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
	 * 
	 * A user must perform the swipe motion in this much time.
	 */
	delay : 500,
	/**
	 * @attribute max
	 * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
	 */
	max : 75,
	/**
	 * @attribute min
	 * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
	 */
	min : 30
};

$.event.setupHelper( [

/**
 * @hide
 * @attribute swipe
 */
"swipe",
/**
 * @hide
 * @attribute swipeleft
 */
'swipeleft',
/**
 * @hide
 * @attribute swiperight
 */
'swiperight',
/**
 * @hide
 * @attribute swipeup
 */
'swipeup',
/**
 * @hide
 * @attribute swipedown
 */
'swipedown'], touchStartEvent, function(ev){
	var
		// update with data when the event was started
		start = data(ev),
		stop,
		delegate = ev.delegateTarget || ev.currentTarget,
		selector = ev.handleObj.selector,
		entered = this;
	
	function moveHandler(event){
		if ( !start ) {
			return;
		}
		// update stop with the data from the current event
		stop = data(event);

		// prevent scrolling
		if ( Math.abs( start.coords[0] - stop.coords[0] ) > 10 ) {
			event.preventDefault();
		}
	};
	// Attach to the touch move events
	$(document.documentElement).bind(touchMoveEvent, moveHandler)
		.one(touchStopEvent, function(event){
			$(this).unbind( touchMoveEvent, moveHandler);
			// if start and stop contain data figure out if we have a swipe event
			if ( start && stop ) {
				// calculate the distance between start and stop data
				var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
					deltaY = Math.abs(start.coords[1] - stop.coords[1]),
					distance = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
				// check if the delay and distance are matched
				if ( stop.time - start.time < swipe.delay && distance >= swipe.min ) {
					var events = ['swipe'];
					// check if we moved horizontally
					if( deltaX >= swipe.min && deltaY < swipe.min) {
						// based on the x coordinate check if we moved left or right
						events.push( start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight" );
					} else
					// check if we moved vertically
					if(deltaY >= swipe.min && deltaX < swipe.min){
						// based on the y coordinate check if we moved up or down
						events.push( start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup" );
					}
					// trigger swipe events on this guy
					$.each($.event.find(delegate, events, selector), function(){
						this.call(entered, ev, {start : start, end: stop})
					})			
				}
			}
			// reset start and stop
			start = stop = undefined;
		})
});
})(jQuery)
if ($('#bb-bookblock').length){
	$(function() {
					var Page = (function() {
						var config = {
							$bookBlock : $( '#bb-bookblock' ),
							$navNext :	$( '#bb-nav-next' ),
							$navPrev : $( '#bb-nav-prev' ),
							$folder : $( '#folder' ),
							$folderOpen : $( '#folder > div.folder-cover > span' ),
							$folderClose : $( '#folder > div.folder-inner > a' ),
							transEndEventNames : {
								'WebkitTransition' : 'webkitTransitionEnd',
								'MozTransition' : 'transitionend',
								'OTransition' : 'oTransitionEnd',
								'msTransition' : 'MSTransitionEnd',
								'transition' : 'transitionend'
							},
							// init bookBlock!
							bb : $( '#bb-bookblock' ).bookblock( {
								speed : 700,
								easing : 'ease-out',
								perspective : 1500,
								shadowSides : 0.8,
								shadowFlip : 0.7
							} ),
							transitionProperty	:	{
								'-webkit-transition' : '-webkit-transform 300ms ease-in-out',
								'-moz-transition' : '-moz-transform 300ms ease-in-out',
								'-o-transition' : '-o-transform 300ms ease-in-out',
								'-ms-transition' : '-ms-transform 300ms ease-in-out'
							}
							},
							init = function() {
								initEvents();
							},
							initEvents = function() {
								config.$navNext.on( 'click', function() {
									checkFolder( function() {
										config.bb.next();	
									} );
									return false;
								} );
								config.$navPrev.on( 'click', function() {
									checkFolder( function() {
										config.bb.prev();
									} );
									return false;
								} );
								// swipe event : http://jquerypp.com/#swipe
								config.$bookBlock.children().on( {
									'swipeleft' : function( event ) {
										checkFolder( function() {
											config.bb.next();
										} );
										return false;
									},
									'swiperight' : function( event ) {
										checkFolder( function() {
											config.bb.prev();
										} );
										return false;
									}
								} );
								// folder
								config.$folderOpen.on( 'click', function() {
									var $folder = $( this ).closest( 'div.folder' ),
											open = $folder.data( 'isOpen' );
									if( config.bb.isActive() ) return false;
									if( !open ) {
										openFolder();
									}
									return false;
								} );
								config.$folderClose.on( 'click', function() {
									var $folder = $( this ).closest( 'div.folder' ),
											open = $folder.data( 'isOpen' );
									if( config.bb.isActive() ) return false;
									if( open ) {
										closeFolder();
									}
									return false;
								} );
							},
							openFolder	= function() {
								var $fold = config.$folder.find( 'div.folder-fold' ).css( config.transitionProperty ),
									$inner = config.$folder.find( 'div.folder-inner' ),
									transEndEventName = config.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
								setTimeout( function() {
									$fold.css( 'transform', 'rotateY(180deg)' ).on( transEndEventName , function() {
										$fold.off( transEndEventName ).css( 'z-index', 1 ).css( 'transition', 'none' ).css( 'transform', 'rotateY(-180deg)' );
										$inner.css( 'transform', 'translateX(310px)' );
									} );
									config.$folder.data( 'isOpen', true );
								}, 0 );
							},
							closeFolder	= function() {
								var $fold = config.$folder.find( 'div.folder-fold' ),
										$inner = config.$folder.find( 'div.folder-inner' ),
										transEndEventName = config.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
								$inner.css( 'transform', 'translateX(0px)' ).on( transEndEventName , function() {
									$inner.off( transEndEventName );
									$fold.css( 'transform', 'rotateY(180deg)' );
									setTimeout( function() {
										$fold.css( config.transitionProperty ).css( {
											transform	: 'rotateY(0deg)',
											zIndex		: 4
										} ).on( transEndEventName , function() {
											$fold.off( transEndEventName );
										} );
									}, 0 );
								} );
								config.$folder.data( 'isOpen', false );
							},
							checkFolder	= function( callback ) {
								var $fold = config.$folder.find( 'div.folder-fold' ),
										transEndEventName = config.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
								if( config.$folder.data( 'isOpen' ) ) {
									$fold.on( transEndEventName , function() {
										$fold.off( transEndEventName );
										callback.call();
									} );
									closeFolder();
								}
								else {
									callback.call();
								}
							};
						return { init : init };
					})();
					Page.init();
				});
	/* End Flip Slider Slider*/
}


$(window).load(function() {

		if ($('.container-draggable').length){		var originX = $('.container-draggable').position().left; }
		
		$('.btn-drag-watch').mousedown(function(e) {
			var elt = $(this),
				topParent = elt.parents('.photo').position().top,
				leftParent = elt.parents('.photo').position().left,
				heightParent = elt.parents('.photo').height(),
				widthParent = elt.parents('.photo').width(),
				topContainer =  elt.parents('.side').position().top + parseFloat(elt.parents('.side').css('padding-top'));

			e.preventDefault();
			elt.addClass('active');

			$(document).bind('mousemove', function(e) {
				var pageX = e.pageX - elt.parents('.photo').parent().offset().left,
					pageY = e.pageY - topContainer;

				if( pageX > leftParent && pageX < leftParent + widthParent ) {
					$('.photo .face').css({
						width : pageX - leftParent + 2
					});
					$('.photo .dos').css({
						width : leftParent + widthParent - pageX + 2
					});

					elt.parent().css({ right : originX - pageX + elt.parent().width()/2});
				}

				if( pageY > topParent && pageY < topParent + heightParent ) {
					elt.css({ bottom : topParent + heightParent - pageY - elt.height() })
				}

				$(this).mouseup(function() {
					$(this).unbind('mousemove');

					elt.removeClass('active').stop().animate({ bottom : 0 }, 600, 'easeInOutQuart');
				});

				e.preventDefault();
				return false;
			});
			return false;
		})

}); 

$(function(){
    var header = $('#header').offset().top;
    $(window).scroll(function(){
        if( $(window).scrollTop() > header ) {
            $('#header').addClass("sticky");
        } else {
            $('#header').removeClass("sticky");
        }
	});
	$(document).ready(function() {
  $(".search").keyup(function () {
    var searchTerm = $(".search").val();
    var listItem = $('.results tbody').children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
    
  $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });
    
  $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
    $(this).attr('visible','false');
  });

  $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
    $(this).attr('visible','true');
  });

  var jobCount = $('.results tbody tr[visible="true"]').length;
    $('.counter').text(jobCount + ' item');

  if(jobCount == '0') {$('.no-result').show();}
    else {$('.no-result').hide();}
		  });
});
});