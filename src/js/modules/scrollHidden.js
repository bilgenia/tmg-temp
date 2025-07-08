export function scrollHidden() {
  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector('[role="header"]');
    const naviItems = document.querySelectorAll('.c-navi-list > .menu-item > .sub-menu');

    if (scrollTop > lastScrollTop && scrollTop > 10) {
      header.setAttribute('data-is-hidden', 'true');
      naviItems.forEach(navi => {
        navi.setAttribute('data-is-hidden', 'true');
      });
    } else {
      header.setAttribute('data-is-hidden', 'false');
      naviItems.forEach(navi => {
        navi.setAttribute('data-is-hidden', 'true');
      });
    }

    lastScrollTop = scrollTop;
  };

  window.addEventListener('scroll', handleScroll);
}