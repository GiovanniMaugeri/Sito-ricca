// Reveal on scroll
(function () {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
        els.forEach(function (el) { el.classList.add("visible"); });
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
})();

// Chat messages appear one-by-one
(function () {
    var chat = document.getElementById("appChat");
    var messages = document.querySelectorAll("#chatMessages .chat-msg");
    if (!chat || !messages.length) return;

    var started = false;

    function playMessages() {
        if (started) return;
        started = true;
        messages.forEach(function (msg) {
            var step = parseInt(msg.getAttribute("data-step") || "0", 10);
            setTimeout(function () {
                msg.classList.add("is-visible");
            }, 400 + step * 750);
        });
    }

    if (!("IntersectionObserver" in window)) {
        playMessages();
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                playMessages();
                io.disconnect();
            }
        });
    }, { threshold: 0.35 });

    io.observe(chat);
})();

// Duplicate marquee content for seamless loop
(function () {
    var track = document.getElementById("marqueeTrack");
    if (!track) return;
    track.innerHTML = track.innerHTML + track.innerHTML;
})();

// Scroll hint
var scrollBtn = document.getElementById("scrollDownBtn");
if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
        var next = document.querySelector(".strip-type");
        if (next) {
            next.scrollIntoView({ behavior: "smooth" });
            return;
        }
        window.scroll({ top: window.innerHeight, left: 0, behavior: "smooth" });
    });
}
