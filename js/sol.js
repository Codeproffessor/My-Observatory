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
    /*************************CARDS*********************************/
      $(".profile").addClass("pre-enter");
      setTimeout(function(){
          $(".profile").addClass("on-enter");
      }, 500);
      setTimeout(function(){
          $(".profile").removeClass("pre-enter on-enter");
      }, 3000);
  
  
  
  !function(a,b){"use strict";function c(a){a=a||{};for(var b=1;b<arguments.length;b++){var c=arguments[b];if(c)for(var d in c)c.hasOwnProperty(d)&&("object"==typeof c[d]?deepExtend(a[d],c[d]):a[d]=c[d])}return a}function d(d,g){function h(){if(y){r=b.createElement("canvas"),r.className="pg-canvas",r.style.display="block",d.insertBefore(r,d.firstChild),s=r.getContext("2d"),i();for(var c=Math.round(r.width*r.height/g.density),e=0;c>e;e++){var f=new n;f.setStackPos(e),z.push(f)}a.addEventListener("resize",function(){k()},!1),b.addEventListener("mousemove",function(a){A=a.pageX,B=a.pageY},!1),D&&!C&&a.addEventListener("deviceorientation",function(){F=Math.min(Math.max(-event.beta,-30),30),E=Math.min(Math.max(-event.gamma,-30),30)},!0),j(),q("onInit")}}function i(){r.width=d.offsetWidth,r.height=d.offsetHeight,s.fillStyle=g.dotColor,s.strokeStyle=g.lineColor,s.lineWidth=g.lineWidth}function j(){if(y){u=a.innerWidth,v=a.innerHeight,s.clearRect(0,0,r.width,r.height);for(var b=0;b<z.length;b++)z[b].updatePosition();for(var b=0;b<z.length;b++)z[b].draw();G||(t=requestAnimationFrame(j))}}function k(){i();for(var a=d.offsetWidth,b=d.offsetHeight,c=z.length-1;c>=0;c--)(z[c].position.x>a||z[c].position.y>b)&&z.splice(c,1);var e=Math.round(r.width*r.height/g.density);if(e>z.length)for(;e>z.length;){var f=new n;z.push(f)}else e<z.length&&z.splice(e);for(c=z.length-1;c>=0;c--)z[c].setStackPos(c)}function l(){G=!0}function m(){G=!1,j()}function n(){switch(this.stackPos,this.active=!0,this.layer=Math.ceil(3*Math.random()),this.parallaxOffsetX=0,this.parallaxOffsetY=0,this.position={x:Math.ceil(Math.random()*r.width),y:Math.ceil(Math.random()*r.height)},this.speed={},g.directionX){case"left":this.speed.x=+(-g.maxSpeedX+Math.random()*g.maxSpeedX-g.minSpeedX).toFixed(2);break;case"right":this.speed.x=+(Math.random()*g.maxSpeedX+g.minSpeedX).toFixed(2);break;default:this.speed.x=+(-g.maxSpeedX/2+Math.random()*g.maxSpeedX).toFixed(2),this.speed.x+=this.speed.x>0?g.minSpeedX:-g.minSpeedX}switch(g.directionY){case"up":this.speed.y=+(-g.maxSpeedY+Math.random()*g.maxSpeedY-g.minSpeedY).toFixed(2);break;case"down":this.speed.y=+(Math.random()*g.maxSpeedY+g.minSpeedY).toFixed(2);break;default:this.speed.y=+(-g.maxSpeedY/2+Math.random()*g.maxSpeedY).toFixed(2),this.speed.x+=this.speed.y>0?g.minSpeedY:-g.minSpeedY}}function o(a,b){return b?void(g[a]=b):g[a]}function p(){console.log("destroy"),r.parentNode.removeChild(r),q("onDestroy"),f&&f(d).removeData("plugin_"+e)}function q(a){void 0!==g[a]&&g[a].call(d)}var r,s,t,u,v,w,x,y=!!b.createElement("canvas").getContext,z=[],A=0,B=0,C=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),D=!!a.DeviceOrientationEvent,E=0,F=0,G=!1;return g=c({},a[e].defaults,g),n.prototype.draw=function(){s.beginPath(),s.arc(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY,g.particleRadius/2,0,2*Math.PI,!0),s.closePath(),s.fill(),s.beginPath();for(var a=z.length-1;a>this.stackPos;a--){var b=z[a],c=this.position.x-b.position.x,d=this.position.y-b.position.y,e=Math.sqrt(c*c+d*d).toFixed(2);e<g.proximity&&(s.moveTo(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY),g.curvedLines?s.quadraticCurveTo(Math.max(b.position.x,b.position.x),Math.min(b.position.y,b.position.y),b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY):s.lineTo(b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY))}s.stroke(),s.closePath()},n.prototype.updatePosition=function(){if(g.parallax){if(D&&!C){var a=(u-0)/60;w=(E- -30)*a+0;var b=(v-0)/60;x=(F- -30)*b+0}else w=A,x=B;this.parallaxTargX=(w-u/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetX+=(this.parallaxTargX-this.parallaxOffsetX)/10,this.parallaxTargY=(x-v/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetY+=(this.parallaxTargY-this.parallaxOffsetY)/10}var c=d.offsetWidth,e=d.offsetHeight;switch(g.directionX){case"left":this.position.x+this.speed.x+this.parallaxOffsetX<0&&(this.position.x=c-this.parallaxOffsetX);break;case"right":this.position.x+this.speed.x+this.parallaxOffsetX>c&&(this.position.x=0-this.parallaxOffsetX);break;default:(this.position.x+this.speed.x+this.parallaxOffsetX>c||this.position.x+this.speed.x+this.parallaxOffsetX<0)&&(this.speed.x=-this.speed.x)}switch(g.directionY){case"up":this.position.y+this.speed.y+this.parallaxOffsetY<0&&(this.position.y=e-this.parallaxOffsetY);break;case"down":this.position.y+this.speed.y+this.parallaxOffsetY>e&&(this.position.y=0-this.parallaxOffsetY);break;default:(this.position.y+this.speed.y+this.parallaxOffsetY>e||this.position.y+this.speed.y+this.parallaxOffsetY<0)&&(this.speed.y=-this.speed.y)}this.position.x+=this.speed.x,this.position.y+=this.speed.y},n.prototype.setStackPos=function(a){this.stackPos=a},h(),{option:o,destroy:p,start:m,pause:l}}var e="particleground",f=a.jQuery;a[e]=function(a,b){return new d(a,b)},a[e].defaults={minSpeedX:.1,maxSpeedX:.7,minSpeedY:.1,maxSpeedY:.7,directionX:"center",directionY:"center",density:1e4,dotColor:"#666666",lineColor:"#666666",particleRadius:7,lineWidth:1,curvedLines:!1,proximity:100,parallax:!0,parallaxMultiplier:5,onInit:function(){},onDestroy:function(){}},f&&(f.fn[e]=function(a){if("string"==typeof arguments[0]){var b,c=arguments[0],g=Array.prototype.slice.call(arguments,1);return this.each(function(){f.data(this,"plugin_"+e)&&"function"==typeof f.data(this,"plugin_"+e)[c]&&(b=f.data(this,"plugin_"+e)[c].apply(this,g))}),void 0!==b?b:this}return"object"!=typeof a&&a?void 0:this.each(function(){f.data(this,"plugin_"+e)||f.data(this,"plugin_"+e,new d(this,a))})})}(window,document),/**
  * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  * @license: MIT license
  */
  function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();
  
  
  particleground(document.getElementById('particles-foreground'), {
   dotColor: 'rgba(255, 255, 255, 1)',
   lineColor: 'rgba(255, 255, 255, 0.05)',
   minSpeedX: 0.3,
   maxSpeedX: 0.6,
   minSpeedY: 0.3,
   maxSpeedY: 0.6,
   density: 50000, // One particle every n pixels
   curvedLines: false,
   proximity: 250, // How close two dots need to be before they join
   parallaxMultiplier: 10, // Lower the number is more extreme parallax
   particleRadius: 4, // Dot size
  });
  
  particleground(document.getElementById('particles-background'), {
   dotColor: 'rgba(255, 255, 255, 0.5)',
   lineColor: 'rgba(255, 255, 255, 0.05)',
   minSpeedX: 0.075,
   maxSpeedX: 0.15,
   minSpeedY: 0.075,
   maxSpeedY: 0.15,
   density: 30000, // One particle every n pixels
   curvedLines: false,
   proximity: 20, // How close two dots need to be before they join
   parallaxMultiplier: 20, // Lower the number is more extreme parallax
   particleRadius: 2, // Dot size
  });
  