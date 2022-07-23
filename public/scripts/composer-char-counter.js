$(document).ready(() => {
  // ///////////////////////////////////////////////////////
  // Checks # of characters typed changes class if over 140
  // ///////////////////////////////////////////////////////

  $('form').keydown(function() {
    const counter = (140 - $(this).children('.characterCounter').val().length);


    const numCounter = $(this).children('.tweetCount').children('.counter').html(counter);
    if (counter < 0) {
      numCounter.addClass('overlimit');
    }

    if (numCounter.hasClass('overlimit') && counter >= 0) {
      numCounter.removeClass('overlimit');
    }
  });

  // /////////////////////////////////////////////
  // Fades out if user has scrolled down the page
  // /////////////////////////////////////////////

  $(window).scroll(() => {
    if ($(this).scrollTop() > 20) {
      $('#myBtn').fadeIn();
    } else {
      $('#myBtn').fadeOut();
    }
  });

  // ////////////////////////////////
  // Brings user back to top of page
  // ////////////////////////////////
  $('#myBtn').click(() => {
    $('html, body').animate({scrollTop: 0}, 1500);
  });
});

