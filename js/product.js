// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName("id");
//getParameterByName is a function that fetches the id from URL
//the id in URL comes from dynamically set "href" in blog.html through blog.js
//the id set in this URL comes from fetched json file in blog.js


let currentProductNum;
let jsonOut;



let desc;
  let descImage;
  let descButtonOverview;
  let descButtonDetails;
  let descButtonCare ;
  let descButtonFit;

  let descJson;
  let descDetailsTextJson;
  let descDetailsImageJson ;
  let descCareJson;
  let descFitTextJson ;
  let descFitImageJson ;

  let zoomImageLink;


function getAllProducts() {
  fetch(
    "http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct/" +
      dynamicContent
  )
    //only one entry in json file (WP REST)

    .then(res => res.json())
    .then(showProducts) //filling DOM with json data
    .then(afterFetch)
    .then(activateZoom)
    .then(initiateColorPicker)
}

function showProducts(json) {
  let acf = json.acf;
  console.log(json);
  jsonOut = json;
  let colorpick = acf.colorpick;

  let colorPicker = document.querySelector(".select-color");
  let counter = 0;

  for (key in colorpick) {
    ///looping through all keys in this product(acf= advanced custom fields)
    if (key.startsWith("color") && colorpick[key] != "") {
      ////filling the available colors from CMS
      let newDiv = document.createElement("div");
      newDiv.id = key;
      newDiv.className = "color";
      newDiv.style.background = colorpick[key];
      colorPicker.appendChild(newDiv);
      counter++;
    }
  }
  
  let image = document.querySelector(".product-image .bg");
  let priceTag = document.querySelector(".price span"); //selecting DOM elements
  let titleTag = document.querySelector(".productName");
  desc = document.querySelector(".desc");
   descImage = document.getElementById("product-desc-image");
   descButtonOverview = document.querySelector(".product-overview");
   descButtonDetails = document.querySelector(".product-details");
   descButtonCare = document.querySelector(".product-care");
   descButtonFit = document.querySelector(".product-fit");

  let photo = colorpick.imagescolor1.image1;
  let price = json.acf.price; //selecting JSON elements
  let title = json.title.rendered;
   descJson = acf.description.overview;
   descDetailsTextJson = acf.description.details.detailstext;
   if(acf.description.details.detailsimage.sizes) descDetailsImageJson = acf.description.details.detailsimage.sizes.medium_large;
   descCareJson = acf.description.care;
   descFitTextJson = acf.description.fit.fittext;
   if(acf.description.fit.fitimage.sizes) descFitImageJson = acf.description.fit.fitimage.sizes.medium_large;


  image.style.backgroundImage = "url(" + photo + ")";
  priceTag.innerHTML = price; ///populating HTML with JSON content
  titleTag.innerHTML = title;
  desc.innerHTML = descJson;

  zoomImageLink = photo; ////link for the jquery-zoom plugin 



  ///product det buttons changing description content
  descButtonOverview.addEventListener("click", function() {fillDesc("overview")});
  descButtonCare.addEventListener("click", function() {fillDesc("care")});
  descButtonDetails.addEventListener("click", function() {fillDesc("details")});
  descButtonFit.addEventListener("click", function() {fillDesc("fit")});



  ///


  /////color selector
  $(".color").on("click touchstart", function() {
    $(".color").css("border", "1px solid gray");
    if($('.color').hasClass('active')){
      $('.color').removeClass('active')
   }
    $(this).css("border", "2px solid black");
    $(this).addClass('active');
    checkColor($(this).attr("id"));
  });
  $("#color" ).trigger( "click" );



  function setMainImage(url) {
    image.style.opacity = 0;
    image.style.backgroundImage = "url(" + url + ")";
    image.style.opacity = 1;
  }

  function checkColor(colorName) {
    let photoId= colorName.split("r").pop();
    let imagesColor = "imagescolor" + photoId;
    if(photoId != ""){
    setMainImage(colorpick[imagesColor].image1);
    createDotsGallery(photoId);}
    else{
      setMainImage(colorpick.imagescolor1.image1);
      createDotsGallery(1);
    }

                  ///ABOVE SETS EACH FIRST PHOTO OF EACH COLOR AS A MAIN WHEN CLICKED ON DESIRED COLOR SQUARE



    
  }




function createDotsGallery(i){
  let imagesColor = "imagescolor" + i;
  let images = colorpick[imagesColor];
  let indicator = document.querySelector(".indicator");
    indicator.innerHTML = "";

    populateSizes(i);

   

  for (key in colorpick[imagesColor]) {

  
    
    if (
      key.startsWith("image") &&
      images[key] != false &&
      images[key] != ""

    ) {
    
      let newDiv = document.createElement("div");
      let currentImage;
      currentImage = images[key];
     
    
      newDiv.id = key;
      newDiv.className = "dot";

      newDiv.addEventListener("click", function() {
        setMainImage(currentImage);
      });
      indicator.appendChild(newDiv);
    }
  }
}



function populateSizes(i){      //populte sizes in product
  let select = document.querySelector(".selectSize");
  currentProductNum = i;
  $(".selectSize").empty();
  

  let sizeNumber = "size" + i;
  let sizes = colorpick[sizeNumber];
  for(key in sizes)
  {
    
       if(sizes[key] >0){
       let newOption = document.createElement("option");
       newOption.id="option"+key;
       newOption.innerHTML = key.toUpperCase();
       select.appendChild(newOption);}
  }

}



$('.selectSize').on('change', function (e) {
  
  $(".selectQuantity").empty();
  let optionSelected = $("option:selected", this);
  
  let valueSelected = this.value;
  let sizeNumber = "size" + currentProductNum;
  let sizes = colorpick[sizeNumber]
  let selectAmount = document.querySelector(".selectQuantity");


  for(key in sizes)
  {
    if(key.toUpperCase() == valueSelected){
      for(let i = 1; i<sizes[key] && i<5; i++){
        let newOption = document.createElement("option");
        newOption.id="option"+i;
        newOption.innerHTML = i;
        selectAmount.appendChild(newOption);

      }
    }
  }


  
});




  checkColor("color1");




  

}

