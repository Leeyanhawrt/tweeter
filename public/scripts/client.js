// //////////////////////////////////////////////
// Escapes text and re-encodes it to prevent XSS
// //////////////////////////////////////////////

const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = () => {
  $.get('/tweets')
      .then((data) => {
        renderTweets(data);
      });
};

const renderTweets = (data) => {
  for (const user in data) {
    const tweet = createTweetElement(data[user]);
    $('#tweets-container').prepend(tweet);
  }
};

const createTweetElement = (tweetData) => {
  const tweetCreation = timeago.format(new Date(tweetData.created_at));
  const tweet =
    (`<article class="tweetSubmission">
        <header class="newTweetHead">
          <div class="leftSideTweetHead">
            <img src=${tweetData.user.avatars} alt="tweeterAvatar">
            <p>${tweetData.user.name}</p>
          </div>
          <p id="handle">${tweetData.user.handle}</p>
        </header>
        <p id="tweet">${escape(tweetData.content.text)}</p>
        <footer class="newTweetFoot">
          <time class="newTweetDate">${tweetCreation}</time>
          <div class="newTweetIcons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);
  return tweet;
};
// ///////////////////////////////////////////////////////////
// Resets the values of all input fields using AJAX.
// Refreshes the content on the page and loads in the new one
// ///////////////////////////////////////////////////////////
const resetPage = () => {
  $('#tweet-text').val('');
  $('#tweets-container').empty();
  loadTweets();
  $('.errorBox').hide();
};

$(document).ready(() => {
  $('.errorBox').hide();
  $('.new-tweet').hide();
  // //////////////////////////////////////////////////////////////
  // POST tweet to tweets endpoint and checks if it meets criteria
  // //////////////////////////////////////////////////////////////
  $('#tweetSubmit').submit((e) => {
    e.preventDefault();
    const data = $('#tweet-text').serialize();

    if (!$('#tweet-text').val()) {
      $('#errorType').html(`Your tweet must consist of at least 1 character`);
      return $('.errorBox').slideDown();
    } else if ($('#tweet-text').val().length > 140) {
      $('#errorType').html(`You used over the maximum of 140 characters`);
      return $('.errorBox').slideDown();
    }
    $.post('/tweets', data, (e) => {
    })
        .then(() => {
          resetPage();
        });
  });

  $('.navTweetBox').click(() => {
    $('.new-tweet').slideToggle('slow', () => {
      $('#tweet-text').focus();
    });
  });

  loadTweets();
});
