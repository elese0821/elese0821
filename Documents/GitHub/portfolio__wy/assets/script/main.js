// ————— Type split
let splitText = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
});

// setting
gsap.set("#mainSection", {
    display: "none",
});
gsap.set(".item", {
    pointerEvents: "none",
    scaleY: 0,
});

gsap.set($(".item").find(".char"), {
    yPercent: 100,
});

gsap.set(".wonyoungWrap", {
    display: "grid",
});

gsap.set($(".wonyoungWrap").find(".char"), {
    yPercent: 150,
});

gsap.set("#mainSection", {
    display: "grid",
});

gsap.set(".title_wrap", {
    display: "none",
});
gsap.set($(".title_wrap").find(".char"), {
    yPercent: "100",
});
gsap.set($(".title_wrap").find(".char"), {
    yPercent: "100",
});

gsap.defaults({
    ease: "power3.inOut",
    duration: 0.8,
});


// page load

window.onload = function () {
    gsap.to($(".wonyoung").find(".char"), {
        yPercent: 1,
        duration: 1,
        stagger: { amount: 0.3 },
        onComplete: function () {
            gsap.delayedCall(0, function () {
                gsap.to(".item", {
                    scaleY: 1,
                    duration: 1,
                    stagger: { amount: 0.2 },
                });
                gsap.to($(".item").find(".char"), {
                    yPercent: 0,
                    delay: 0.3,
                    stagger: { amount: 0.4, from: "start" },
                });
                gsap.delayedCall(0, function () {
                    gsap.set(".item", { pointerEvents: "auto" });
                    gsap.to($(".wonyoungWrap").find(".char"), {
                        yPercent: -150,
                        duration: 0.8,
                        stagger: { amount: 0.2 },
                        onComplete: function () {
                            gsap.set('.wonyoung', {
                                display: "none",
                            })
                            gsap.set(".title_wrap", {
                                display: "block",
                            });
                            gsap.to($(".title_wrap").find(".char"), {
                                yPercent: 1,
                                duration: 1,
                                stagger: { amount: 0.2 },
                            })
                        }
                    });
                });
            });
        },
    });
}

// item hover

const links = document.querySelectorAll(".item");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseover", function () {
        const index = i;
        const linkTextTop = $(".item")
            .eq(index)
            .find(".text-reg")
            .find(".char");
        const linkTextBtm = $(".item")
            .eq(index)
            .find(".text-reg")
            .find(".char");
        gsap.fromTo(linkTextTop, {
            yPercent: 0,
        }, {
            yPercent: -100,
            stagger: { amount: 0.4 },
            delay: 0,
            overwrite: true
        });
        gsap.fromTo(linkTextBtm, {
            yPercent: 0,
        }, {
            yPercent: -100,
            stagger: { amount: 0.4 },
            delay: 0.1,
            overwrite: true
        });
    });

    links[i].addEventListener("mouseout", function () {
        const index = i;
        const linkTextTop = $(".item")
            .eq(index)
            .find(".text-reg")
            .find(".char");
        const linkTextBtm = $(".item")
            .eq(index)
            .find(".text-reg")
            .find(".char");
        gsap.set(linkTextBtm, {
            yPercent: 0,
            duration: 0.6,
            overwrite: true
        });
        gsap.set(linkTextTop, {
            yPercent: 0,
            duration: 0.6,
            overwrite: true
        });
    });
}

// 페이지 전환 효과
let gridItems = Array.from(document.querySelectorAll(".item"));
let exitDurationMS = 1000;

gridItems.forEach((gridItem, index) => {
    gridItem.addEventListener("click", function (e) {
        if (
            // $(this).prop("hostname") === window.location.host &&
            $(this).children().attr("href").indexOf("#") === -1 &&
            $(this).children().attr("target") !== "_blank"
        ) {
            e.preventDefault();
            let transitionURL = $(this).children().attr("href");
            let before = gridItems.slice(0, index).reverse();
            let after = gridItems.slice(index + 1);
            let outwardLinks = [];

            for (let i = 0; i < Math.max(before.length, after.length); i++) {
                if (before[i]) outwardLinks.push(before[i]);
                if (after[i]) outwardLinks.push(after[i]);
            }

            outwardLinks.unshift(gridItem);

            gsap.to($(".title_wrap").find(".char"), {
                yPercent: 300,
                duration: 1.2,
                stagger: { amount: 0.3 },
            })
            gsap.fromTo(
                ".text-reg",
                {
                    opacity: 1,
                    yPercent: 0
                },
                {
                    opacity: 0,
                    yPercent: 50,
                    duration: 0.6,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(outwardLinks, { padding: 0 });
                    }
                }
            );
            gsap.fromTo(
                outwardLinks,
                {
                    height: "100%"
                },
                {
                    height: "0%",
                    stagger: { amount: 0.2 },
                    ease: "power4.inOut"
                }
            );

            setTimeout(function () {
                window.location = transitionURL;
            }, exitDurationMS);
        }
    });
});
