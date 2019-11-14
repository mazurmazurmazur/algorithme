var x = window.matchMedia('(min-width: 900px)');

/**NAVIGATION MOBILE */
/* Open */
function openMobileNav() {
  document.getElementById('myNav').style.height = '100%';
  $('.closebtn').css('position', 'fixed');
}

/* Close */
function closeMobileNav() {
  document.getElementById('myNav').style.height = '0%';
  $('.closebtn').css('position', 'absolute');
}

function showCategories() {
  $('.mainMobileMenu').css('display', 'none');
  $('.categoriesMobileMenu').css('display', 'block');
  $('.categoriesMobileMenu span').css('display', 'block');
}

function showMainMenu() {
  $('.mainMobileMenu').css('display', 'block');
  $('.categoriesMobileMenu').css('display', 'none');
  $('.categoriesMobileMenu span').css('display', 'none');
}

/**END NAVIGATION MOBILE */

/** submenus hide/show **/

let aOX = $('#aOX');
let aOXED = $('#aOXED');
let aOXs = $('#aOX span');
let aOXEDs = $('#aOXED span');

aOX.on('click  touchstart ', function() {
  $(this)
    .find('span')
    .css({ background: 'black', color: 'white' });
  $(this)
    .next()
    .slideDown();
  aOXED.next().slideUp();
  aOXEDs.css({ background: 'white', color: 'black' });
});

aOXED.on('click  touchstart ', function() {
  $(this)
    .find('span')
    .css({ background: 'black', color: 'white' });
  $(this)
    .next()
    .slideDown();
  aOX.next().slideUp();
  aOXs.css({ background: 'white', color: 'black' });
});

/** submenus hide/show  END**/

$('#logoContainerDesktop').on('click  touchstart ', function() {
  window.location = 'mainShop.html';
});

$('#logoContainerMobile').on('click  touchstart ', function() {
  window.location = 'mainShop.html';
});

function animateMainContent() {
  console.log(document.getElementById('mainContent'));
  document.getElementById('mainContent').children[0].style.transition =
    'ease-in-out 1.5s';
}

//animateMainContent();

function defer(method) {
  if (window.jQuery) method();
  else
    setTimeout(function() {
      defer(method);
    }, 50);
}
defer(function() {
  (function($) {
    function doneResizing() {
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
      if (totalScroll < itemWidth) {
        $('.prev').css('visibility', 'hidden');
      } else {
        $('.prev').css('visibility', 'visible');
      }
    }

    $('.arrow').on('click touchstart', function() {
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
  })(jQuery); // end function
});

//////NEWSLETTER

let newsletterContainer = document.getElementById('newsletterContainer');
let overlayMain = document.getElementById('overlayMain');

$(document).ready(function() {
  if (x.matches) {
    //FUNCTION THAT SHOWS NEWSLETTER AUTOMATICALLY
    setTimeout(fnShowPopup, 5000);
  }

  document.addEventListener('keyup', function(event) {
    if (event.defaultPrevented) {
      return;
    }

    var key = event.key || event.keyCode;

    if (
      key === 'Escape' ||
      key === 'Esc' ||
      (key === 27 && newsletterContainer.classList.contains('NLActive'))
    ) {
      closeNewsletter();
    }
  });
});
function fnShowPopup() {
  newsletterContainer.style.display = 'block';
  newsletterContainer.style.zIndex = 120;
  newsletterContainer.classList.add('NLActive');
  overlayMain.style.backgroundColor = 'rgba(0,0,0,0.4)';
  overlayMain.style.zIndex = 110;
  overlayMain.style.display = 'block';

  //code to show popup
}

function closeNewsletter() {
  newsletterContainer.style.display = 'none';
  overlayMain.style.backgroundColor = 'transparent';
  overlayMain.style.zIndex = -10;
  newsletterContainer.classList.remove('NLActive');
}

///////VALIDATION IF EMAIL ADDRESS IS CORRECT PLUS INFO TO USER

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validate() {
  let $result = $('#result');
  let email = $('#email').val();
  let form = $('form#newsletter-form');
  $result.text('');

  if (validateEmail(email)) {
    sendToSheet();
    $result.text('Thank you for subscribing!');
    form
      .closest('form')
      .find('input[type=email], textarea')
      .val('');
  } else {
    $result.text(email + ' is not valid email.');
  }
  return false;
}

$('#submitNewsletter').bind('click touchstart', validate);

///////END VALIDATION IF EMAIL ADDRESS IS CORRECT PLUS INFO TO USER

////SEND NEWSLETTER DATA TO GOOGLE SPREADSHEET FUNCTION BELOW

let $form = $('form#newsletter-form'),
  url =
    'https://script.google.com/macros/s/AKfycbzV2oQPNSKIpLlVhKxxY5LeKk6LfzDJWh8w4J3CyCdQ6k-SVDFb/exec';

function sendToSheet() {
  console.log($form);
  let jqxhr = $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    data: $form.serializeObject()
  });
  console.log(jqxhr);
}

////END OF NEWSLETTER DATA

