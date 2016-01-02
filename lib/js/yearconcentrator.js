(function() {

  var currentCountdown;

  $('html').on('keypress click input keyup', function(){
    var length;
    if ($('div.typeable').length === 1) {
      length = $('div.typeable').text().length;
    } else {
      length = $('textarea.typeable').val().length;
    }
    $('.char-count').text(length);
    if (length > 0 && timeStarted === false) {
      timeStarted = true;
      // startCountdown();
      var countdown = createCountdown();
      currentCountdown = countdown();
      // clearInterval(countdownGo);
    }
    if (length === 365) {
      $('.char-count').css('color', '#5becf5');
      $('.char-count').css('font-weight', 'bold');
      $('.submit-button').show();
    } else if (length >= 365) {
      $('.char-count').css('color', 'red');
      $('.char-count').css('font-weight', 'normal');
      $('.submit-button').hide();
    } else {
      $('.char-count').css('color', 'grey');
      $('.char-count').css('font-weight', 'normal');
      $('.submit-button').hide();
    }

  });

  $('.submit-button').on('click', function() {
    // console.log($('.char-count').text());
    clearInterval(currentCountdown);
    updateFirebase();
  });

  var timeStarted = false;


  function createCountdown() {
    var counter = 365;
    return function(){
      return setInterval(function() {
          counter--;
          if(counter < 0) {
            counterConditional();
          } else {
            $('.count-down').text(counter);
            $('.count-down').css('color', 'red');
          }
          console.log('ding');
      }, 1000);
    };
  }

  var myDataRef = new Firebase("https://vivid-fire-4396.firebaseio.com/");
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13 && $('.char-count').text(length) === 365) {
      updateFirebase();
    }
  });

  function updateFirebase() {
    var name = $('.name-input').val();
    var text = $('div.typeable').text();
    var publishable = $('#permission').is(":checked");
    var seconds = $('.count-down').text();
    myDataRef.push({name: name,
                  year_sum: text,
                  publishable: publishable,
                  date: Date(),
                  remaining: seconds
                  });
    $('.name-input').val("");
    $('div.typeable').text("");
    $('#permission').attr("checked", false);
    $('.thanks').show();

  }

  function counterConditional() {
    if ($('.char-count').text() === "365") {
      $('div.typeable').attr('unselectable', 'on')
                       .css('user-select', 'none')
                       .on('selectstart', false);
      return;
    }
    else if($('.char-count').text() > -1) {
      var length = $('.char-count').text(length);
      $('.thanks').text("Your year can only be archived if it is the appropriate size for our storage facility. Please try again.");
      $('.thanks').show();
      $('div.typeable').on("keypress", function(e) {
          e.preventDefault();
      });
      $('div.typeable').attr('unselectable', 'on')
                       .css('user-select', 'none')
                       .on('selectstart', false);
    }
  }

  $('.submit-button').hide();
  $('.thanks').hide();

  $('.thanks').on("click", function(){
    // $('.submit-button').show();
    // $('.thanks').hide();
    window.location.reload();
  });

})();
