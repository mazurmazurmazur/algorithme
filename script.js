
  /**NAVIGATION MOBILE */
  /* Open */
  function openMobileNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  /* Close */
  function closeMobileNav() {
    document.getElementById("myNav").style.height = "0%";
  }
  
    /**END NAVIGATION MOBILE */  







function defer(method) {
    if (window.jQuery)
      method();
    else
      setTimeout(function() {
        defer(method)
      }, 50);
  }
  defer(function() {
    (function($) {
      
      function doneResizing() {
        var totalScroll = $('.resource-slider-frame').scrollLeft();
        var itemWidth = $('.resource-slider-item').width();
        var difference = totalScroll % itemWidth;
        if ( difference !== 0 ) {
          $('.resource-slider-frame').animate({
            scrollLeft: '-=' + difference
          }, 500, function() {
            // check arrows
            checkArrows();
          });
        }
      }
      
      function checkArrows() {
        var totalWidth = $('#resource-slider .resource-slider-item').length * $('.resource-slider-item').width();
        var frameWidth = $('.resource-slider-frame').width();
        var itemWidth = $('.resource-slider-item').width();
        var totalScroll = $('.resource-slider-frame').scrollLeft();
        
        if ( ((totalWidth - frameWidth) - totalScroll) < itemWidth ) {
          $(".next").css("visibility", "hidden");
        }
        else {
          $(".next").css("visibility", "visible");
        }
        if ( totalScroll < itemWidth ) {
          $(".prev").css("visibility", "hidden");
        }
        else {
          $(".prev").css("visibility", "visible");
        }
      }
      
      $('.arrow').on('click', function() {
        var $this = $(this),
          width = $('.resource-slider-item').width(),
          speed = 500;
        if ($this.hasClass('prev')) {
          $('.resource-slider-frame').animate({
            scrollLeft: '-=' + width
          }, speed, function() {
            // check arrows
            checkArrows();
          });
        } else if ($this.hasClass('next')) {
          $('.resource-slider-frame').animate({
            scrollLeft: '+=' + width
          }, speed, function() {
            // check arrows
            checkArrows();
          });
        }
      }); // end on arrow click
      
      $(window).on("load resize", function() {
        checkArrows();
        $('#resource-slider .resource-slider-item').each(function(i) {
          var $this = $(this),
            left = $this.width() * i;
          $this.css({
            left: left
          })
        }); // end each
      }); // end window resize/load
      
      var resizeId;
      $(window).resize(function() {
          clearTimeout(resizeId);
          resizeId = setTimeout(doneResizing, 500);
      });
      
    })(jQuery); // end function
  });





////DESKTOP HEAD NAV PUSHING MAIN CONTENT 

function openHeadNav(a, fromRight) {
  document.getElementById(a).style.height = "50vh";
  document.getElementById("bodyWrapper").style.marginTop = "50vh";
  document.getElementById("overlayMain").style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("overlayMain").style.zIndex = 20;
  document.getElementById("sideNavHeadWrapperA").style.right = fromRight +"vw";
}

function closeHeadNav(a) {
  document.getElementById(a).style.height = "0";
  document.getElementById("bodyWrapper").style.marginTop= "0";
  document.getElementById("overlayMain").style.backgroundColor = "transparent";
  document.getElementById("overlayMain").style.zIndex = -10;

}


////END OF DESKTOP HEAD NAV PUSHING MAIN CONTENT



//////MODAL WITH PRODUCT DETAILS///////

$('.openmodale').click(function (e) {
         e.preventDefault();
         $('.modale').addClass('opened');
    });
$('.closemodale').click(function (e) {
         e.preventDefault();
         $('.modale').removeClass('opened');
    });


//////END OF MODAL WITH PRODUCT DETAILS///////


////COLOR PICKER///

$('select[name="colorpicker"]').simplecolorpicker();
$('select[name="colorpicker"]').simplecolorpicker('selectColor', '#7bd148');
$('select[name="colorpicker"]').simplecolorpicker('destroy');
$('select[name="colorpicker"]').simplecolorpicker({picker: false});
////END COLOR PICKER///


////DESKTOP BOTTOM NAV PUSHING MAIN CONTENT 




function openNav(a, fromLeft) {
  document.getElementById(a).style.height = "50vh";
  document.getElementById("bodyWrapper").style.marginTop = "-50vh";
  document.getElementById("overlayMain").style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("overlayMain").style.zIndex = 20;
  document.getElementById("sideNavWrapperA").style.left = fromLeft +"vw";
}

function closeNav(a) {
  document.getElementById(a).style.height = "0";
  document.getElementById("bodyWrapper").style.marginTop= "0";
  document.getElementById("overlayMain").style.backgroundColor = "transparent";
  document.getElementById("overlayMain").style.zIndex = -10;
}


////END OF DESKTOP BOTTOM NAV PUSHING MAIN CONTENT


