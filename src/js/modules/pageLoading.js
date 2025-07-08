export function pageLoading() {
  // ページの読み込みが終わったら
  window.onload = function() {
    // html要素にロードが終わったデータ属性を渡す
    document.querySelector('html').setAttribute('data-loading', 'true');
    // 1秒後に.c-loadingのaria-hiddenをtrueに変える
    setTimeout(() => {
      document.querySelector('.c-loading').setAttribute('aria-hidden', 'true');
    }, 1000);
  }
}