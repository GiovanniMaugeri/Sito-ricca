var prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal on scroll, a cascata fra elementi vicini
(function () {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
        els.forEach(function (el) { el.classList.add("visible"); });
        return;
    }

    // Ogni .reveal parte leggermente dopo i fratelli che la precedono,
    // così i blocchi entrano a onda invece che tutti insieme.
    els.forEach(function (el) {
        if (prefersReducedMotion || !el.parentElement) return;
        var siblings = Array.prototype.filter.call(
            el.parentElement.children,
            function (n) { return n.classList && n.classList.contains("reveal"); }
        );
        var i = siblings.indexOf(el);
        if (i > 0) el.style.setProperty("--d", Math.min(i, 5) * 90 + "ms");
    });

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
})();

// Barra di avanzamento lettura
(function () {
    if (prefersReducedMotion) return;

    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var ticking = false;

    function update() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? window.scrollY / max : 0;
        bar.style.setProperty("--progress", Math.min(1, Math.max(0, p)));
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener("resize", update, { passive: true });
    update();
})();

// Video promo: muto in loop, senza controlli. Se il tab non è visibile
// lo mettiamo in pausa, così non consuma batteria e dati a vuoto.
(function () {
    var video = document.getElementById("promoVideo");
    if (!video) return;

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(function () {});
        }
    });
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
