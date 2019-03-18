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

  let dynamicContent = getParameterByName("cat");
let dynamicGender = getParameterByName("gender");
console.log(dynamicContent);
console.log(dynamicGender);
  
  //getParameterByName is a function that fetches the id from URL
  //the id in URL comes from dynamically set "href" in blog.html through blog.js
  //the id set in this URL comes from fetched json file in blog.js
  
  
  
  
  
  
  let colours = [];
  let sizes = [];
  let appendOrNot;
  
  function getAllPaintings() {
    fetch("http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct?_embed&per_page=100")
      .then(res => res.json())
      .then(showPaintings)
      
      
  }
  
  function showPaintings(data) {
      let list = document.querySelector(".flex-container");
      let template = document.getElementById("grid-item-template").content;
      console.log(data);    
  
  
  
      data.forEach(function(thePainting) {
  
        appendOrNot = false;
        let clone = template.cloneNode(true);
  
        let image = clone.querySelector(".grid-item-image");
        let priceTag = clone.querySelector(".grid-item-price span");
        let titleTag = clone.querySelector(".grid-item-title");
        let link = clone.querySelector(".grid-item-link");
       
  
        
        let photo = thePainting.acf.colorpick.imagescolor1.image1;
        
        let price = thePainting.acf.price;
        let title = thePainting.title.rendered;
        let dataId = thePainting.id;
        let category = thePainting.category;
        let sex = thePainting.gender;
  
  if(dynamicContent ===null && dynamicGender===null){appendOrNot=true}
  else{
        if(Array.isArray(category)){
        
        for(let i = 0; i<category.length; i++){
          console.log(category[i].toLowerCase() +" vs "+dynamicContent)
          if(category[i].toLowerCase()==dynamicContent){
            appendOrNot=true;
            console.log("approved");
        }
      }
    }
    else{
      console.log(category.toLowerCase() +" vs "+dynamicContent)
      if(category.toLowerCase()==dynamicContent){
        appendOrNot=true;
        console.log("approved");
  
      }
    }
  
  
  
  if(dynamicGender!== null && appendOrNot==true){
    if(Array.isArray(sex)){
        
      for(let i = 0; i<sex.length; i++){
        console.log(sex[i].toLowerCase() +" vs "+dynamicGender)
        if(sex[i].toLowerCase()==dynamicGender){
          appendOrNot=true;
          console.log("approved");
      }
      else{
        appendOrNot=false;
      }
    }
  }
  else{
    console.log(sex.toLowerCase() +" vs "+dynamicGender)
    if(sex.toLowerCase()==dynamicGender){
      appendOrNot=true;
      console.log("approved");
    }
    else{
      appendOrNot=false;
    }
  }
  }
  }
  
      
              image.setAttribute("src", photo);
              image.setAttribute("data-id", dataId);
              priceTag.innerHTML = price;
              titleTag.innerHTML = title;
              link.setAttribute("href", "product.html?id=" + dataId);
  
              
          if(appendOrNot==true){
              list.appendChild(clone);}
      })
  }
  
  
  getAllPaintings();
  
  
  