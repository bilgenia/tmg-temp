// ヘッダーの高さ取得・格納

export function headerHeight() {
    const setHeaderHeight = () => {
        const header = document.querySelector('[role="header"]');
        if (header) {
            const heightPx = header.offsetHeight;
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const heightRem = heightPx / rootFontSize;
            document.documentElement.style.setProperty('--headerHeight', `${heightRem}rem`);
        } else {
            console.error('Header element not found.');
        }
    };

    setHeaderHeight(); // 初期設定

    // リサイズ時に再計算
    window.addEventListener('resize', setHeaderHeight);

    // オプション: ウィンドウのロード完了後に再計算
    window.addEventListener('load', setHeaderHeight);
}