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

function getAllProducts() {
  fetch(
    "http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct/" +
      dynamicContent
  )
    //only one entry in json file (WP REST)

    .then(res => res.json())
    .then(showProducts) //filling DOM with json data
    .then(afterFetch);
}

function showProducts(json) {
   console.log(json.acf);       //shows json file in console, makes development much easier
  let acf = json.acf;
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
  let desc = document.querySelector(".desc");

  let photo = colorpick.imagescolor1.image1;
  console.log(photo);
  let price = json.acf.price; //selecting JSON elements
  let title = json.title.rendered;
  let descJson = acf.description;

  image.style.backgroundImage = "url(" + photo + ")";
  priceTag.innerHTML = price; ///populating HTML with JSON content
  titleTag.innerHTML = title;
  desc.innerHTML = descJson;

  /////color selector
  $(".color").on("click", function() {
    $(".color").css("border", "1px solid gray");
    $(this).css("border", "2px solid black");
    checkColor($(this).attr("id"));
  });

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
  console.log(valueSelected);
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

function afterFetch(json) {
  let addButton = document.getElementById("addProduct-btn");
  let productName = "id" + dynamicContent; //id from url

  addButton.addEventListener("click", function(event) {
    event.preventDefault();

    let e = document.querySelector(".selectQuantity");
    let strUser = e.options[e.selectedIndex].text; ///amount selected in option
    if (localStorage[productName]) {
      //increasing amount of selected product in cart
      localStorage[productName] =
        Number(localStorage[productName]) + Number(strUser); //increasing by amount selected in select-dropdown
    } else {
      localStorage[productName] = strUser;
    }
    //updateCart(localStorage.length); ///dynamic cart update after click, calls global function in home.js
  });
}