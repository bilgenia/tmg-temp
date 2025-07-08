import $ from 'jquery';

// ドロワー内のサブメニューの開閉

export function globalNavToggle() {
    // クリックイベントのハンドラ - サブメニューの開閉
    $(document).on('click', '.js-global-nav .children-expander', function () {
        $(this).next('.sub-menu').slideToggle(500);
    });
    // ウィンドウリサイズ時にスタイルをリセット
    $(window).on('resize', function() {
        // ブレイクポイントを設定（PCとSPの境界）
        const breakpoint = 1024;
        // PC幅の場合は、すべてのサブメニューのインラインスタイルをリセット
        if (window.innerWidth > breakpoint) {
            $('.js-global-nav .sub-menu').css('display', '');
            $('.js-global-nav .children-expander').attr('data-is-expanded', 'false');
        }
    });
}