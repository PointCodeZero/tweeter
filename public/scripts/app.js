$(document).ready(function() {
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

//Like Button
function likeHandlers(tweets) {
  $('#tweets-container footer i.fa-heart').on('click', function() {
    let tweetID = $(this).attr("id");
    $.ajax(`/tweets/${tweetID}/like`, { method: 'POST' })
      .then(function(tweet) {
        $(`#${tweet._id} .like`).text(tweet.likes + 1);
    })
  });
}

//Date Format
function timeSince(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let seconds = Math.floor((new Date() - date) / 1000 + 1);
  let intervalType;
  let interval = Math.floor(seconds / 3153600);

  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
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
          <i class="fas fa-flag"><span"></span></i>
          <i class="fas fa-recycle"><span id="recycle"></span></i>
          <i id="${db._id}"class="fas fa-heart"><span class="like">${db.likes}</span></i>
        </footer>
      </article>
  `);
}

//For each tweet in DB create HTML
function renderTweets(tweets) {
  tweets.forEach((tweet) => {
    createTweetElement(tweet);
  });
  likeHandlers();
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

