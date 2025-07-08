import Splide from '@splidejs/splide';

export function pickupSlider() {
    const selector = '.p-top-pickup';
    const element = document.querySelector(selector);

    if (element) {
        const splide = new Splide(selector, {
            type: 'loop',
            autoplay: true,
            rewind: true,
            focus: 'center',
            width: '100%',
            perPage: 3,
            padding: '20%',
            gap: 0,
            updateOnMove: true,
            pauseOnHover: true,
            pagination: true,
            interval: 3000,
            speed: 1000,
            trimSpace: false,
            breakpoints: {
                1023: {
                    perPage: 1,
                    padding: '10%',
                },
            },
        }).mount();

        splide.on('active', function () {
            updateSplideIndex();
        });

        function updateSplideIndex() {
            document.querySelector('[data-slide="current"]').textContent = splide.index + 1;
            document.querySelector('[data-slide="total"]').textContent = splide.length;
        }
        updateSplideIndex();
    }
}