////END OF NEWSLETTER

///MIGRATED FROM LOCAL SCRIPT IN MAINSHOP.HTML BELOW

var x = window.matchMedia('(min-width: 900px)');

let iframe = document.getElementById('mainContent');
let innerDoc = iframe.contentDocument;

function setWebshopCustom() {
  if (!x.matches) {
    $('#mainContent').css('top', '15vh');
    $('.newsGallery').css({ left: '0', width: '100vw', height: '80vh' });
  } else {
    $('#mainContent').css('top', '15vh');
    $('.newsGallery').css({ left: '10vw', width: '80vw' });
  }
}
function setCampaignCustom() {
  if (x.matches) {
    $('#mainContent').css('top', '0vh');
    $('.newsGallery').css({
      left: '0',
      width: '100vw',
      height: '100vh',
      overflow: 'scroll'
    });
  } else {
    $('#mainContent').css('top', '7vh');
    $('.newsGallery').css({
      width: '100vw',
      height: '100vh'
    });
  }
}

function setRegularSize() {
  if (x.matches) {
    $('#mainContent').css('top', '15vh');
    $('.newsGallery').css({ left: '0', width: '100vw', height: '80vh' });
  } else {
    $('#mainContent').css('top', '15vh');
    $('.newsGallery').css({ left: '0', width: '100vw', height: '80vh' });
  }
}

//FUNCTION TAKING CARE OF MOVING OUT PREVIOUS MAIN CONTENT IN ORDER TO REPLACE IT WITH NEW ONE

function get_action() {
  let searchValue = document.getElementById('search').value;
  load_home('grid.html?search=' + searchValue, 1, 'webshop');
}

function load_home(element_flowing_in, startBottomOrTop, customSize) {
  //bottom is 0, top is 1

  fillBreadcrumbs(element_flowing_in, element_flowing_in);

  let mainContent = document.getElementById('mainContent');
  let mainContentCurrentChild = mainContent.children[0]; //this is the current element in the main content area
  mainContentCurrentChild.style.transition = 'ease-in-out 1s'; // adding smooth animation to every new element

  if (startBottomOrTop == 0)
    mainContentCurrentChild.style.transform = 'translateY(-120vh)';
  else mainContentCurrentChild.style.transform = 'translateY(100vh)';

  setTimeout(function() {
    mainContent.removeChild(mainContentCurrentChild);
  }, 500);

  let newObject = document.createElement('iframe'); ///////
  $(newObject).attr('type', 'text/html'); //////
  $(newObject).attr('src', element_flowing_in); //////TAKES CARE OF IMPORTING NEW HTML FILE INTO MAIN SPACE
  newObject.classList.add('newsGallery'); //////

  mainContent.appendChild(newObject); //////

  let flowing_in_content = mainContent.children[1];

  if (startBottomOrTop == 0)
    flowing_in_content.style.transform = 'translateY(100vh)';
  else flowing_in_content.style.transform = 'translateY(-100vh)';

  flowing_in_content.style.display = 'block'; ///showing and placing the new item in the main space
  flowing_in_content.style.transform = 'translateY(0)'; ////

  setTimeout(function() {
    if (customSize == 'webshop') {
      setWebshopCustom();
    } else if (customSize == 'campaign') {
      setCampaignCustom();
    } else {
      setRegularSize();
    }
  }, 300);
}

load_home('webshop.html', 1, 'webshop');

//END OF FUNCTION TAKING CARE OF MOVING OUT PREVIOUS MAIN CONTENT IN ORDER TO REPLACE IT WITH NEW ONE

//END OF MIGRATION FROM MAINSHOP.HTML

///BREADCRUMBS:

// Parse the URL parameter
function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('id');

function fillBreadcrumbs(currentLink) {
  let breadcrumbsLink = document.getElementById('breadcrumbs-link');
  if (currentLink) {
    let paraCat = document.createElement('a');
    let paraGen = document.createElement('a');
    let paraProd = document.createElement('a');

    paraCat.classList.add('BCLink');
    paraGen.classList.add('BCLink');
    paraProd.classList.add('BCLink');

    let s = currentLink.substring(0, currentLink.indexOf('.'));
    let link1 = currentLink.substring(0, currentLink.indexOf('?'));
    let link2 = currentLink.substring(0, currentLink.indexOf('&'));
    console.log('LINK2 ' + link2);

    breadcrumbsLink.innerHTML = s;
    breadcrumbsLink.setAttribute('href', currentLink);

    let categoryBC = getParameterByName('cat', currentLink);
    let genderBC = getParameterByName('gender', currentLink);

    if (categoryBC) {
      paraCat.innerHTML = ' > ' + categoryBC;
      breadcrumbsLink.appendChild(paraCat);
      if (genderBC) {
        paraGen.innerHTML = ' > ' + genderBC;
        breadcrumbsLink.appendChild(paraGen);
      }
    }
  }
}

///END OF BREADCRUMBS

var fixed = document.getElementsByTagName('BODY')[0];
console.log(fixed);

fixed.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault();
  },
  false
);
