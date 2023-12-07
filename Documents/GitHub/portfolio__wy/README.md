## 미리보기
[https://wonyoung-portfolio.netlify.app/]

## GSAP
```
const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();
window.addEventListener("DOMContentLoaded", (event) => {
    appHeight();
});
```
- gsap.registerPlugin(ScrollTrigger);: 플러그인 등록
- const appHeight = () => { ... }: 화면의 높이를 측정하여 CSS 변수 --app-height에 반영하는 함수 브라우저 창 크기 조절 시 이 함수를 통해 뷰포트의 높이를 업데이트
- window.addEventListener("resize", appHeight);: 브라우저 창 크기가 조절될 때마다 appHeight 함수를 호출하여 뷰포트 높이를 업데이트합니다.
- window.addEventListener("DOMContentLoaded", (event) => { ... });: 문서가 로드될 때 appHeight 함수를 호출하여 초기 뷰포트 높이를 설정합니다.
```
("use strict"); // 엄격모드
```
## Lenis (라이브러리)

Lenis는 스크롤 동작을 조정하기 위한 라이브러리입니다.
페이지 내 스크롤 동작을 Lenis 객체를 통해 다룹니다. 예를 들어, 사용자가 [data-lenis-toggle] 속성을 가진 요소를 클릭하면 스크롤을 멈추거나 시작하는 기능을 제어합니다.
```
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
```
- Lenis 라이브러리를 초기화하고 설정합니다. Lenis는 스크롤 이벤트를 다루는 라이브러리로, 스크롤을 제어하거나 효과를 주는 데 사용됩니다.
- $("[data-lenis-toggle]").on("click", function () { ... });: Lenis의 스크롤을 토글하는 기능을 가진 요소가 클릭될 때 Lenis의 동작을 멈추거나 다시 시작하는 이벤트 핸들러를 정의합니다.
- gsap.defaults({ ... }): GSAP (GreenSock Animation Platform)에서 기본적으로 사용되는 애니메이션 속성을 설정하는 부분입니다. 여기서는 기본적인 애니메이션 이징(ease)을 "power3.inOut"으로, 기본적인 애니메이션 지속 시간(duration)을 0.8초로 설정하고 있습니다.


## SplitType (라이브러리)

SplitType은 텍스트를 단어 또는 글자로 분할하여 표시하는 기능을 제공합니다.

```
let splitText = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
});

let typeSplit;
let lineSplit;
function runSplit() {
    typeSplit = new SplitType(".higlighted-text", {
        types: "lines, words, chars",
    });
    lineSplit = new SplitType("[split-lines]", {
        types: "lines",
    });
}
runSplit();
```
1. splitText라는 변수는 SplitType이라는 클래스의 인스턴스를 생성합니다. 이 클래스는 "[text-split]"이라는 태그를 기준으로 텍스트를 분할하는 기능을 제공합니다. 분할된 텍스트는 "span" 태그로 감싸집니다.
2. typeSplit과 lineSplit이라는 변수를 선언합니다.
3. runSplit() 함수를 정의합니다. 이 함수 내에서 typeSplit 변수는 .highlighted-text 클래스를 기준으로 텍스트를 줄, 단어, 문자로 분할합니다. lineSplit 변수는 "[split-lines]" 태그를 기준으로 텍스트를 줄 단위로 분할합니다.

- 따라서, 이 코드는 주어진 HTML 문서에서 특정 태그나 클래스를 기준으로 텍스트를 분할하는 기능을 구현하는 것을 목적으로 합니다.