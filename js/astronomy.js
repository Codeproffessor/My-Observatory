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
  
  
  var demoButtons;
  
  function start () {
	
	// Add event "click" to "demo buttons"
	demoButtons = document.querySelectorAll ('.js-modify');
	for (var i = 0; i < demoButtons.length; i++) {
	  demoButtons[i].addEventListener ('click', toggleEffect);
	}
	
	// Add event "click" to "save buttons"
	var saveButtons = document.querySelectorAll ('.js-save');
	for (var i = 0; i < saveButtons.length; i++) {
	  saveButtons[i].addEventListener ('click', toggleActive);
	}
	
  }
  
  // Toggle "effect" classes
  function toggleEffect () {
	var target = document.querySelector (this.dataset.target);
		target.dataset.effect = this.dataset.effect;
	
	for (var i= 0; i < demoButtons.length; i++) {
	  demoButtons[i].classList.remove ('active');
	}
	
	toggleActive.call (this);
  }
  
  // Toggle "active" class
  function toggleActive () {
	this.classList.toggle ('active');
  }
  
  // Invoke "start ()" function
  window.addEventListener ('load', start);
  
  'use strict'
  
  $(document).ready(function() {
	  $(".block").mouseover(function(event) {
		  $(this).find(".ph-pic").toggleClass('ph-pic-hover');
		  $(this).find(".ph-pic").attr('style', 'animation: ph-picAnimate .2s ease;');
		  $(this).find(".textBlock").toggleClass('textBlock-hover');	
		  $(this).find(".link").toggleClass('link-hover');
		  $(this).find(".link").mouseover(function(event) {
			  $(this).attr('style', 'color: #fff; text-shadow: 0 0 1px #000;');
		  });
		  $(this).find(".link").mouseout(function(event) {
			  $(this).removeAttr('style');
		  });
  
	  });
  
	  $(".block").mouseout(function(event) {
		  $(this).find(".ph-pic").removeClass('ph-pic-hover');
		  $(this).find(".ph-pic").removeAttr('style');
		  $(this).find(".textBlock").removeClass('textBlock-hover');
		  $(this).find(".link").removeClass('link-hover');
		  $(this).find(".link").removeAttr('color');
	  });
  });