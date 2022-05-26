/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(tweet) {
  console.log(tweet)

 const tweetHtml = `<article><header class="user"><div><i class="fa-solid fa-skull"></i>&nbsp;&nbsp;${tweet.user.name}</div> <div>${tweet.user.handle}</div></header>
        <form>
          <p class="article-tweet" name="text">${tweet.content.text}</p>

        </form>
        <hr class="article-line">
      <footer><div>${timeago.format(tweet.created_at)};</div>
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
  $.get('/tweets',(res) => {
    $('#tweets-container').html('');
    for(let items of res.reverse()) {
      createTweetElement(items);
    }
})
}

$(() =>  {
renderTweets();
$("form").submit(function(event) {
  console.log(event);
  if ($.trim($("#tweet-text").val()) === '') {
    event.preventDefault();
    return alert('you did not fill out one of the fields');
    
}
  if ($.trim($("#tweet-text").val()).length > 140) {
    event.preventDefault();
    return alert('too much word');
  }
  event.preventDefault();
  let serializeData = $( this ).serialize()
  $.post('/tweets',serializeData,() => {
    renderTweets();
    console.log('Data transfered')
  });
 
})
});

