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
    updateFirebase();
  });

  var timeStarted = false;

  var counter = 5;
  function startCountdown(){
    setInterval(function() {
        counter--;
        if(counter < 0) {
          //freeze input field
          //display prompt to reset the form
          if ($('.char-count').text() === "365") {
            $('div.typeable').attr('unselectable', 'on')
                             .css('user-select', 'none')
                             .on('selectstart', false);
            return;
          } else {
          var length = $('.char-count').text(length);
          $('.thanks').text("Your year can only be archived if it is the appropriate size for our storage facility. Please try again.");
          $('.thanks').show();
          console.log(counter);
          $('div.typeable').on("keypress", function(e) {
              e.preventDefault();
          });
          $('div.typeable').attr('unselectable', 'on')
                           .css('user-select', 'none')
                           .on('selectstart', false);
          }
        } else {
          $('.count-down').text(counter);
          $('.count-down').css('color', 'red');
        }
    }, 1000);
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
    myDataRef.push({name: name,
                  year_sum: text,
                  publishable: publishable,
                  date: Date(),
                  });
    $('.name-input').val("");
    $('div.typeable').text("");
    $('#permission').attr("checked", false);
    $('.thanks').show();

  }

  $('.submit-button').hide();
  $('.thanks').hide();

  $('.thanks').on("click", function(){
    // $('.submit-button').show();
    // $('.thanks').hide();
    window.location.reload();
  });

})();
