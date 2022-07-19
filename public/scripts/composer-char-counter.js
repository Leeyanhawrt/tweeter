$(document).ready(() => {
  $("form").keyup(function () {
    console.log($(this).children(".characterCounter"))
    let counter = (140 - $(this).children(".characterCounter").val().length)


    let numCounter = $(this).children(".tweetCount").children(".counter").html(counter);
    if (counter < 0) {
      numCounter.addClass("overlimit")
    }

    if (numCounter.hasClass("overlimit") && counter >= 0) {
      numCounter.removeClass("overlimit")
    }
  })
})