getAllProducts();


function fillDesc(descElement){

  desc.innerHTML= "";
  descImage.setAttribute("src", "");
  if(descElement =="overview" && descJson!=null ){
    desc.innerHTML=descJson;
  }
  else if(descElement =="details" && descDetailsImageJson!=null && descDetailsTextJson!=null){
    desc.innerHTML=descDetailsTextJson;
    descImage.setAttribute("src", descDetailsImageJson); 
  }
  else if(descElement =="care" && descCareJson !=null){
    desc.innerHTML=descCareJson;
  }
  else if(descElement =="fit" && descFitImageJson!=null && descFitTextJson!=null){
    desc.innerHTML=descFitTextJson
    descImage.setAttribute("src", descFitImageJson);
  }
}





function returnColor(id) {
  let photoId= colorName.split("r").pop();
  let imagesColor = "imagescolor" + photoId;
  if(photoId != ""){
    return photoId;
  }



  
}


function afterFetch(json) {
  
  let addButton = document.getElementById("addProduct-btn");
  let productName = ("id" + dynamicContent); //id from url
  let selectColor = $(".select-color");


  selectColor.append('<label for="color-input" id="color-label"><p>CUSTOM ></p></label><input type="checkbox" id="color-input"></input><div id="color-picker"><canvas id="color-block" height="150" width="150"></canvas><canvas id="color-strip" height="150" width="30"></canvas><a href="javascript:void(0)"class="custom-color-order-btn">ORDER...</a></div>');



  addButton.addEventListener("click", function(event) {
    event.preventDefault();

    let activeColor = $(".active").attr("id");
    console.log(activeColor);


    let e = document.querySelector(".selectQuantity");
    let sizeSelector = document.querySelector(".selectSize");
    let strUser = e.options[e.selectedIndex].text; ///amount selected in option
    let sizeSelected = sizeSelector.options[sizeSelector.selectedIndex].text; ///size selected in option

    if (localStorage[sizeSelected + " " + activeColor +" "+productName]) {
      //increasing amount of selected product in cart
      localStorage[sizeSelected + " " + activeColor +" "+productName] =
        Number(localStorage[sizeSelected + " " + activeColor +" "+productName]) + Number(strUser); //increasing by amount selected in select-dropdown
    } else {
      localStorage[sizeSelected + " " + activeColor +" "+productName] = strUser;
    }
    updateCart(localStorage.length); ///dynamic cart update after click, calls global function in home.js
  });
}

function activateZoom(){
$(document).ready(function(){
  $('.bg').zoom({url: zoomImageLink});
});
}





// CUSTOM COLOR PICKER BELOW

function initiateColorPicker(){

var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');
var colorInput = document.getElementById('color-input');
var colorPicker = document.getElementById('color-picker');



var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  colorLabel.style.backgroundColor = rgbaColor;
}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);



// document.body.addEventListener('click', function(){
//   if(colorInput.checked!=false){
//   colorInput.checked = false;}
// }, false); 

// colorPicker.addEventListener('click', function(ev){
//   ev.stopPropagation;
// }, false);

}



//END CuSTOM COLOR PICKER