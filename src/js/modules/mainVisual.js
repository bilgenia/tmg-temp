import Splide from '@splidejs/splide';

export function mainVisual() {
    // pageLoadingの処理完了後に実行
    document.addEventListener('DOMContentLoaded', () => {
        // HTML要素にデータ属性が設定されるのを監視
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-loading' &&
                    document.querySelector('html').getAttribute('data-loading') === 'true') {
                    // pageLoadingの処理が完了したら実行
                    setTimeout(() => {
                        initMainVisual();
                    }, 100); // 少し遅延させて実行
                    observer.disconnect(); // 監視を終了
                }
            });
        });

        // HTML要素の属性変化を監視
        observer.observe(document.querySelector('html'), { attributes: true });
    });

    // メインビジュアルの初期化
    function initMainVisual() {
        const selector = '.tmg-visual-01';
        const element = document.querySelector(selector);

        if (!element) return;

        // 1. スライダー要素を確実に非表示に
        element.style.opacity = '0';

        // 2. テキスト要素の初期設定
        const textContainer = element.querySelector('.tmg-visual-01__text');
        if (textContainer) {
            // data-visual-text属性を持つ要素を取得して初期化
            const textElements = textContainer.querySelectorAll('[data-visual-text]');

            // 各テキスト要素の初期化
            textElements.forEach((text) => {
                // data-visual-text属性を初期化
                text.setAttribute('data-visual-text', 'false');
            });
        }

        // 3. スライダーの設定
        const splide = new Splide(selector, {
            type: 'fade',
            rewind: true,
            autoplay: false, // 最初は自動再生しない
            arrows: false,
            focus: 'center',
            width: '100%',
            perPage: 1,
            pauseOnHover: false,
            pagination: false,
            interval: 6000,
            speed: 3000,
        });

        // 4. スライダーをマウント
        splide.mount();

        // DOMが更新されるのを待つ
        requestAnimationFrame(() => {
            // 最初の要素自体がフェードインする時間を挿入
            element.style.transition = 'opacity 3s ease';

            // 5. スライダー要素のフェードイン開始
            setTimeout(() => {
                element.style.opacity = '1';

                // 6. テキスト要素を順番に表示
                setTimeout(() => {
                    const textElements = textContainer ? textContainer.querySelectorAll('[data-visual-text]') : [];

                    textElements.forEach(text => {
                        text.setAttribute('data-visual-text', 'true');
                    });

                    // 7. テキスト表示完了後にスライダーの自動再生開始
                    // 最後のテキスト要素のアニメーション完了後
                    const lastElementDelay = (textElements.length - 1) * 0.8 + 1.5;
                    setTimeout(() => {
                        // Splideのオプション変更と自動再生の開始
                        splide.Components.Autoplay.play(); // 自動再生を開始
                    }, lastElementDelay * 1000 + 500); // 最後の要素のアニメーション完了 + 0.5秒後

                }, 1000); // テキスト表示までのインターバル
            }, 800); // スライダーのフェードインが開始されるまでのインターバル調整
        });
    }
}