(function() {

  $('html').on('keypress click input keyup', function(){

    var length = $('div.typeable').text().length;
    $('.char-count').text(length);
    if (length === 365) {
      $('.char-count').css('color', '#5becf5');
      $('.char-count').css('font-weight', 'bold');
    } else if (length >= 365) {
      $('.char-count').css('color', 'red');
      $('.char-count').css('font-weight', 'normal');
    } else {
      $('.char-count').css('color', 'grey');
      $('.char-count').css('font-weight', 'normal');
    }

  });

  function charactersleft(tweet) {
    var url, i, lenUrlArr;
    var virtualTweet = tweet;
    var filler = "01234567890123456789";
    var extractedUrls = twttr.txt.extractUrlsWithIndices(tweet);
    var remaining = 140;
    lenUrlArr = extractedUrls.length;
    if ( lenUrlArr > 0 ) {
        for (var i = 0; i < lenUrlArr; i++) {
            url = extractedUrls[i].url;
            virtualTweet = virtualTweet.replace(url,filler);
        }
    }
    remaining = remaining - virtualTweet.length;
    return remaining;
  }

  $('.emoji-wysiwyg-editor').on('click', function(){
    console.log("enter");
  });

  $('.submit-button').on('click', function() {
    console.log($('.char-count').text());
  });

  var timeStarted = false;

})();
