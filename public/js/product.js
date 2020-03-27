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

const allSizes = ["XS", "S", "M", "L", "XL"];

let desc;
let descImage;
let descButtonOverview;
let descButtonDetails;
let descButtonCare;
let descButtonFit;

let descJson;
let descDetailsTextJson;
let descDetailsImageJson;
let descCareJson;
let descFitTextJson;
let descFitImageJson;

let zoomImageLink;

let select = document.querySelector(".selectSize");
let selectAmount = document.querySelector(".selectQuantity");

function getAllProducts() {
  fetch(
    "https://dashboard.algorithme.co/wp-json/wp/v2/oxproduct/" + dynamicContent
  )
    //only one entry in json file (WP REST)

    .then(res => res.json())
    .then(showProducts) //filling DOM with json data
    .then(afterFetch)
    .then(activateZoom);
  // .then(initiateColorPicker);
}

function showProducts(json) {
  let acf = json.acf;
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
  if (acf.description.details.detailsimage.sizes)
    descDetailsImageJson =
      acf.description.details.detailsimage.sizes.medium_large;
  descCareJson = acf.description.care;
  descFitTextJson = acf.description.fit.fittext;
  if (acf.description.fit.fitimage.sizes)
    descFitImageJson = acf.description.fit.fitimage.sizes.medium_large;

  image.style.backgroundImage = "url(" + photo + ")";
  priceTag.innerHTML = price; ///populating HTML with JSON content
  titleTag.innerHTML = title;
  desc.innerHTML = descJson;

  zoomImageLink = photo; ////link for the jquery-zoom plugin

  ///product det buttons changing description content
  descButtonOverview.addEventListener("click", function() {
    fillDesc("overview");
  });
  descButtonCare.addEventListener("click", function() {
    fillDesc("care");
  });
  descButtonDetails.addEventListener("click", function() {
    fillDesc("details");
  });
  descButtonFit.addEventListener("click", function() {
    fillDesc("fit");
  });

  ///

  /////color selector
  $(".color").on("click touchstart", function() {
    $(".color").css("border", "1px solid black");
    $("#color-label").css("border", "1px solid black");
    if ($(".color").hasClass("active")) {
      $(".color").removeClass("active");
    }
    $(this).css("border", "2px solid black");
    $(this).addClass("active");
    $("#color-label").removeClass("activeCustom");
    $("#customColorDiv").css("display", "none");
    checkColor($(this).attr("id"));
  });
  $("#color").trigger("click");

  function setMainImage(url) {
    image.style.opacity = 0;
    image.style.backgroundImage = "url(" + url + ")";
    image.style.opacity = 1;
    zoomImageLink = url;
    activateZoom();
  }

  function checkColor(colorName) {
    let photoId = colorName.split("r").pop();
    let imagesColor = "imagescolor" + photoId;
    if (photoId != "") {
      setMainImage(colorpick[imagesColor].image1);
      createDotsGallery(photoId);
    } else {
      setMainImage(colorpick.imagescolor1.image1);
      createDotsGallery(1);
    }

    ///ABOVE SETS EACH FIRST PHOTO OF EACH COLOR AS A MAIN WHEN CLICKED ON DESIRED COLOR SQUARE
  }

  function createDotsGallery(i) {
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

  function populateSizes(i) {
    ///checking if custom color is not selected, because custom colors always have all sizes and quantity up to 5.
    $(".selectSize").empty();

    // if (!$("#color-label").hasClass("activeCustom")) {
    //populte sizes in product
    currentProductNum = i;
    let sizeNumber = "size" + i;
    let sizes = colorpick[sizeNumber];
    let j = 0;
    for (key in sizes) {
      console.log(sizes[key]);

      if (sizes[key] > 0) {
        j = j + sizes[key];
        let newOption = document.createElement("option");
        newOption.id = "option" + key;
        newOption.innerHTML = key.toUpperCase();
        select.appendChild(newOption);
      }
    }

    if (j == 0) {
      let newOptionOut = document.createElement("option");
      newOptionOut.id = "option1";
      newOptionOut.innerHTML = "Out of stock";
      select.appendChild(newOptionOut);
    }
    // } else {
    //   let newOptionOut = document.createElement("option");
    //   newOptionOut.id = "option1";
    //   newOptionOut.innerHTML = "Out of stock";
    //   select.appendChild(newOptionOut);

    // } else {
    //   for (let i = 0; i < allSizes.length; i++) {
    //     let newOption = document.createElement("option");
    //     newOption.id = "option" + i;
    //     newOption.innerHTML = allSizes[i];
    //     select.appendChild(newOption);
    //   }
    // }
  }

  $(".selectSize").on("change", function(e) {
    $(".selectQuantity").empty();

    let valueSelected = this.value;
    let sizeNumber = "size" + currentProductNum;
    let sizes = colorpick[sizeNumber];

    for (key in sizes) {
      // console.log("key: ");
      // console.log(key);
      // console.log("sizes: ");
      // console.log(sizes);
      console.log(
        "keytuc: " + key.toUpperCase() + " valueselected " + valueSelected
      );
      if (key.toUpperCase() == valueSelected) {
        console.log("valueSelected:");
        console.log(valueSelected);

        console.log("sizes[key]: " + sizes[key]);
        if (sizes[key] && sizes[key] > 0) {
          for (let i = 0; i < sizes[key]; i++) {
            console.log("sizes[key]: ");
            console.log(sizes[key]);
            let newOption = document.createElement("option");
            newOption.id = "option" + i;
            newOption.innerHTML = i + 1;
            selectAmount.appendChild(newOption);
          }
        } else {
          let newOptionOut = document.createElement("option");
          newOptionOut.id = "option1";
          newOptionOut.innerHTML = "Out of stock";
          selectAmount.appendChild(newOptionOut);
        }
      }
    }
    // } else {
    //   for (let i = 1; i < 6; i++) {
    //     let newOption = document.createElement("option");
    //     newOption.id = "option" + i;
    //     newOption.innerHTML = i;
    //     selectAmount.appendChild(newOption);
    //   }
    // }
  });

  checkColor("color1");
}

getAllProducts();

function fillDesc(descElement) {
  desc.innerHTML = "";
  descImage.setAttribute("src", "");
  if (descElement == "overview" && descJson != null) {
    desc.innerHTML = descJson;
  } else if (
    descElement == "details" &&
    descDetailsImageJson != null &&
    descDetailsTextJson != null
  ) {
    desc.innerHTML = descDetailsTextJson;
    descImage.setAttribute("src", descDetailsImageJson);
  } else if (descElement == "care" && descCareJson != null) {
    desc.innerHTML = descCareJson;
  } else if (
    descElement == "fit" &&
    descFitImageJson != null &&
    descFitTextJson != null
  ) {
    desc.innerHTML = descFitTextJson;
    descImage.setAttribute("src", descFitImageJson);
  }
}

function returnColor(id) {
  let photoId = colorName.split("r").pop();
  let imagesColor = "imagescolor" + photoId;
  if (photoId != "") {
    return photoId;
  }
}

function afterFetch(json) {
  let addButton = document.getElementById("addProduct-btn");
  let productName = "id" + dynamicContent; //id from url
  let selectColor = $(".select-color");

  selectColor.append(
    '<label for="color-input" id="color-label"><p id="color-plus">+</p></label><input type="checkbox" id="color-input"></input><div id="color-picker"><div id="color-block"></div></div>'
  );

  addButton.addEventListener("click", function(event) {
    event.preventDefault();

    let activeColor;
    // let customColor;

    if ($(".active") && $(".active").attr("id")) {
      activeColor = $(".active").attr("id");
    } else {
      activeColor = "color1";
    }

    if (!$("#color-label").hasClass("activeCustom")) {
      let newSpan = document.createElement("span");
      newSpan.className = "customColorCartText";
      newSpan.style.background = document.getElementById(
        "color-label"
      ).style.backgroundColor;
    }

    let sQ = document.querySelector(".selectQuantity");
    let sizeSelector = document.querySelector(".selectSize");
    let strUser = sQ.options[sQ.selectedIndex].text; ///amount selected in option
    let sizeSelected = sizeSelector.options[sizeSelector.selectedIndex].text; ///size selected in option
    let cart = window.parent.document.querySelector("#cart");

    if (
      localStorage[sizeSelected + " " + activeColor + " " + productName] &&
      sizeSelected != "Out of stock"
    ) {
      //increasing amount of selected product in cart
      localStorage[sizeSelected + " " + activeColor + " " + productName] =
        Number(
          localStorage[sizeSelected + " " + activeColor + " " + productName]
        ) + Number(strUser); //increasing by amount selected in select-dropdown
      addProdAnimation(cart); //animate cart
    } else if (sizeSelected == "Out of stock") {
      alert("Out of stock!");
    } else {
      localStorage[
        sizeSelected + " " + activeColor + " " + productName
      ] = strUser;
      addProdAnimation(cart); //animate cart
    }
    updateCart(localStorage.length); ///dynamic cart update after click, calls global function in home.js
  });

  // initiateColorPicker(json);
}

function activateZoom() {
  $(document).ready(function() {
    $(".bg").zoom({ url: zoomImageLink });
  });
}

function addProdAnimation(ele) {
  console.log(ele);
  ele.classList.add("cart-added");
  setTimeout(() => {
    ele.classList.remove("cart-added");
  }, 3500);
}

// function addProdAnimation(ele) {
//   console.log(ele);
//   ele.classList.add("cart-added");
//   setTimeout(() => {
//     ele.classList.remove("cart-added");
//   }, 3500);

// const div = document.createElement("div");
// div.style.width = "2px";
// div.style.height = "2px";
// div.style.background = "black";
// div.style.border = "1px solid black";
// div.style.borderRadius = "2px";
// div.style.position = "absolute";
// div.style.transition = "all ease-out 1s;"
// document.querySelector(".selectColor").appendChild(div);
// }
// function initiateColorPicker() {
//   let acf = jsonOut.acf;
//   let customColors = acf.custom_colors;
//   let colorBlock = document.getElementById("color-block");
//   let colorLabel = document.getElementById("color-label");
//   let colorInput = document.getElementById("color-input");
//   let colorPicker = document.getElementById("color-picker");

// for (key in customColors) {
//   let cc = customColors[key].color;
//   let cci = customColors[key].image;

//   //looping through all keys in this product(acf= advanced custom fields)
//   if (cc != "#empty" || cci != false) {
//     ////filling the available colors from CMS
//     let newDiv = document.createElement("div");
//     newDiv.id = key;
//     newDiv.className = "color";
//     newDiv.style.background = cc;
//     if (cci != false) {
//       newDiv.style.backgroundImage = "url(" + cci + ")";
//     }
//     newDiv.addEventListener("click", function() {
//       colorInput.checked = false; ///hides color palette when chosen color
//       if (cci == false) {
//         $(".color").css("border", "1px solid black");
//         $("#addProduct-btn").html(
//           'Add To Cart <span id="deliveryWarn"> (Extended Delivery Time)</span>'
//         );
//         colorLabel.style.borderWidth = "2px";
//         colorLabel.style.backgroundImage = "none";
//         colorLabel.style.backgroundColor = cc;

//         if ($(".color").hasClass("active")) {
//           $(".color").removeClass("active");
//         }
//         $("#color-label").addClass("activeCustom");

//         $("#customColorDiv").css("display", "block");
//         $("#customColorDiv").css("background-color", cc);
//       } else {
//         colorLabel.style.backgroundImage = "url(" + cci + ")";
//       }

//       //below emptying the picker for sizes before populating it all over
//       $(".selectSize").empty();

//       for (let i = 0; i < allSizes.length; i++) {
//         let newOption = document.createElement("option");
//         newOption.id = "option" + i;
//         newOption.innerHTML = allSizes[i];
//         select.appendChild(newOption);
//       }

//       //below emptying the picker for amount before populating it all over

//       $(".selectQuantity").empty();

//       for (let i = 1; i < 6; i++) {
//         let newOption = document.createElement("option");
//         newOption.id = "option" + i;
//         newOption.innerHTML = i;
//         selectAmount.appendChild(newOption);
//       }
//     });
//     colorBlock.appendChild(newDiv);
//   }
// }

// let cp = $("#color-plus");

// window.addEventListener("mouseup", function(event) {
//   if (
//     event.target != colorPicker ||
//     event.target != colorLabel ||
//     event.target != colorInput ||
//     event.target != cp
//   ) {
//     colorInput.checked = false; ///hides color palette when chosen color
//   }
// });
// }
