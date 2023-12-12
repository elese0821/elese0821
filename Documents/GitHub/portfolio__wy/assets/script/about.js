
// 
gsap.set("#aboutsection", {
    yPercent: 10,
    opacity: 0,
});
gsap.set('#aboutsection', {
    display: 'block',
})
// 페이지 로드
window.onload = function () {

    gsap.to("#aboutsection", {
        yPercent: 0,
        opacity: 1,
        duration: 1,
    });
}

// 버튼눌렀을때
homeBtn = document.querySelector(".home a")

homeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let transitionURL = $(this).attr("href");
    gsap.to("#aboutsection", {
        yPercent: 5,
        opacity: 0,
        duration: 1,

    });
    setTimeout(function () {
        window.location = transitionURL;
    }, 1000);
})

// 캐시삭제
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};

// text
gsap.registerPlugin(ScrollTrigger);



// ————— Type split
let splitText = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
});

let typeSplit;
let lineSplit;
function runSplit() {
    typeSplit = new SplitType(".higlighted-text", {
        types: "lines, words, chars"
    });
    lineSplit = new SplitType("[split-lines]", {
        types: "lines"
    });
}
runSplit();


function lineAnimation() {
    $(".higlighted-text").each(function (index) {
        let highlightTl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 28%",
                end: "bottom 30%",
                scrub: 1.1
            }
        });
        highlightTl.fromTo(
            $(this).find(".char"),
            { opacity: 0.4 },
            {
                opacity: 1,
                stagger: { each: 0.5 },
                duration: 1
            }
        );
    });
}
lineAnimation();