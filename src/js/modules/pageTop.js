import $ from 'jquery';

export function pageTop() {
  // フッター：ページトップボタンの処理
  $('#page-top').on('click', function (e) {
    e.preventDefault();
    const target = document.querySelector('#body');
    if (target) {
      const headerHeight = document.querySelector('[role="header"]')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      // requestAnimationFrameを使用してスムーズなスクロールを実現
      const duration = 500;
      const start = window.pageYOffset;
      const startTime = performance.now();

      function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeInOutQuad easing
        const easeProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, start + (targetPosition - start) * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        }
      }

      requestAnimationFrame(scrollStep);
    }
    return false;
  });

  // フッター：ページトップボタンの位置
  let resizeTimer;
  $(window).on('resize scroll', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const windowSize = window.innerWidth;
      const scrollPoint = $(this).scrollTop();
      const scrollHeight = $(document).height();
      const scrollPosition = $(window).height() + $(window).scrollTop();
      const footHeightPC = $('.l-footer-contents').innerHeight() + $('.l-footer-copyright').innerHeight();
      const footHeightSP = $('.l-footer-copyright').innerHeight() + 60;
      const footerPopular = $('.js-aside');
      const isSpecificPage = $('body').hasClass('page-gammaknife');
      const fixedMenu = footerPopular.length && !(windowSize >= 1023 && isSpecificPage) ? footerPopular.innerHeight() : 0;
      const button = $('#page-top');
      
      // パフォーマンス最適化：requestAnimationFrameを使用
      requestAnimationFrame(() => {
        button.css({ opacity: scrollPoint > 100 ? '1.0' : '0' });
        
        if (windowSize < 1023) {
          const targetHeightSP = footHeightSP - fixedMenu;
          button.css({
            position: scrollHeight - scrollPosition <= targetHeightSP ? 'absolute' : 'fixed',
            bottom: scrollHeight - scrollPosition <= targetHeightSP ? footHeightSP + 20 : fixedMenu + 20
          });
        } else {
          const targetHeightPC = footHeightPC - fixedMenu;
          button.css({
            position: scrollHeight - scrollPosition <= targetHeightPC ? 'absolute' : 'fixed',
            bottom: scrollHeight - scrollPosition <= targetHeightPC ? footHeightPC + 20 : fixedMenu + 20
          });
        }
      });
    }, 100);
  });
}
