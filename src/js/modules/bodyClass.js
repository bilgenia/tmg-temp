import $ from 'jquery';

export function bodyClass() {
  $(window).on('load resize', function () {
    let windowWidth = 1023;
    if (window.innerWidth <= windowWidth) {
      $('body').removeClass('is-pc').addClass('is-sp');
    } else {
      $('body').removeClass('is-sp').addClass('is-pc');
    }
  });
}