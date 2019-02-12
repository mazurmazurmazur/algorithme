/* jslint browser: true*/
/*global $*/

// https://github.com/jasonmoo/t.js
(function() {
  function c(a) {
    this.t = a;
  }
  function l(a, b) {
    for (var e = b.split("."); e.length; ) {
      if (!(e[0] in a)) return !1;
      a = a[e.shift()];
    }
    return a;
  }
  function d(a, b) {
    return a
      .replace(h, function(e, a, i, f, c, h, k, m) {
        var f = l(b, f),
          j = "",
          g;
        if (!f) return "!" == i ? d(c, b) : k ? d(m, b) : "";
        if (!i) return d(h, b);
        if ("@" == i) {
          e = b._key;
          a = b._val;
          for (g in f)
            f.hasOwnProperty(g) &&
              ((b._key = g), (b._val = f[g]), (j += d(c, b)));
          b._key = e;
          b._val = a;
          return j;
        }
      })
      .replace(k, function(a, c, d) {
        return (a = l(b, d)) || 0 === a
          ? "%" == c
            ? new Option(a).innerHTML.replace(/"/g, "&quot;")
            : a
          : "";
      });
  }
  var h = /\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,
    k = /\{\{([=%])(.+?)\}\}/g;
  c.prototype.render = function(a) {
    return d(this.t, a);
  };
  window.t = c;
})();
// end of 't';

Number.prototype.to_$ = function() {
  return parseFloat(this).toFixed(2);
};
String.prototype.strip$ = function() {
  return this.split("$")[1];
};

function getAllProducts() {
  fetch(
    "http://dashboard.algorithme.co/?rest_route=/wp/v2/oxproduct&per_page=100"
    
  )
    .then(res => res.json())
    .then(showProducts)
    .then(startCart)
    .then(app.updateTotals);
}

let app = {
  shipping: 0.0,
  products: [],

  subtotals: null,

  removeProduct: function() {

       "use strict";





 

    var item = $(this).closest(".shopping-cart--list-item");

    item.addClass("closing");
    window.setTimeout(function() {
      item.remove();
      app.updateTotals();
    }, 500); // Timeout for css animation

     //updating localstorage and cart below
 
 let productName = $(this).parent().parent().attr("data-ls"); //find localstorage name

 console.log(productName);
   localStorage.removeItem(productName);
   console.log("removed?");

 


  },

  addProduct: function() {
    "use strict";

    var qtyCtr = $(this).prev(".product-qty"),
      quantity = parseInt(qtyCtr.html(), 10) + 1;

      console.log(quantity);

    app.updateProductSubtotal(this, quantity);

    //updating localstorage and cart below
    let productName = $(this).parent().parent().parent().attr("data-ls"); //find localstorage name


    
      //increasing amount of selected product in cart
      localStorage[productName] =
        Number(localStorage[productName]) + 1; //increasing by amount selected in select-dropdown
    






  },

  subtractProduct: function() {
    "use strict";

    var qtyCtr = $(this).next(".product-qty"),
      num = parseInt(qtyCtr.html(), 10) - 1,
      quantity = num <= 0 ? 0 : num;

    app.updateProductSubtotal(this, quantity);

     //updating localstorage and cart below
     let productName = $(this).parent().parent().parent().attr("data-ls"); //find localstorage name

  
 
     
       //decreasing amount of selected product in cart
       localStorage[productName] =
         Number(localStorage[productName]) - 1; //decreasing by amount selected in select-dropdown
     
  },

  updateProductSubtotal: function(context, quantity) {
    "use strict";

    var ctr = $(context).closest(".product-modifiers"),
      productQtyCtr = ctr.find(".product-qty"),
      productPrice = parseFloat(ctr.data("product-price")),
      subtotalCtr = ctr.find(".product-total-price"),
      subtotalPrice = quantity * productPrice;

    productQtyCtr.html(quantity);
    subtotalCtr.html(subtotalPrice);

    app.updateTotals();
  },

  updateTotals: function() {
    "use strict";

    var products = $(".shopping-cart--list-item"),
      subtotal = 0,
      shipping;
    for (var i = 0; i < products.length; i += 1) {
      subtotal += parseFloat(
        $(products[i])
          .find(".product-total-price")
          .html()
          
      );
    }

    console.log(document.querySelector(".stripe-button"));
    document
      .querySelector(".stripe-button")
      .setAttribute("data-amount", subtotal * 100);

    shipping = subtotal > 0 && subtotal < 100 / 1.0 ? app.shipping : 0;

    $("#subtotalCtr")
      .find(".cart-totals-value")
      .html(subtotal);
    $("#taxesCtr")
      .find(".cart-totals-value")
      // .html((subtotal * 0.0).to_$());
      .html("0");
    $("#totalCtr")
      .find(".cart-totals-value")
      .html(subtotal * 1.0 + shipping);
    $("#shippingCtr")
      .find(".cart-totals-value")
      .html(shipping);
  },

  attachEvents: function() {
    "use strict";

    $(".product-remove").on("click", app.removeProduct);
    $(".product-plus").on("click", app.addProduct);
    $(".product-subtract").on("click", app.subtractProduct);
  },

  setProductImages: function() {
    "use strict";

    var images = $(".product-image"),
      ctr,
      img;

    for (var i = 0; i < images.length; i += 1) {
      (ctr = $(images[i])), (img = ctr.find(".product-image--img"));

      ctr.css("background-image", "url(" + img.attr("src") + ")");
      img.remove();
    }
  },

  renderTemplates: function() {
    "use strict";

    var products = app.products,
      content = [],
      template = new t($("#shopping-cart--list-item-template").html());

    for (var i = 0; i < products.length; i += 1) {
      content[i] = template.render(products[i]);
    }

    $("#shopping-cart--list").html(content.join(""));
  }


};

function showProducts(json) {
  console.log(json);

  for (let i = 0; i < localStorage.length-1; i++) {


let selectedItem = localStorage.key(i);

    let sizeOfProd = selectedItem.substr(0,selectedItem.indexOf(' '));

    let colorId= selectedItem.indexOf("color")+5; ////SELECTING COLOR
    colorId= selectedItem.charAt(colorId);

    if(colorId==" "){
      colorId="imagescolor"+1;
      console.log(colorId + "option1");
    }
    else{
      colorId="imagescolor"+colorId;
      console.log(colorId + "option2");
    }


    let productId = localStorage ///SELECTING ID OF CLOTHING
      .key(i)
      .split(/\s+/)
      .pop(); // split and pop is for removing size and color from id +number
      productId=productId
      .split("id")
      .pop(); //split and pop is for removing "id" from the id number, the string was necessary to sustain the functionality of localstorage
    let productQuantity = localStorage[selectedItem];


  

 
    
    
    
    
    
    
    json.forEach(function(theProduct) {

      // console.log(theProduct.acf.colorpick[colorId].image1);
      if (theProduct.id == productId){
        app.products.push({
          prodLocalStorage: selectedItem,
          prodId: theProduct.id,
          name: theProduct.title.rendered + " " + sizeOfProd,
          price: theProduct.acf.price,
          img: theProduct.acf.colorpick[colorId].image1,
          // size: ,
         
          //desc: theProduct.acf.desc.split(".")[0], ///only the first sentence from description
          quantity: productQuantity,
          "prod-total": productQuantity * theProduct.acf.price
        });}
    });
  }
}

getAllProducts();

function startCart() {
  app.renderTemplates();
  app.setProductImages();
  app.attachEvents();
}
