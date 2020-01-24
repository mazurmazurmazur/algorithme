var paintings = [];
var years = [];
let a2020;
let a2019;
let a2018;
let a2017;
let a2016;
let a2015;
let a2014;
let a2013;

function getAllPaintings() {
  fetch(
    "http://dashboard.algorithme.co/wp-json/wp/v2/newsitem?_embed&per_page=50"
  )
    .then(res => res.json())
    .then(showPaintings);
}

function showPaintings(data) {
  let list = document.querySelector("#wrapper");
  let template = document.querySelector("#paintingTemplate").content;
  let clone = template.cloneNode(true);
  data.forEach(function(thePainting) {
    let clone = template.cloneNode(true);
    let imgR = clone.querySelector("#rightImg");
    let imgL = clone.querySelector("#leftImg");
    let photo =
      thePainting._embedded["wp:featuredmedia"]["0"].media_details.sizes.full
        .source_url;
    let year = thePainting.acf.year;
    paintings.push(photo);
    years.push(year);
    list.appendChild(clone);
  });
  fillColumns();
}

getAllPaintings();

function fillColumns() {
  for (i = 0; i < paintings.length; i = i + 2) {
    var img = document.createElement("img");
    img.src = paintings[i];
    img.setAttribute("class", "a" + years[i]);
    img.style.padding = Math.random() * 5 + "vw";
    document.querySelector("#leftImg").appendChild(img);
  }

  for (i = 1; i < paintings.length; i = i + 2) {
    var img = document.createElement("img");
    img.src = paintings[i];
    img.setAttribute("class", "a" + years[i]);
    img.style.padding = Math.random() * 5 + "vw";
    document.querySelector("#rightImg").appendChild(img);
  }
  a2020 = document.querySelectorAll(".a2020");
  a2019 = document.querySelectorAll(".a2019");
  a2018 = document.querySelectorAll(".a2018");
  a2017 = document.querySelectorAll(".a2017");
  a2016 = document.querySelectorAll(".a2016");
  a2015 = document.querySelectorAll(".a2015");
  a2014 = document.querySelectorAll(".a2014");
  a2013 = document.querySelectorAll(".a2013");
}

function hideOtherYears(year) {
  for (i = 0; i < a2020.length; i++) {
    a2020[i].style.display = "none";
  }
  for (i = 0; i < a2019.length; i++) {
    a2019[i].style.display = "none";
  }
  for (i = 0; i < a2018.length; i++) {
    a2018[i].style.display = "none";
  }
  for (i = 0; i < a2017.length; i++) {
    a2017[i].style.display = "none";
  }
  for (i = 0; i < a2016.length; i++) {
    a2016[i].style.display = "none";
  }
  for (i = 0; i < a2015.length; i++) {
    a2015[i].style.display = "none";
  }

  for (i = 0; i < a2014.length; i++) {
    a2014[i].style.display = "none";
  }
  for (i = 0; i < a2013.length; i++) {
    a2013[i].style.display = "none";
  }

  for (i = 0; i < year.length; i++) {
    year[i].style.display = "";
  }
}
