// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// Give the parameter a variable name
let dynamicContent = getParameterByName('cat');
let dynamicGender = getParameterByName('gender');

//getParameterByName is a function that fetches the id from URL
//the id in URL comes from dynamically set "href" in blog.html through blog.js
//the id set in this URL comes from fetched json file in blog.js

let colours = [];
let sizes = [];
let appendOrNot;

function getAllPaintings() {
  fetch(
    'http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct?_embed&per_page=100'
  )
    .then(res => res.json())
    .then(showPaintings)
    .then(resize);
}

function showPaintings(data) {
  let list = document.querySelector('.resource-slider-frame');
  let template = document.querySelector('#paintingTemplate').content;
  let clone = template.cloneNode(true);
  let showAllButton = document.getElementById('show-all-button');

  if (dynamicContent == null) showAllButton.setAttribute('href', 'grid.html');
  else if (dynamicGender != null)
    showAllButton.setAttribute(
      'href',
      'grid.html?cat=' + dynamicContent + '&gender=' + dynamicGender
    );
  else showAllButton.setAttribute('href', 'grid.html?cat=' + dynamicContent);

  //webshop.html?cat=ox-ed&gender=female

  data.forEach(function(thePainting) {
    appendOrNot = false;
    let clone = template.cloneNode(true);

    let parentBody = window.parent.document.body;
    let image = clone.querySelector('.openmodale');
    let priceTag = clone.querySelector('.priceUnderTitle span');
    let titleTag = clone.querySelector('.underTitle');
    let link = clone.querySelector('.linkToProduct');

    let photo = thePainting.acf.colorpick.imagescolor1.image1;

    let price = thePainting.acf.price;
    let title = thePainting.title.rendered;
    let dataId = thePainting.id;
    let category = thePainting.category;
    let sex = thePainting.gender;

    if (dynamicContent === null && dynamicGender === null) {
      appendOrNot = true;
    } else {
      if (Array.isArray(category)) {
        for (let i = 0; i < category.length; i++) {
          if (category[i].toLowerCase() == dynamicContent) {
            appendOrNot = true;
          }
        }
      } else {
        if (category.toLowerCase() == dynamicContent) {
          appendOrNot = true;
        }
      }

      if (dynamicGender !== null && appendOrNot == true) {
        if (Array.isArray(sex)) {
          for (let i = 0; i < sex.length; i++) {
            if (sex[i].toLowerCase() == dynamicGender) {
              appendOrNot = true;
            } else {
              appendOrNot = false;
            }
          }
        } else {
          if (sex.toLowerCase() == dynamicGender) {
            appendOrNot = true;
          } else {
            appendOrNot = false;
          }
        }
      }
    }

    //paintings.push(colours);
    image.setAttribute('src', photo);
    image.setAttribute('data-id', dataId);
    priceTag.innerHTML = price;
    titleTag.innerHTML = title;
    link.setAttribute('href', 'product.html?id=' + dataId);

    if (appendOrNot == true) {
      list.appendChild(clone);
    }
  });
}

getAllPaintings();

function doneResizing() {
  //////MODAL WITH PRODUCT DETAILS///////
  var parentBody = window.parent.document.body;
  let modale = window.parent.document.querySelector('.modale');
  let closemodale = $('.closemodale', parentBody);

  $('.openmodale').click(function() {
    // modale.classList.add("opened");     //opening the modale

    ////filling current modale with appropriate json data BELOW
    currentId = $(this).attr('data-id');
    function fillModale() {
      fetch(
        'http://dashboard.algorithme.co/wp-json/wp/v2/oxproduct/' +
          currentId +
          '?_embed'
      )
        .then(res => res.json())
        .then(showModale);
    }

    function showModale(json) {
      let modaleTitle = modale.querySelector('h2');
      let modaleColorPicker = modale.querySelector('#colorpickerid option');

      let jsonTitle = json.title.rendered;
      let colorPick = json.acf.colorpick;

      modaleColorPicker.setAttribute('value', '#777777');

      modaleTitle.innerHTML = jsonTitle;
    }

    fillModale();
  });

  //////END OF MODAL WITH PRODUCT DETAILS///////

  var totalScroll = $('.resource-slider-frame').scrollLeft();
  var itemWidth = $('.resource-slider-item').width();
  var difference = totalScroll % itemWidth;
  if (difference !== 0) {
    $('.resource-slider-frame').animate(
      {
        scrollLeft: '-=' + difference
      },
      500,
      function() {
        // check arrows
        checkArrows();
      }
    );
  }
}

function checkArrows() {
  var totalWidth =
    $('#resource-slider .resource-slider-item').length *
    $('.resource-slider-item').width();
  var frameWidth = $('.resource-slider-frame').width();
  var itemWidth = $('.resource-slider-item').width();
  var totalScroll = $('.resource-slider-frame').scrollLeft();

  if (totalWidth - frameWidth - totalScroll < itemWidth) {
    $('.next').css('visibility', 'hidden');
  } else {
    $('.next').css('visibility', 'visible');
  }
  if (totalScroll + 10 < itemWidth) {
    $('.prev').css('visibility', 'hidden');
  } else {
    $('.prev').css('visibility', 'visible');
  }
}

$('.arrow').on('click', function() {
  var $this = $(this),
    width = $('.resource-slider-item').width(),
    speed = 500;
  if ($this.hasClass('prev')) {
    $('.resource-slider-frame').animate(
      {
        scrollLeft: '-=' + width
      },
      speed,
      function() {
        // check arrows
        checkArrows();
      }
    );
  } else if ($this.hasClass('next')) {
    $('.resource-slider-frame').animate(
      {
        scrollLeft: '+=' + width
      },
      speed,
      function() {
        // check arrows
        checkArrows();
      }
    );
  }
}); // end on arrow click

$(window).on('load resize', function() {
  checkArrows();
  $('#resource-slider .resource-slider-item').each(function(i) {
    var $this = $(this),
      left = $this.width() * i;
    $this.css({
      left: left
    });
  }); // end each
}); // end window resize/load

var resizeId;
$(window).resize(function() {
  clearTimeout(resizeId);
  resizeId = setTimeout(doneResizing, 500);
});

function resize() {
  window.dispatchEvent(new Event('resize'));
}
