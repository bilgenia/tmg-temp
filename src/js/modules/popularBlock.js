import $ from 'jquery';

export function popularBlock() {
  $(function () {
    $(window).on('load resize scroll', function () {
      let target = $('#js-popular_target');
      let nowPosition = $(window).scrollTop();
      let windowHeight = $(window).height();
      let targetPosition = target.offset().top;
      let targetHeight = target.innerHeight();
      let fixed = $('#js-popular');
      if (nowPosition + windowHeight > targetPosition && targetPosition + targetHeight > nowPosition) {
        fixed.fadeOut(300);
        $('#js-popular_toggle').removeClass('is-active');
        $('#js-popular_contents:not(:animated)').slideUp(500).removeClass('is-active');
        $('#js-popular_overlay').fadeOut(500).removeClass('is-active');
      } else if ($(this).scrollTop() < 100) {
        fixed.fadeOut(300);
        $('#js-popular_toggle').removeClass('is-active');
        $('#js-popular_contents:not(:animated)').slideUp(500).removeClass('is-active');
        $('#js-popular_overlay').fadeOut(500).removeClass('is-active');
      } else {
        fixed.fadeIn(300);
      }
      return false;
    })
    $('#js-popular_toggle').on('click', function () {
      $(this).toggleClass('is-active');
      $('#js-popular_contents:not(:animated)').slideToggle(500).toggleClass('is-active');
      $('#js-popular_overlay').fadeToggle(500).toggleClass('is-active');
      return false;
    });
    $('#js-popular_overlay').on('click', function () {
      $('#js-popular_toggle').removeClass('is-active');
      $('#js-popular_contents:not(:animated)').slideUp(500).removeClass('is-active');
      $('#js-popular_overlay').fadeOut(500).removeClass('is-active');
    });
  });
}

