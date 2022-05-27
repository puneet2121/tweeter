/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(tweet) {
  console.log(tweet);
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const tweetHtml = `<article><header class="user"><div><i class="fa-solid fa-skull"></i>&nbsp;&nbsp;${tweet.user.name}</div> <div>${tweet.user.handle}</div></header>
        <form>
          <p class="article-tweet" name="text">${escape(tweet.content.text)}</p>

        </form>
        <hr class="article-line">
      <footer><div>${timeago.format(tweet.created_at)};</div>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
    </footer>
  </article>`;
  $('#tweets-container').append(tweetHtml);
};

const renderTweets = function() {
  $.get('/tweets',(res) => {
    $('#tweets-container').html('');
    for (let items of res.reverse()) {
      createTweetElement(items);
    }
  });
};

$(() =>  {
  $('#error').hide();
  renderTweets();
  
  $("form").submit(function(event) {
    console.log(event);
    if ($.trim($("#tweet-text").val()).length === 0) {
     
      $('#message').html('<i class="fa-solid fa-triangle-exclamation"></i> Sorry please write down something<i class="fa-solid fa-triangle-exclamation"></i>');
      $('#error').show();
      event.preventDefault();
      return false;
    }
    if ($.trim($("#tweet-text").val()).length > 140) {
      $('#message').html('<i class="fa-solid fa-triangle-exclamation"></i>Too long tweet please respect the word limit<i class="fa-solid fa-triangle-exclamation"></i>');
      $('#error').show();
      event.preventDefault();
      return false;
    }
    
    event.preventDefault();
    let serializeData = $(this).serialize();
    $.post('/tweets',serializeData,() => {
      renderTweets();
      console.log('Data transfered');
      $("#tweet-text").val('');
      $('#count').text(140);
    });
 
  });
});

