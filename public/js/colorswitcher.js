/* Style Switcher */

window.console = window.console || (function(){
	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
	return c;
})();

jQuery(document).ready(function(){ 
						   
var styleswitcherstr = ' \
	<div class="switcher-inner"> \
	<h2>Color Schemes <a href="#"></a></h2> \
    <div class="content"> \
    <div class="switcher-box"> \
	<ul class="color_schemes"> \
	<h3 class="skin_title"> Color Schemes</h3>\
	<li><a id="default" class="styleswitch color"> Default 	</a></li> \
	<li><a id="parrot" class="styleswitch color"> Parrot		</a></li> \
	<li><a id="gold" class="styleswitch color"> Gold	</a></li> \
	<li><a id="blue" class="styleswitch color"> Blue		</a></li> \
	<h3 class="skin_title"> Skins </h3>\
	<li><a id="dark" class="styleswitch color"> Dark		 </a></li> \
	<li><a id="sblue" class="styleswitch color"> Blue		 </a></li> \
	<li><a id="brown" class="styleswitch color"> Brown		 </a></li> \
    </ul> </div><!-- End switcher-box --> \
    </div><!-- End content --> \
	';
	
jQuery(".switcher").prepend( styleswitcherstr );

});

/* boxed & wide syle */
jQuery(document).ready(function(){ 

var cookieName = 'wide';

function changeLayout(layout) {
jQuery.cookie(cookieName, layout);
jQuery('head link[name=layout]').attr('href', 'css/layout/' + layout + '.css');
}

if( jQuery.cookie(cookieName)) {
changeLayout(jQuery.cookie(cookieName));
}

jQuery("#wide").click( function(){ jQuery
changeLayout('wide');
});

jQuery("#boxed").click( function(){ jQuery
changeLayout('boxed');
});

});


/* background images */
jQuery(document).ready(function(){ 
  
  var startClass = jQuery.cookie('mycookie');
  jQuery("body").addClass("default");

/* Default */
jQuery("#default").click( function(){ 
  jQuery("body").removeClass('parrot');
  jQuery("body").removeClass('gold');
  jQuery("body").removeClass('blue');
  jQuery("body").removeClass('dark');
  jQuery("body").removeClass('sblue');
  jQuery("body").removeClass('brown');
  jQuery("body").addClass('default');
  jQuery.cookie('mycookie','default');
 
});  
  
jQuery("#parrot").click( function(){ 
  jQuery("body").removeClass('default');
  jQuery("body").removeClass('gold');
  jQuery("body").removeClass('blue');
  jQuery("body").removeClass('dark');
  jQuery("body").removeClass('sblue');
  jQuery("body").removeClass('brown');
  jQuery("body").addClass('parrot');
  jQuery.cookie('mycookie','parrot');
 
});  

jQuery("#gold").click( function(){ 
  jQuery("body").removeClass('default');
  jQuery("body").removeClass('parrot');
  jQuery("body").removeClass('blue');
  jQuery("body").removeClass('dark');
  jQuery("body").removeClass('sblue');
  jQuery("body").removeClass('brown');
  jQuery("body").addClass('gold');
  jQuery.cookie('mycookie','gold');
 
});  
 
 
 
 jQuery("#blue").click( function(){ 
  jQuery("body").removeClass('default');
  jQuery("body").removeClass('parrot');
  jQuery("body").removeClass('gold');
  jQuery("body").removeClass('dark');
  jQuery("body").removeClass('sblue');
  jQuery("body").removeClass('brown');
  jQuery("body").addClass('blue');
  jQuery.cookie('mycookie','blue');
 
});  

 jQuery("#dark").click( function(){ 
  jQuery("body").removeClass('default');
  jQuery("body").removeClass('parrot');
  jQuery("body").removeClass('gold');
  jQuery("body").removeClass('blue');
  jQuery("body").removeClass('sblue');
  jQuery("body").removeClass('brown');
  jQuery("body").addClass('dark');
  jQuery.cookie('mycookie','dark');
 
});  

 jQuery("#sblue").click( function(){ 
  jQuery("body").removeClass('default');
  jQuery("body").removeClass('parrot');
  jQuery("body").removeClass('gold');
  jQuery("body").removeClass('dark');
  jQuery("body").removeClass('blue');
  jQuery("body").removeClass('brown');
  jQuery("body").addClass('sblue');
  jQuery.cookie('mycookie','sblue');
 
});  


 jQuery("#brown").click( function(){ 
  jQuery("body").removeClass('default');
  jQuery("body").removeClass('parrot');
  jQuery("body").removeClass('gold');
  jQuery("body").removeClass('dark');
  jQuery("body").removeClass('blue');
  jQuery("body").removeClass('sblue');
  jQuery("body").addClass('brown');
  jQuery.cookie('mycookie','brown');
 
});  


if (jQuery.cookie('mycookie')) {
  jQuery('body').addClass(jQuery.cookie('mycookie'));
}

});

/* Skins Style */
jQuery(document).ready(function(){ 

var cookieName = 'default';

function changeLayout(layout) {
jQuery.cookie(cookieName, layout);
jQuery('head link[id=skins]').attr('href', 'css/skins/' + layout + '.css');
}

if( jQuery.cookie(cookieName)) {
changeLayout(jQuery.cookie(cookieName));
}

jQuery("#default").click( function(){ jQuery
changeLayout('default');
});

jQuery("#parrot").click( function(){ jQuery
changeLayout('parrot');
});

jQuery("#gold").click( function(){ jQuery
changeLayout('gold');
});

jQuery("#blue").click( function(){ jQuery
changeLayout('blue');
});

jQuery("#dark").click( function(){ jQuery
changeLayout('dark');
});

jQuery("#sblue").click( function(){ jQuery
changeLayout('sblue');
});

jQuery("#brown").click( function(){ jQuery
changeLayout('brown');
});


});



/* Reset Switcher */
jQuery(document).ready(function(){ 

// Style Switcher	
jQuery('.switcher').animate({
right: '-175px'
});

jQuery('.switcher h2 a').click(function(e){
e.preventDefault();
var div = jQuery('.switcher');
// console.log(div.css('left'));
if (div.css('right') === '-175px') {
jQuery('.switcher').animate({
  right: '0px'
}); 
} else {
jQuery('.switcher').animate({
  right: '-175px'
});
}
})
 

		 
});						   

