$(document).ready(function() {

  //Date Format
  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  //Sanitizer for textarea
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(db) {
    let formatedDate = timeSince(db.created_at);
    $('#tweets-container').prepend(`
        <article class="tweet">
          <header>
            <img src="${db.user.avatars.small}">
            <h2>${db.user.name}</h2>
            <span class="email-hint">${db.user.handle}</span>
          </header>
          <div class="main-tweet">
            <p>${escape(db.content.text)}</p>
          </div>
          <footer>
            <p>${formatedDate}</p>
            <i class="fas fa-flag"></i>
            <i class="fas fa-recycle"></i>
            <i class="fas fa-heart"></i>
          </footer>
        </article>
    `);
  }

  //For each tweet in DB create HTML
  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      createTweetElement(tweet);
    });
  }

  //Load all created tweets on page
  function loadTweets() {
    $('#tweets-container').empty();
    $.ajax('/tweets', { method: 'GET'})
    .then(function(tweet) {
      renderTweets(tweet);
    });
  }

  //AJAX post new tweet
  function ajaxPOST() {
    const $form = $('.container form');
    const $error1 = $('#errorNoChar');
    const $error2 = $('#errorMoreChar');
      $form.on('submit', function(event) {
        $error1.hide();
        $error2.hide();
        event.preventDefault();
        let strData = $(this).serialize();
        if (strData.length <= 5) {
          return $error1.slideToggle(400);
        }
        if (strData.length > 145) {
          return $error2.slideToggle(400);
        }
        $.ajax('/tweets', { data: strData, method: 'POST' })
          .then(function() {
            loadTweets();
            $('.new-tweet textarea').val('');
          });
      });
  }

  //Setup page
  loadTweets();
  ajaxPOST();

  //Form Animation
  $('#nav-bar .btn').on('click', function() {
    $('.new-tweet').slideToggle(400, function() {
      $('.container form textarea').select();
    });
  });
});
