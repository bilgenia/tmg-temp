import ScrollHint from "scroll-hint";
import 'scroll-hint/css/scroll-hint.css';

export function scrollHint() {
  new ScrollHint('.is-scroll-on-mobile', {
    i18n: {
      scrollable: 'スクロールできます'
    }
  });
};