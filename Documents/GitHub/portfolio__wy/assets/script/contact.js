gsap.set('#contactSection', {
    opacity: 0,
    yPercent: 5,
})

window.onload = () => {
    gsap.set('#contactSection', {
        display: "block"
    })
    gsap.to("#contactSection", {
        opacity: 1,
        yPercent: 0,
        duration: 1,
    })
}