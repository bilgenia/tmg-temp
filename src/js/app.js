// app css

import '@splidejs/splide/css';

// app js

import { pageLoading } from './modules/pageLoading.js';
import { headerHeight } from './modules/headerHeight.js';
import { bodyClass } from './modules/bodyClass.js';
import { mainVisual } from './modules/mainVisual.js';
import { pickupSlider } from './modules/pickupSlider.js';
import { scrollHint }  from './modules/scrollHint.js';
import { floatingBox } from './modules/floatingBox.js';
// import { pageTop } from './modules/pageTop.js';
import { autoScroll } from './modules/autoScroll.js';
import { tmgBanner } from './modules/tmgBanner.js';
import { tmgMediatext } from './modules/tmgMediatext.js';

import { globalNav } from './modules/globalNav.js';
import { globalNavHover } from './modules/globalNavHover.js';
import { globalNavToggle } from './modules/globalNavToggle.js';

pageLoading();
headerHeight();
bodyClass();
mainVisual();
pickupSlider();
scrollHint();
floatingBox();
// pageTop();
autoScroll();
tmgBanner();
tmgMediatext();
globalNav();
globalNavHover();
globalNavToggle();