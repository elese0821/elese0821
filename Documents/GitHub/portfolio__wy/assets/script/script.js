gsap.registerPlugin(ScrollTrigger);

// 뷰포트 높이 계산하여 높이 조절
// const appHeight = () => {
//     const doc = document.documentElement;
//     doc.style.setProperty("--app-height", `${window.innerHeight}px`);
// };
// window.addEventListener("resize", appHeight);
// appHeight();
// window.addEventListener("DOMContentLoaded", (event) => {
//     appHeight();
// });

// 엄격모드
("use strict");
// ————— Lenis

let lenis;

lenis = new Lenis({
    duration: 1.2,
    infinite: false,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

$("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

function connectToScrollTrigger() {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
}
connectToScrollTrigger();



// 캐시삭제
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};