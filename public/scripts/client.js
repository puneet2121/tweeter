/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1653348097881
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1653434497882
  }
]

const createTweetElement = function(tweet) {
  console.log(tweet)

 const tweetHtml = `<article><header class="user"><div><i class="fa-solid fa-skull"></i>&nbsp;&nbsp;${tweet.user.name}</div> <div>${tweet.user.handle}</div></header>
        <form>
          <p class="article-tweet" name="text">${tweet.content.text}</p>

        </form>
        <hr class="article-line">
      <footer><div>10 days ago</div>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
    </footer>
  </article>`
  $('#tweets-container').append(tweetHtml);
}

const renderTweets = function() {
    for(let items of tweetData) {
      createTweetElement(items);
    }
}
$(() =>  {
renderTweets();
$("form").submit(function(event) {
  alert("an event has occured");
  event.preventDefault();
  let serializeData = $( this ).serialize() 
  $.post('/tweets',serializeData,() => {
    console.log('Data transfered')
  });
})
});

