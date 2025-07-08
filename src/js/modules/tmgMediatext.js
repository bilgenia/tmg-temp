export function tmgMediatext() {
    document.querySelectorAll('[data-media-size]').forEach(element => {
        const size = element.getAttribute('data-media-size');
        const mediaElement = element.querySelector('.tmg-media-text__media');
        if (mediaElement) {
            mediaElement.style.flex = `0 0 ${size}%`;
        }
    });
}