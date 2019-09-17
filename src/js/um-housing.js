(function ($) {

    /*------------------------------------------------
        * Preloader 
    ------------------------------------------------*/
    $(window).load(function () {
        $('#loading').fadeOut();
        $('#preloader').delay(300).fadeOut('slow');
        // $('#modal1').modal('show');      
    });
    /*------------------------------------------------
        * Affix   
    ------------------------------------------------*/
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').on('click', function (event) {
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

function resetNav(){
  var pGroup = $("#pageGroup").data("pageGroup");
  var navGroup = $(".navbar-nav>.nav-item");  
  navGroup.each(function(key,value){
    if(pGroup===$(this).data("navGroup")){
      $(this).addClass("active");
    }
  });  
}
function renderSlider(selector, config) {
    $(selector).on('init', function (event, slick) { }).slick(config).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        //console.log("before slider");
    });
}
function isSliderInTab(sliderSelector){
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    if($(target).find("."+sliderSelector).length>0){
      return true;
    }else 
    {
      return false;
    }
  });
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function getContentFromFile(){
  $.getJSON('/um-properties.json',function(jsonData){
     $("span").each(function(){
       if(typeof $(this).data("propertyKey")!=='undefined'){
         var currentKey = $(this).data("propertyKey");
         var unit_number = typeof $(this).data("propertyUnit") =='undefined'?1:$(this).data("propertyUnit");
         var span_display_type = typeof $(this).data("displayType") =='undefined'? "":$(this).data("displayType");
         var $this = $(this);    
         var unit_price = -1;
         $.each(jsonData.all_properties,function(index,property){       
            if(property.property_key == currentKey){
              $.each(property.units,function(key,unit){            
                if(unit_number == unit.unit_number){                  
                  switch(span_display_type){
                    case "price":
                    $this.html("$"+formatNumber(unit.unit_price));
                    break;
                    case "date":
                     $this.html(unit.availability);
                    break;
                    case "status":
                     $this.html(unit.status);
                    break;
                    case "address":
                     $this.html(property.property_address);
                    break;
                    default:
                    $this.html("<span style='color:red'>[!!!!display type configuration error!!!!]</span>");               
                    break;
                  }
                }
              })
            }           
         })
       }
       if(typeof $(this).data("resourceKey")!=='undefined'){
         var that = $(this);
         $.each(jsonData.shared_text_resource,function(key,text){  
            if(key===that.data("resourceKey")){
              that.html(text);
            }           
         });
       }
     })
  }); 
}

function pageConstructor() {
    var z, i, a, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        if (z[i].getAttribute("w3-include-html")) {
            a = z[i].cloneNode(false);
            file = z[i].getAttribute("w3-include-html");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    a.removeAttribute("w3-include-html");
                    a.innerHTML = xhttp.responseText;
                    z[i].parentNode.replaceChild(a, z[i]);
                    pageConstructor();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
  }
  const slider_main_Config = {
      dots: true,
      autoplay: true,
      infinite: true,
      autoplaySpeed: 8000,
      slidesToShow: 1,
      arrows: false,
      adaptiveHeight: true
  };

  const slider_gallery_main_Config = {
      autoplay: true,
      autoplaySpeed: 1111000,
      pauseOnHover: true,
      asNavFor: '.gallery-slider__thumbnail-inner'
  };
  const slider_gallery_thumbnail_Config = {
      slidesToShow: 6,
      slidesToScroll: 1,
      centerMode: false,
      focusOnSelect: true,
      arrows: false,
      asNavFor: '.gallery-slider__main-inner',
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 5,
                  arrows: false
              }
          }
      ]
  };

  var isSliderInitialized = false;
  //homepage slider
  renderSlider("#home-featured-carousel .slider-inner", slider_main_Config);
  /*detail page slider render*/
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    if($(target).find(".gallery-carousel").length>0&&!isSliderInitialized){
      renderSlider(".gallery-slider__main-inner", slider_gallery_main_Config);
      renderSlider(".gallery-slider__thumbnail-inner", slider_gallery_thumbnail_Config);
      isSliderInitialized = true;
    }
  });
  resetNav();

  getContentFromFile();

}

$(window).on("load", function () {
    pageConstructor();
});