$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    let text =  $(this).val();
    let len = text.length;
    let char = 140 - len;
    if (len >= 140) {
      $('#count').text(char);
      $('#count').css('color','red');
    } else {
      $('#count').css('color','#545149');
      $('#count').text(char);
      
    }
  });
    
});

