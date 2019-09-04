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
function renderFullWidthSlider(selector,config){
    $(selector).on('init', function(event, slick){}).slick(config).on("beforeChange", function (event, slick, currentSlide, nextSlide) {                    
             console.log("before slider");
    }); 
}
 function myHTMLInclude() {
      var z, i, a, file, xhttp;
      z = document.getElementsByTagName("*");
      for (i = 0; i < z.length; i++) {
        if (z[i].getAttribute("w3-include-html")) {
          a = z[i].cloneNode(false);
          file = z[i].getAttribute("w3-include-html");
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              a.removeAttribute("w3-include-html");
              a.innerHTML = xhttp.responseText;
              z[i].parentNode.replaceChild(a, z[i]);
              myHTMLInclude();
            }
          }      
          xhttp.open("GET", file, true);
          xhttp.send();
          return;
        }
      }
     const slider_Config = {
             dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            arrows:false,
            adaptiveHeight: true
    }
     renderFullWidthSlider("#home-featured-carousel .slider-inner",slider_Config);    
}

 
$(window).on("load",function() {  
         myHTMLInclude();
 });


