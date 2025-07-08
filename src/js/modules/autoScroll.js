import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export function autoScroll() {
    const selector = '.p-top-scrollslider';
    const element = document.querySelector(selector);

    if (element) {
        new Splide(selector, {
            type: 'loop',
            arrows: false,
            drag: false,
            pagination: false,
            perPage: 4,
            gap: '0',
            autoScroll: {
                speed: 0.75,
                pauseOnHover: false,
            },
            breakpoints: {
                767: {
                    perPage: 1,
                    speed: 1.5,
                }
            },
        }).mount({ AutoScroll });
    }
}
