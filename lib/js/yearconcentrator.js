(function() {

  $('html').on('keypress click input keyup', function(){

    var length = $('div.typeable').text().length;
    $('.char-count').text(length);
    if (length === 1 && timeStarted === false) {
      timeStarted = true;
      startCountdown();
    }
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

  $('.typeable').on('click', function(){
    console.log("enter");
  });

  $('.submit-button').on('click', function() {
    console.log($('.char-count').text());
  });

  var timeStarted = false;

  // function startCountdown() {
  //
  //   for (var seconds = 9; seconds > -1; seconds--){
  //     setTimeout( function(){
  //       seconds -= 1;
  //       console.log(seconds);
  //       $('.count-down').text(seconds);
  //     }, 1000);
  //   }
  //     console.log("Through");
  //
  // }

  var counter = 365;
  function startCountdown(){
    setInterval(function() {
        counter--;
        if(counter < 0) {
            newElement.parentNode.replaceChild(downloadButton, newElement);
            clearInterval(id);
        } else {
          $('.count-down').text(counter);
          $('.count-down').css('color', 'red');
        }
    }, 1000);
  }
    // $('.count-down').text("horse");

})();
