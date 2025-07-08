import Splide from '@splidejs/splide';

export function tmgBanner() {
    const selector = '.tmg-banner__splide';
    const element = document.querySelector(selector);

    if (element) {
        const splide2 = new Splide(selector, {
            type: 'loop',
            autoplay: true,
            rewind: true,
            width: '100%',
            focus: 0,
            perPage: 4,
            perMove: 1,
            arrows: true,
            updateOnMove: true,
            pauseOnHover: true,
            pagination: false,
            speed: 1000,
            trimSpace: false,
            gap: 20,
            breakpoints: {
                639: {
                    perPage: 1,
                    gap: 10,
                },
            },
        }).mount();
    }
}