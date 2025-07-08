import $ from 'jquery';

export function floatingBox() {
  $('#l-floating-box button').on('click', function () {
    const targetId = $(this).attr('aria-controls');
    $(`#${targetId}`).attr('aria-hidden', 'true');
    $(this).attr('area-expanded', 'false');
    return false;
  });
}