$(document).ready(function() {

  //Sanitizer
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(db) {
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
            <p>${db.created_at} days</p>
            <i class="fas fa-flag"></i>
            <i class="fas fa-recycle"></i>
            <i class="fas fa-heart"></i>
          </footer>
        </article>
    `);
  }

  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      createTweetElement(tweet);
    });
  }

  function loadTweets() {
    $('#tweets-container').empty();
    $.ajax('/tweets', { method: 'GET'})
    .then(function(tweet) {
      renderTweets(tweet);
    });
  }

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

  loadTweets();
  ajaxPOST();

  //Form Animation
  $('#nav-bar .btn').on('click', function() {
    $('.new-tweet').slideToggle(400, function() {
      $('.container form textarea').select();
    });

  });

});
