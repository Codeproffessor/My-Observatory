(function($) { // Begin jQuery
    $(function() { // DOM ready
      // If a link has a dropdown, add sub menu toggle.
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        // Close one dropdown when selecting another
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });
      // Clicking away from dropdown will remove the dropdown class
      $('html').click(function() {
        $('.nav-dropdown').hide();
      });
      // Toggle open and close nav styles on click
      $('#nav-toggle').click(function() {
        $('nav ul').slideToggle();
      });
      // Hamburger to X toggle
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    }); // end DOM ready
  })(jQuery); // end jQuery
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  (function staticStars() {
    var rand,
      stars = [];
    var intViewportWidth = window.innerWidth - 10;
    var intViewportHeight = window.innerHeight - 10;
  
    for (let i = 0; i <= 200; i++) {
      rand = getRandomNumber(0, 3); // for random size of each star. I am also using it for animation duration, which is defined in CSS
  
      stars[i] = document.createElement("div");
      stars[i].id = "star-" + i;
      stars[i].style.width = rand + "px";
      stars[i].style.height = rand + "px";
      stars[i].style.borderRadius = "50%";
      stars[i].style.backgroundColor = "white";
      stars[i].style.position = "absolute";
      stars[i].style.top = Math.random() * intViewportHeight + "px"; // random postion from top
      stars[i].style.left = Math.random() * intViewportWidth + "px"; // random postion from left
      stars[i].style.animation =
        "glow " + rand + 1 + "s linear infinite alternate"; // random animation duration
  
      document.body.appendChild(stars[i]);
    }
  })();
  
  (function fallingStars() {
    var stars = document.createElement("div"); // creating new div with every function run gives smoother animation
    var intViewportWidth = window.innerWidth + 10; // for the div to be out of the screen
    var intViewportHeight = window.innerHeight + 10; // ditto
    var randDuration = getRandomNumber(1, 4); // random animation (falling stars) duration
    var randLength = getRandomNumber(40, 100); // random length of the falling star
    var randPosition = Math.random() * intViewportWidth; // random horizontal location eveytime the function is run
    var motion = 0; // to give motion to animation
    var interval = setInterval(animation, randDuration); // for animation interval. randDuration will give each star a random fall time
  
    stars.id = "falling-star";
    stars.style.width = randLength + "px";
    stars.style.height = "1.5px";
    stars.style.backgroundImage =
      "linear-gradient(to right, white 40%, transparent)";
    stars.style.transform = "rotate(-45deg)";
    stars.style.position = "absolute";
    stars.style.top = "-10px";
    stars.style.right = randPosition + "px";
  
    document.body.appendChild(stars);
  
    function animation() {
      if (motion == intViewportHeight + 500) {
        // to clear the interval if the star has already fallen (covered enough distance to be out of the screen)
        clearInterval(interval);
      } else {
        motion++;
        stars.style.top = motion + "px";
        stars.style.right = randPosition + motion + "px";
      }
    }
  
    setTimeout(fallingStars, 3000); // for this function to run every 3 seconds
  })();
  
  (function groundDIV() {
    var ground = document.createElement("div");
  
    ground.id = "ground";
    ground.style.width = window.innerWidth + 50 + "px";
    ground.style.height = "150px";
    ground.style.backgroundColor = "black";
    ground.style.position = "absolute";
    ground.style.bottom = "0";
    ground.style.left = "0";
    ground.style.zIndex = "200";
    ground.style.clipPath =
      "polygon(0% 69%, 5% 70%, 9% 71%, 12% 72%, 16% 72%, 19% 72%, 23% 70%, 28% 69%, 35% 70%, 42% 72%, 54% 75%, 62% 76%, 69% 76%, 76% 74%, 85% 74%, 92% 74%, 99% 77%, 99% 100%, 0% 100%)";
  
    document.body.appendChild(ground);
  })();
  
  (function telescope() {
    var canvas = document.getElementById("telescope");
    canvas.style.transform = "rotate(25deg)";
    canvas.style.zIndex = "200";
    canvas.style.position = "absolute";
    canvas.style.right = "150px";
    canvas.style.bottom = "10px";
  
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
  
    ctx.beginPath();
  
    ctx.moveTo(45, 15);
    ctx.lineTo(60, 20);
    ctx.lineTo(60, 50);
    ctx.lineTo(45, 55);
    ctx.lineTo(45, 15);
  
    ctx.moveTo(60, 22.5);
    ctx.lineTo(160, 22.5);
    ctx.lineTo(160, 47.5);
    ctx.lineTo(60, 47.5);
  
    ctx.moveTo(160, 30);
    ctx.lineTo(180, 30);
    ctx.lineTo(180, 40);
    ctx.lineTo(160, 40);
  
    ctx.moveTo(180, 30);
    ctx.lineTo(180, 28.75);
    ctx.lineTo(190, 27.5);
    ctx.lineTo(190, 42.5);
    ctx.lineTo(180, 41.25);
    ctx.lineTo(180, 40);
  
    ctx.moveTo(97, 47);
    ctx.lineTo(120, 47);
    ctx.lineTo(120, 67);
    ctx.lineTo(97, 67);
    ctx.lineTo(97, 47);
  
    ctx.moveTo(100, 67);
    ctx.lineTo(95, 200);
    ctx.lineTo(110, 190);
    ctx.lineTo(110, 67);
  
    ctx.moveTo(105, 67);
    ctx.lineTo(180, 140);
    ctx.lineTo(200, 140);
    ctx.lineTo(120, 67);
  
    ctx.moveTo(100, 100);
    ctx.lineTo(145, 100);
    ctx.lineTo(145, 90);
    ctx.lineTo(100, 90);
  
    ctx.fill();
  })();
  
  (function grass() {
    var grass = [];
    var randLength;
    var randRotation;
    var winWidth = window.innerWidth + 10;
  
    for (let i = 0; i <= winWidth; i++) {
      randLength = getRandomNumber(50, 65);
      randRotation = getRandomNumber(-30, 30);
  
      grass[i] = document.createElement("div");
      grass[i].id = "grass-" + i;
      grass[i].style.zIndex = "200";
      grass[i].style.width = "2px";
      grass[i].style.height = randLength + "px";
      grass[i].style.backgroundColor = "black";
      grass[i].style.position = "absolute";
      grass[i].style.left = i + "px";
      grass[i].style.bottom = "0px";
      grass[i].style.transform = "rotate(" + randRotation + "deg)";
  
      document.body.appendChild(grass[i]);
    }
  })();
  
  document.body.style.width = "100%";
  document.body.style.height = "100%";
  document.body.style.overflow = "hidden";
  document.body.style.backgroundImage =
    "linear-gradient(    to bottom, #021948, #265087 40%, #4883be 80%)";

    




      jQuery(document).ready(function(){
          var intro = $('.ka-intro-block'),
              cardsContainer = $('.ka-cards-wrapper'),
              cardsSlider = cardsContainer.children('.ka-slider'),
              singleCardContent = $('.ka-card-content'),
              sliderNav = $('.ka-slider-navigation');
      
          var resizing = false;
          
          //if on desktop - set a width for the cardsSlider element
          setSliderContainer();
          $(window).on('resize', function(){
              //on resize - update cardsSlider width and translate value
              if( !resizing ) {
                  (!window.requestAnimationFrame) ? setSliderContainer() : window.requestAnimationFrame(setSliderContainer);
                  resizing = true;
              }
          });
      
          //show the cards slider if user clicks the show-cards button
          intro.on('click', 'a[data-action="show-cards"]', function(event) {
              event.preventDefault();
              intro.addClass('cards-visible');
              cardsContainer.addClass('cards-visible');
              //animate single card - entrance animation
              setTimeout(function(){
                  showCardPreviw(cardsSlider.children('li').eq(0));
              }, 200);
          });
      
          intro.on('click', function(event) {
              //cards slider is visible - hide slider and show the intro panel
              if( intro.hasClass('cards-visible') && !$(event.target).is('a[data-action="show-cards"]') ) {
                  intro.removeClass('cards-visible');
                  cardsContainer.removeClass('cards-visible');
              }
          });
      
          //select a single card - open card-content panel
          cardsContainer.on('click', '.ka-slider a', function(event) {
              var mq = checkMQ();
              event.preventDefault();
              if( $(this).parent('li').next('li').is('.current') && (mq == 'desktop') ) {
                  prevSides(cardsSlider);
              } else if ( $(this).parent('li').prev('li').prev('li').prev('li').is('.current')  && (mq == 'desktop') ) {
                  nextSides(cardsSlider);
              } else {
                  singleCardContent.addClass('is-visible');
              }
          });
      
          //close single card content
          singleCardContent.on('click', '.close', function(event){
              event.preventDefault();
              singleCardContent.removeClass('is-visible');
          });
      
          //go to next/pre slide - clicking on the next/prev arrow
          sliderNav.on('click', '.next', function(){
              nextSides(cardsSlider);
          });
          sliderNav.on('click', '.prev', function(){
              prevSides(cardsSlider);
          });
      
          //go to next/pre slide - keyboard navigation
          $(document).keyup(function(event){
              var mq = checkMQ();
              if(event.which=='37' &&  intro.hasClass('cards-visible') && !(sliderNav.find('.prev').hasClass('inactive')) && (mq == 'desktop') ) {
                  prevSides(cardsSlider);
              } else if( event.which=='39' &&  intro.hasClass('cards-visible') && !(sliderNav.find('.next').hasClass('inactive')) && (mq == 'desktop') ) {
                  nextSides(cardsSlider);
              } else if(event.which=='27' && singleCardContent.hasClass('is-visible')) {
                  singleCardContent.removeClass('is-visible');
              }
          });
      
          cardsSlider.on('swipeleft', function(){
              var mq = checkMQ();
              if( !(sliderNav.find('.next').hasClass('inactive')) && (mq == 'desktop') ) nextSides(cardsSlider);
          });
      
          cardsSlider.on('swiperight', function(){
              var mq = checkMQ();
              if ( !(sliderNav.find('.prev').hasClass('inactive')) && (mq == 'desktop') ) prevSides(cardsSlider);
          });
      
          function showCardPreviw(card) {
              if(card.length > 0 ) {
                  setTimeout(function(){
                      card.addClass('slides-in');
                      showCardPreviw(card.next());
                  }, 50);
              }
          }
      
          function checkMQ() {
              //check if mobile or desktop device
              return window.getComputedStyle(document.querySelector('.ka-cards-wrapper'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
          }
      
          function setSliderContainer() {
              var mq = checkMQ();
              if(mq == 'desktop') {
                  var	slides = cardsSlider.children('li'),
                      slideWidth = slides.eq(0).width(),
                      marginLeft = Number(cardsSlider.children('li').eq(1).css('margin-left').replace('px', '')),
                      sliderWidth = ( slideWidth + marginLeft )*( slides.length + 1 ) + 'px',
                      slideCurrentIndex = cardsSlider.children('li.current').index();
                  cardsSlider.css('width', sliderWidth);
                  ( slideCurrentIndex != 0 ) && setTranslateValue(cardsSlider, (  slideCurrentIndex * (slideWidth + marginLeft) + 'px'));
              } else {
                  cardsSlider.css('width', '');
                  setTranslateValue(cardsSlider, 0);
              }
              resizing = false;
          }
      
          function nextSides(slider) {
              var actual = slider.children('.current'),
                  index = actual.index(),
                  following = actual.nextAll('li').length,
                  width = actual.width(),
                  marginLeft = Number(slider.children('li').eq(1).css('margin-left').replace('px', ''));
      
              index = (following > 4 ) ? index + 3 : index + following - 2;
              //calculate the translate value of the slider container
              translate = index * (width + marginLeft) + 'px';
      
              slider.addClass('next');
              setTranslateValue(slider, translate);
              slider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                  updateSlider('next', actual, slider, following);
              });
      
              if( $('.no-csstransitions').length > 0 ) updateSlider('next', actual, slider, following);
          }
      
          function prevSides(slider) {
              var actual = slider.children('.previous'),
                  index = actual.index(),
                  width = actual.width(),
                  marginLeft = Number(slider.children('li').eq(1).css('margin-left').replace('px', ''));
      
              translate = index * (width + marginLeft) + 'px';
      
              slider.addClass('prev');
              setTranslateValue(slider, translate);
              slider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                  updateSlider('prev', actual, slider);
              });
      
              if( $('.no-csstransitions').length > 0 ) updateSlider('prev', actual, slider);
          }
      
          function updateSlider(direction, actual, slider, numerFollowing) {
              if( direction == 'next' ) {
                  
                  slider.removeClass('next').find('.previous').removeClass('previous');
                  actual.removeClass('current');
                  if( numerFollowing > 4 ) {
                      actual.addClass('previous').next('li').next('li').next('li').addClass('current');
                  } else if ( numerFollowing == 4 ) {
                      actual.next('li').next('li').addClass('current').prev('li').prev('li').addClass('previous');
                  } else {
                      actual.next('li').addClass('current').end().addClass('previous');
                  }
              } else {
                  
                  slider.removeClass('prev').find('.current').removeClass('current');
                  actual.removeClass('previous').addClass('current');
                  if(actual.prevAll('li').length > 2 ) {
                      actual.prev('li').prev('li').prev('li').addClass('previous');
                  } else {
                      ( !slider.children('li').eq(0).hasClass('current') ) && slider.children('li').eq(0).addClass('previous');
                  }
              }
              
              updateNavigation();
          }
      
          function updateNavigation() {
              //update visibility of next/prev buttons according to the visible slides
              var current = cardsContainer.find('li.current');
              (current.is(':first-child')) ? sliderNav.find('.prev').addClass('inactive') : sliderNav.find('.prev').removeClass('inactive');
              (current.nextAll('li').length < 3 ) ? sliderNav.find('.next').addClass('inactive') : sliderNav.find('.next').removeClass('inactive');
          }
      
          function setTranslateValue(item, translate) {
              item.css({
                  '-moz-transform': 'translateX(-' + translate + ')',
                  '-webkit-transform': 'translateX(-' + translate + ')',
                  '-ms-transform': 'translateX(-' + translate + ')',
                  '-o-transform': 'translateX(-' + translate + ')',
                  'transform': 'translateX(-' + translate + ')',
              });
          }
      });

      
 