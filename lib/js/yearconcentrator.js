(function() {

  $('html').on('keypress input keyup', function(){
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

  $('div.typeable').on('click', function(){

  });

  $('.submit-button').on('click', function() {
    console.log($('.char-count').text());
  });


})();
