// PCナビゲーションのホバー処理のみを実装

export function globalNavHover() {
  // メディアクエリの設定
  const mobileMediaQuery = window.matchMedia('(max-width: 1024px)');
  let isMobile = mobileMediaQuery.matches;

  // ホバーイベントハンドラー
  function handleMouseEnter() {
    if (isMobile) return; // SP時は実行しない
    const subMenu = this.querySelector('.sub-menu');
    if (subMenu) {
      subMenu.setAttribute('data-is-hidden', 'false');
    }
  }

  function handleMouseLeave() {
    if (isMobile) return; // SP時は実行しない
    const subMenu = this.querySelector('.sub-menu');
    if (subMenu) {
      subMenu.setAttribute('data-is-hidden', 'true');
    }
  }

  // PC時のホバー処理
  const setupPcHover = () => {
    const menuItems = document.querySelectorAll('#nav_global > .menu-item-has-children');

    // 一旦全てのホバーイベントを削除
    menuItems.forEach(item => {
      item.removeEventListener('mouseenter', handleMouseEnter);
      item.removeEventListener('mouseleave', handleMouseLeave);
    });

    if (isMobile) {
      return;
    }

    // PC時はホバーイベントを追加
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  // サブメニューの状態をリセット
  const resetSubMenuState = () => {
    // 全てのサブメニューを閉じる
    document.querySelectorAll('.sub-menu').forEach(menu => {
      menu.setAttribute('data-is-hidden', 'true');
    });
  };

  // 初期属性設定（ロード時に必要な属性を追加）
  const setupInitialAttributes = () => {
    // サブメニューに属性を追加
    document.querySelectorAll('.sub-menu').forEach(menu => {
      if (!menu.hasAttribute('data-is-hidden')) {
        menu.setAttribute('data-is-hidden', 'true');
      }
    });
  };

  // ブレイクポイント変更時の処理
  const handleBreakpointChange = (e) => {
    isMobile = e.matches;
    resetSubMenuState();
    setupPcHover();
  };

  // ウィンドウサイズ変更時の処理
  const handleResize = () => {
    const newIsMobile = window.innerWidth <= 767;
    if (isMobile !== newIsMobile) {
      isMobile = newIsMobile;
      resetSubMenuState();
      setupPcHover();
    }
  };

  // 初期化処理
  const init = () => {
    setupInitialAttributes();
    setupPcHover();
  };

  // メディアクエリの変更を監視
  mobileMediaQuery.addEventListener('change', handleBreakpointChange);

  // リサイズイベント
  window.addEventListener('resize', handleResize);

  // 初期化実行
  init();

  // DOMContentLoadedでも実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}