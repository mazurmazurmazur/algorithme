var x = window.matchMedia("(min-width: 900px)")



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



    /** submenus hide/show **/


let aOX = $("#aOX");
let aOXED = $("#aOXED");
let aOXs = $("#aOX span");
let aOXEDs = $("#aOXED span");

aOX.on("click", function(){
  $(this).find("span").css({"background" : "black",
"color" : "white"});
  $(this).next().slideDown();
  aOXED.next().slideUp();
  aOXEDs.css({"background" : "transparent",
  "color" : "black"});
})

aOXED.on("click", function(){
  $(this).find("span").css({"background" : "black",
  "color" : "white"});
    $(this).next().slideDown();
  aOX.next().slideUp();
  aOXs.css({"background" : "transparent",
  "color" : "black"});

})


 /** submenus hide/show  END**/




function animateMainContent(){
  document.getElementById("mainContent").children[0].style.transition = "ease-in-out 1.5s";


}

animateMainContent();


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












////COLOR PICKER///

$('select[name="colorpicker"]').simplecolorpicker();
$('select[name="colorpicker"]').simplecolorpicker('selectColor', '#7bd148');
$('select[name="colorpicker"]').simplecolorpicker('destroy');
$('select[name="colorpicker"]').simplecolorpicker({picker: false});
////END COLOR PICKER///





//////NEWSLETTER 


// $(document).ready(function () {
//   if(x.matches){                           //FUNCTION THAT SHOWS NEWSLETTER AUTOMATICALLY
//   setTimeout(fnShowPopup, 5000);}
// });
function fnShowPopup() {
  document.getElementById("newsletterContainer").style.display = "block";
  document.getElementById("newsletterContainer").style.zIndex = 30;
  document.getElementById("overlayMain").style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("overlayMain").style.zIndex = 20;

  //code to show popup
}

function closeNewsletter(){
  document.getElementById("newsletterContainer").style.display = "none";
  document.getElementById("overlayMain").style.backgroundColor = "transparent";
  document.getElementById("overlayMain").style.zIndex = -10;
}


////END OF NEWSLETTER