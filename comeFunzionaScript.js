// Animazione "reveal": gli elementi con classe .reveal compaiono
// con un fade + slide quando entrano nello schermo durante lo scroll.
(function () {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
        els.forEach(function (el) { el.classList.add("visible"); });
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    els.forEach(function (el) { io.observe(el); });
})();
