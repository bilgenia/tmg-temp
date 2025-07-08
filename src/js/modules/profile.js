jQuery(function() {
  var mediaQuery = window.matchMedia('(min-width: 1024px)');

  // マウスオーバー時の処理
  jQuery('.p-schedule-table a').mouseover(function() {
    if (mediaQuery.matches) {
      var targetId = jQuery(this).attr('href').substring(1);
      var tooltipContent = jQuery('#' + targetId).html();
      jQuery('#js-balloon-container').html(tooltipContent);

      var linkOffset = jQuery(this).offset();
      var tooltipTop = linkOffset.top - jQuery('#js-balloon-container').outerHeight() - 30;
      var tooltipLeft = linkOffset.left + (jQuery(this).outerWidth() - jQuery('#js-balloon-container').outerWidth()) / 2;

      var tooltipTailLeft = linkOffset.left + jQuery(this).outerWidth() / 2;

      if (tooltipLeft < 0) {
        tooltipLeft = 10;
      } else if (tooltipLeft + jQuery('#js-balloon-container').outerWidth() > jQuery(window).width()) {
        tooltipLeft = jQuery(window).width() - jQuery('#js-balloon-container').outerWidth() - 10;
      }
      jQuery('#js-balloon-container:not(:animated)').css({
        top: tooltipTop + 'px',
        left: tooltipLeft + 'px'
      }).html(tooltipContent).addClass('js-balloon-active');
      jQuery('#js-balloon-tail').css({
        left: tooltipTailLeft + 'px'
      });
    }
  }).mouseout(function() {
    if (mediaQuery.matches) {
      jQuery('#js-balloon-container').stop(true, true).removeClass('js-balloon-active').empty();
    }
  }).click(function() {
    if (!mediaQuery.matches) {
      var targetId = jQuery(this).attr('href').substring(1);
      jQuery('.p-modal').addClass('is-active');
      jQuery('#' + targetId).addClass('is-active');
      jQuery('#js-modal-overlay').addClass('is-active');
      jQuery('body').addClass('js-fixed');
      return false;
    }
  });
  jQuery('.js-modal-close, #js-modal-overlay').click(function() {
    jQuery('.p-modal').removeClass('is-active');
    jQuery('.p-profile').removeClass('is-active');
    jQuery('#js-modal-overlay').removeClass('is-active');
    jQuery('body').removeClass('js-fixed');
    return false;
  });

  // ウィンドウリサイズ時の処理
  jQuery(window).resize(function() {
    if (mediaQuery.matches) {
      jQuery('.p-modal').removeClass('is-active');
      jQuery('.p-profile').removeClass('is-active');
      jQuery('#js-modal-overlay').removeClass('is-active');
      jQuery('body').removeClass('js-fixed');
    }
  });

  // メディアクエリ変更時の処理
  mediaQuery.addEventListener('change', function(event) {
    // サイドエフェクトがあれば追加
    // 例: handleMediaQuery(event.target);
  });
});