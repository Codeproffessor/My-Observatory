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