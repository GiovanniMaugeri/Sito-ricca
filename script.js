// Video play and polaroid animation
// flags = videoGoKartDone, videoSpottedDone, videoPaintballDone
// implementing with array to make a reference pass in js
let flags = [false, false, false];

const chatVideos = [
    document.getElementById("chatVideoGoKart"),
    document.getElementById("chatVideoSpotted"),
    document.getElementById("chatVideoPaintball")
];

chatVideos.forEach((video, index) => {
    if (!video) return;
    video.addEventListener("ended", (e) => videoEnded(e, flags, index));
});

function videoEnded(target, flag, index) {
    flag[index] = true;
    target.target.parentElement.childNodes[1].classList.add("activated");
}

// Play video when it enters the viewport (inline, no fullscreen on iOS)
const playWhenVisible = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const video = entry.target;
        const index = chatVideos.indexOf(video);
        if (index === -1 || flags[index]) return;
        video.muted = true;
        video.playbackRate = 1.5;
        const result = video.play();
        if (result && typeof result.catch === "function") {
            result.catch(() => { /* autoplay blocked: ignore, user can scroll freely */ });
        }
    });
}, { threshold: 0.4 });

chatVideos.forEach((video) => {
    if (video) playWhenVisible.observe(video);
});

document.getElementById("scrollDownBtn").addEventListener("click", function() {
    window.scroll({
        top: window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight,
        left: 0,
        behavior: 'smooth'
    });
});
