"use strict";

// Init draggable
var planet = '.planet'; // Planet element

var holder = '.planet_holder'; // Holder element

var planets = 8;
var correct = 0;
$(planet).draggable({
  revert: true
}); // Init droppable

$(holder).droppable({
  hoverClass: "ui-state-hover",
  drop: function drop(event, ui) {
    var dropped = $(this).data('planet');

    if ($(ui.draggable).data('planet') == dropped) {
      setTimeout(function () {
        $(ui.draggable).append('<div class="tick"><i class="icon ion-checkmark-round"></i></div>');
      }, 500);
      $(ui.draggable).find('img').css('opacity', '.12');
      $(this).find('.planet_answer img').addClass('scale');
      $(this).find('.planet_answer').parent().css('border', 'none');
      $(ui.draggable).next().addClass('answered');
      correct++;
    } else {}

    if (correct == planets) {
      show_modal('winner');
      clearTimeout(timer);
      $('.t').html(time);
    }
  }
});
var timer = 0;

function show_modal(modal) {
  $('.' + modal).show();
  $('.overlay').show();
}

function hide_modal(modal) {
  $('.' + modal).hide();
  $('.overlay').hide();
}

function start_timer() {
  var start = new Date();
  timer = setInterval(function () {
    time = Math.floor((new Date() - start) / 1000) + " seconds";
    $('.timer').html(time);
    console.log(time);
  }, 1000);
} // Show intro modal


$('.st').click(function () {
  start_timer();
});
$(document).ready(function () {
  show_modal('intro');
});
$('.c_modal').click(function () {
  hide_modal('modal');
});
$('.ta').click(function () {
  hide_modal('modal');
  start_timer();
  correct = 0;
  $(planet).css('opacity', '1');
  $('.planet_answer').hide();
  $('.answered').removeClass('answered');
  $('.planet_holder').css('border', '2px dashed rgba(255, 255, 255, 0.22)');
});
var shareUrl = 'https://codepen.io/jcoulterdesign/pen/eJGoOx';

function twShare(url, title, winWidth, winHeight) {
  var winTop = 100;
  var winLeft = 100;
  window.open('https://twitter.com/intent/tweet?text=' + title, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

$('body').on('click', '.tw', function () {
  twShare('https://codepen.io/jcoulterdesign/pen/fe65b4a77c18330f405702ce4205824e', 'I just completed the Planet Quiz on @codepen in ' + time + ', can you beat it? https://bit.ly/20zZ7wq %23codepen %23planetQuiz', 520, 350);
});
$('.fb').click(function () {
  t = time;
  window.open('https://www.facebook.com/sharer/sharer.php?u=https://codepen.io/jcoulterdesign/pen/fe65b4a77c18330f405702ce4205824e&picture=http://www.jamiecoulter.co.uk/Untitled-3.png&title=Planet+quiz+on+Codepen&description=I just completed the Planet Quiz on @codepen in ' + t + ', can you beat it? https://bit.ly/20zZ7wq', 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
});