var x = window.matchMedia("(min-width: 900px)")



  /**NAVIGATION MOBILE */
  /* Open */
  function openMobileNav() {
    document.getElementById("myNav").style.height = "100%";
    $(".closebtn").css("position", "fixed");
  }
  
  /* Close */
  function closeMobileNav() {
    document.getElementById("myNav").style.height = "0%";
    $(".closebtn").css("position", "absolute");
  }



function showCategories(){
  $(".mainMobileMenu").css("display", "none");
    $(".categoriesMobileMenu").css("display", "block");
    $(".categoriesMobileMenu span").css("display", "block");
}

function showMainMenu(){
  $(".mainMobileMenu").css("display", "block");
    $(".categoriesMobileMenu").css("display", "none");
    $(".categoriesMobileMenu span").css("display", "none");

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
  aOXEDs.css({"background" : "white",
  "color" : "black"});
})

aOXED.on("click", function(){
  $(this).find("span").css({"background" : "black",
  "color" : "white"});
    $(this).next().slideDown();
  aOX.next().slideUp();
  aOXs.css({"background" : "white",
  "color" : "black"});

})


 /** submenus hide/show  END**/


 $("#logoContainerDesktop").on("click", function(){
  window.location = "mainShop.html";
 })




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








//////NEWSLETTER 


$(document).ready(function () {
  if(x.matches){                           //FUNCTION THAT SHOWS NEWSLETTER AUTOMATICALLY
  setTimeout(fnShowPopup, 5000);}
});
function fnShowPopup() {
  document.getElementById("newsletterContainer").style.display = "block";
  document.getElementById("newsletterContainer").style.zIndex = 120;
  document.getElementById("overlayMain").style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("overlayMain").style.zIndex = 110;
  document.getElementById("overlayMain").style.display = "block";


  //code to show popup
}

function closeNewsletter(){
  document.getElementById("newsletterContainer").style.display = "none";
  document.getElementById("overlayMain").style.backgroundColor = "transparent";
  document.getElementById("overlayMain").style.zIndex = -10;
}


////END OF NEWSLETTER


//GLOBAL CART SYSTEM
 let cartAmount = document.getElementById("amountInCart");

function updateCart() {
  //function called to update amount of all items in cart
  let cartAmountParent = window.parent.document.querySelector("#amountInCart");

  if (localStorage.length > 0) {
    let sum = 0;
    for (let i = 0, leng = localStorage.length - 1; i < leng; i++) {
      let key = localStorage.key(i);
      let val = localStorage.getItem(key);
      let valAll = val.split("*");
      console.log("valAll = " + valAll);
      sum += parseInt(valAll[0]);
      if (isNaN(sum)) {
        cartAmountParent.innerHTML = "0";
        console.log("option1 happened")
      } else {
        cartAmountParent.innerHTML = sum;
        console.log("option2 happened")
      }
      
     
      
    }
  }
}

let cartState = document.querySelector("#amountInCart");

  updateCart(cartState); //global cart update






  ///MIGRATED FROM LOCAL SCRIPT IN MAINSHOP.HTML BELOW



  var x = window.matchMedia("(min-width: 900px)")


  let iframe = document.getElementById('mainContent');
  let innerDoc = iframe.contentDocument;


function setWebshopCustom(){

if(!x.matches){ 
  $("#mainContent").css("top", "15vh");
  $(".newsGallery").css(
    {"left":"0",
    "width":"100vw",
    "height":"80vh"
});

}
else{

  $("#mainContent").css("top", "15vh");
  $(".newsGallery").css(
    {"left":"10vw",
    "width":"80vw"
   
});}
}
function setCampaignCustom(){

  if(x.matches){ 
  $("#mainContent").css("top", "0vh");
  $(".newsGallery").css(
    {"left":"0",
    "width":"100vw",
    "height":"100vh",
    "overflow":"scroll"
});

}
else{

  $("#mainContent").css("top", "7vh");
  $(".newsGallery").css(
    {
    "width":"100vw",
    "height":"100vh"
});}

}

function setRegularSize(){

  if(x.matches){ 
  $("#mainContent").css("top", "15vh");
  $(".newsGallery").css(
    {"left":"0",
    "width":"100vw",
    "height":"80vh"
});

}
else{

  $("#mainContent").css("top", "15vh");
  $(".newsGallery").css(
    {"left":"0",
    "width":"100vw",
    "height":"80vh"
});}
}


//FUNCTION TAKING CARE OF MOVING OUT PREVIOUS MAIN CONTENT IN ORDER TO REPLACE IT WITH NEW ONE

function load_home(element_flowing_in, startBottomOrTop, customSize) { //bottom is 0, top is 1
  let mainContent = document.getElementById("mainContent");
  let mainContentCurrentChild = mainContent.children[0];  //this is the current element in the main content area
  mainContentCurrentChild.style.transition = "ease-in-out 1s"; // adding smooth animation to every new element
  
  
  
  




  
  if(startBottomOrTop == 0)
    mainContentCurrentChild.style.transform="translateY(-120vh)";
  else
    mainContentCurrentChild.style.transform="translateY(100vh)";

 
   
  setTimeout(function(){
    mainContent.removeChild(mainContentCurrentChild);
  }, 500)
   

    let newObject = document.createElement('object');     ///////
    $(newObject).attr('type', 'text/html');              //////
    $(newObject).attr('data',element_flowing_in);       //////TAKES CARE OF IMPORTING NEW HTML FILE INTO MAIN SPACE
    newObject.classList.add("newsGallery");       //////
    

 


    mainContent.appendChild(newObject);                 //////

       let flowing_in_content = mainContent.children[1];
       
       if(startBottomOrTop == 0)                                        
          flowing_in_content.style.transform="translateY(100vh)";
       else
          flowing_in_content.style.transform="translateY(-100vh)";

        flowing_in_content.style.display= "block";                ///showing and placing the new item in the main space
        flowing_in_content.style.transform="translateY(0)";       ////
        
       
      setTimeout(function(){
        if(customSize == "webshop"){
  setWebshopCustom();
}
else if(customSize == "campaign"){
  setCampaignCustom();
}
else{
setRegularSize();
}

      },300);

      
       
}

load_home('testGall.html',1,'webshop');


 //END OF FUNCTION TAKING CARE OF MOVING OUT PREVIOUS MAIN CONTENT IN ORDER TO REPLACE IT WITH NEW ONE




 //END OF MIGRATION FROM MAINSHOP.HTML



 //MOBILEMENU WEBSHOP SECTIONS

 