$(function(){
  var current_color = '#ffef6c'

  var updateColor = function(){
    $('.background-color').css('background', current_color);
    $('.fc-center h2').css('color', current_color);
    $('.with-event').css('border-color', current_color);
    $('.fc-today').css('color', current_color);
  };

  $('body').css('background', current_color);
  $('#show-color').on('click', function(e){
    e.preventDefault();

    var $el = $(this);
    $('article > div.active').removeClass('active').fadeOut('fast');
    setTimeout(function(){
      $('#choose-color-section').fadeIn('fast').addClass('active');
    }, 250);

    var delay = 0;

    $('#choose-color-section > div span').each(function(){
      $(this).delay(delay).animate({
        opacity: '1',
        height: '40px',
        width: '40px'
      }, 100);
      delay += 35;
    });

    $('#show-menu .fa').removeClass('fa-th-large').addClass('fa-times');
    $('#show-menu').attr('id', 'back-to-calendar');

    $el.css('opacity', '0');
  });

  $(document).on('click', '#back-to-calendar', function(e){
    e.preventDefault();

    var $el = $(this);

    $el.attr('id', 'show-menu');
    $('.fa', $el).removeClass('fa-times').addClass('fa-th-large');
    $('#show-color').css('opacity', '1');

    $('article > div.active').removeClass('active').fadeOut('fast');
    setTimeout(function(){
      $('#calendar-section').fadeIn('fast').addClass('active');
    }, 250);

    $('#choose-color-section > div span').css({
      width: '0',
      height: '0',
      opacity: '0'
    });

    updateColor();
  });

  $('#choose-color-section span').on('click', function(e){
    e.preventDefault();
    var $el = $(this);
    current_color = $el.css('backgroundColor');
    updateColor();
    $('body').css('background', current_color);
    $('#choose-color-section span.active').removeClass('active');
    $el.addClass('active');
  });

  $('#calendar-section').fullCalendar({
    firstDay: 1,
    aspectRadio: 1.3,
    dragScroll: false,
    header:{
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    monthNames:['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    dayNamesShort:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    dayRender: function(date, cell){
      if (date.format('YYYY-MM-DD') == '2017-07-15') {
        cell.addClass('has-event');
        cell.append('<span class="with-event"></span>');
      }
    }
  });
});
