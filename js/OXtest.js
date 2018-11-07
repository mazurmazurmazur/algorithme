let colours = [];
let sizes = [];

function getAllPaintings() {
  fetch("http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct?_embed&per_page=50")
    .then(res => res.json())
    .then(showPaintings)
    .then(resize)
    
    
}

function showPaintings(data) {
  console.log(data);
    let list = document.querySelector(".resource-slider-frame");
    let template = document.querySelector("#paintingTemplate").content;
    let clone = template.cloneNode(true);


    let galleryItemFromLeft = 0;

    data.forEach(function(thePainting) {
      let clone = template.cloneNode(true);

      let parentBody = window.parent.document.body;
      let image = clone.querySelector(".openmodale");
      let priceTag = clone.querySelector(".priceUnderTitle span");
      let titleTag = clone.querySelector(".underTitle");

      
      let photo = thePainting._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url;
      let price = thePainting.acf.price;
      let title = thePainting.title.rendered;
      let dataId = thePainting.id;

    
            //paintings.push(colours);
            image.setAttribute("src", photo);
            image.setAttribute("data-id", dataId);
            priceTag.innerHTML = price;
            titleTag.innerHTML = title;

            

            list.appendChild(clone);
    })
}


getAllPaintings();













 


 
function doneResizing() {


 //////MODAL WITH PRODUCT DETAILS///////
 var parentBody = window.parent.document.body
 let modale = window.parent.document.querySelector(".modale");
 let closemodale = $(".closemodale", parentBody);
 
 
 $('.openmodale').click(function () {
    modale.classList.add("opened");     //opening the modale


  ////filling current modale with appropriate json data BELOW
   currentId = $(this).attr("data-id");
   function fillModale() {
    fetch("http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct/"+currentId+"?_embed")
      .then(res => res.json())
      .then(showModale)  
  }

  function showModale(json){
    let modaleTitle = modale.querySelector("h2");
    let modaleColorPicker = modale.querySelector("#colorpickerid option");
    

    let jsonTitle = json.title.rendered;
    let colorPick = json.acf.colorpick;

    modaleColorPicker.setAttribute("value", "#777777");


  //   for (let key in colorPick) {
  //     if (colorPick.hasOwnProperty(key)) {
  //       let option = document.createElement('option');
  //         option.setAttribute("value", colorPick[key]);
  //         option.innerHTML = "Color";
  //         modaleColorPicker.appendChild(option);
  //     }
  // }


    modaleTitle.innerHTML=jsonTitle;

  }

  fillModale();
});
closemodale.click(function () {
   modale.classList.remove('opened');
});



//////END OF MODAL WITH PRODUCT DETAILS///////







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








function resize(){
  window.dispatchEvent(new Event('resize'));}
