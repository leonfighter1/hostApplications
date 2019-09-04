(function($) {

    
/*------------------------------------------------
 * Preloader 
------------------------------------------------*/  
	$(window).load(function() {
		$('#loading').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
		  // $('#modal1').modal('show');

 });
/*------------------------------------------------
 * Affix   
------------------------------------------------*/  
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 0)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.scroll',
        offset: 0
    })    

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
	
/*------------------------------------------------
 * Initialize WOW.js Scrolling Animations 
------------------------------------------------*/  
	
    
    
/*------------------------------------------------
 * slick slider    
------------------------------------------------*/  


});



