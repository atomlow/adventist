/*global $, jQuery, alert, doAccordions, clickToCall, equalHeight, Geo_InitMap*/
/*global escape: true*/
/*jslint browser: true*/




var $window = $(window),
    $winWidth = $window.width();

function windowSize() {
	'use strict';
    
    var w = Math.max($window.width(), window.innerWidth),
        type = 'Default';
    
    if (w > 1439) {
        type = 'XL';
    } else if (w <= 1439 && w > 1279) {
        type = 'Large';
    } else if (w <= 1279 && w > 1023) {
        type = 'Medium';
    } else if (w <= 1023 && w > 240) {
        type = 'Small';
    } else {
        type = 'Default';
    }
  
    // change the css file of the tag with id="stl" and rel="stylesheet"
    $("body").removeClass('XL Large Medium Small Default').addClass(type);

}

function moveElements() {
    'use strict'; 

    
    // Tools Nav below logo
    $('.Default .tools-container, .Small .tools-container').insertAfter('.bottom-header-wrap');
    $('.Medium .tools-container, .Large .tools-container, .XL .tools-container').insertBefore('.bottom-header-wrap');
    // $('.Medium #MainNavWrap').insertAfter('#SearchWrap');
    // $('.Large #MainNavWrap, .XL #MainNavWrap').insertBefore('#SearchWrap');

    // Move Set Your Location below Emergency Wait Times 
    $('.Default .geo-targeting, .Small .geo-targeting').insertAfter('.secondary-nav-links');
    $('.Medium .geo-targeting, .Large .geo-targeting, .XL .geo-targeting').prependTo('.tools-container');


    // Leland's Help
    // $('.Default .tools-container, .Small .tools-container').css('border','1px solid red');
    // $('.Medium .tools-container, .Large .tools-container, .XL .tools-container').css('border','1px solid green');

    
}

    /* Sticky Nav: Fixing Nav to top once scrolled there 
---------------------------------------------------------------------------- */
function stickyNavigation() {
	"use strict";
	var $window = $(window),
		$navigation = $(".bottom-header-wrap"),
		offsetnav = $navigation.offset(),
		navHeight = $navigation.outerHeight();

	$window.scroll(function () {
		if (($window.scrollTop() > offsetnav.top) && $('.Large, .XL').length) {
			$navigation.addClass('fixed');
			$('#bottom-header-wrap').css('height', navHeight);
		} else {
			$navigation.removeClass('fixed');
			$('#HeaderWrapOuter').removeAttr('style');
		}
	});
}

//bind to resize
$window.resize(function () {
    'use strict';
     equalHeight.equalHeight($('.news-content-wrap'));
    
     console.log('adam');

    windowSize();
    moveElements();
    
}); //end of resize function

$(document).ready(function () {
    'use strict';
    $('.wait-time-text-bold').click(function (){
        console.log('Something');
    });

    windowSize();
    moveElements();
    stickyNavigation();

    // Mobile Menu function for simple showing of menu

    $('#MenuButton').on("click", function(){
        $(".Small .bottom-header-wrap, .Small .tools-container").toggleClass("open");
       });

    $("#MenuButton").bind("click keyboard", function(e) {
        if (e.type != "keypress" || e.keyCode == 13) {

            $("#MobileHeaderWrap").toggleClass("Open");
            // $("#BodyWrap").toggleClass("SlideLeft");
            // $("#BodyWrapOverlay").toggleClass("Open");
            // $("#MenuButton").toggleClass("Open");
            //$("#MenuButton").removeAttr('style');

            if ($("#MenuButton").hasClass("Open")) {
                
                $("#aspnetForm").attr("aria-hidden","true");
                $("#BodyWrap a, #BodyWrap button, #BodyWrap input, #BodyWrap iframe").attr("tabindex","-1");
                $('#SlideMenuWrap #MobileLogo a').focus();
                $("#MenuClose").attr("tabindex","0");

            }
            
            e.stopPropagation();
            e.preventDefault();
        }
    });

});



$(window).load(function () {
    equalHeight.equalHeight($('.news-content-wrap'));
});

// Slick Slider

$(window).load(function(){
    $(".testimonial-slider").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1
    });
});
