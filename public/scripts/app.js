const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
    let $form = $('.container form');
      $form.on('submit', function(event) {
        event.preventDefault();
        let strData = $(this).serialize();
        if (strData.length <= 5) {
          return alert("Please add a tweet!");
        }
        if (strData.length > 145) {
          return alert("Please short your message, only 140 characters allowed!");
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
