// ドロワーの開閉処理（SP）

export function globalNav() {
  const drawerButton = document.querySelector('[aria-controls="navigation"]');
  const drawerNavi   = document.querySelector('#drawer-nav');

  // ドロワーが存在しない場合は終了
  if (!drawerButton || !drawerNavi) {
    return;
  }

  // 画面サイズに応じたドロワーの表示・非表示
  const drawerNaviHiden = () => {
    document.body.classList.remove('is-fixed');
    drawerNavi.setAttribute('aria-hidden', 'true');
    drawerButton.setAttribute('aria-expanded', 'false');
  };

  // ドロワーのトグル
  const toggleDrawer = () => {
    document.body.classList.toggle('is-fixed');
    drawerButton.setAttribute('aria-expanded', drawerButton.getAttribute('aria-expanded') !== 'true');
    drawerNavi.setAttribute('aria-hidden', drawerNavi.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
  };

  // 初期状態
  drawerNaviHiden();

  drawerButton.addEventListener('click', toggleDrawer);
  window.addEventListener('resize', drawerNaviHiden);
}