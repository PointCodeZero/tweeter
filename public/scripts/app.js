/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
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
}

$(document).ready(function() {

  var $tweet = createTweetElement(tweetData);

  function createTweetElement(db) {
    $('#tweets-container').append(`
        <article>
          <header>
            <img src="${db.user.avatars.small}">
            <h2>${db.user.name}</h2>
            <span class="email-hint">${db.user.handle}</span>
          </header>
          <div class="main-tweet">
            <p>${db.content.text}</p>
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


  console.log($tweet); // to see what it looks like

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    // $('#tweets-container').append($tweet);

});
