$(document).ready(function() {

  const maxLength = 140;

  $('form textarea').on('keypress', function() {
    let currentLength = $(this).val().length;
    let formLength = maxLength - currentLength;
    let counter = $(this).siblings('.counter').text(formLength);
    if (formLength >= 0) {
      counter.css('color', '#244751');
    } else {
      counter.css('color', 'red');
    }
  });

});
