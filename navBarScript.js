window.addEventListener("load", function () {
    var nav = document.querySelector("header nav");
    var cross = document.getElementById("nav-cross");
    var burger = document.getElementById("burger-menu");
    var header = document.querySelector("header");

    function openNav() {
        if (!nav) return;
        nav.classList.add("open");
        document.body.classList.add("nav-open");
        if (header) header.classList.add("menu-open");
    }

    function closeNav() {
        if (!nav) return;
        nav.classList.remove("open");
        document.body.classList.remove("nav-open");
        if (header) header.classList.remove("menu-open");
    }

    if (burger && nav) {
        burger.addEventListener("click", function (e) {
            e.stopPropagation();
            openNav();
        });
    }

    if (cross && nav) {
        cross.addEventListener("click", function (e) {
            e.stopPropagation();
            closeNav();
        });
    }

    if (nav) {
        // Chiudi cliccando lo sfondo scuro (fuori dal pannello bianco)
        nav.addEventListener("click", function (e) {
            if (e.target === nav) closeNav();
        });

        nav.querySelectorAll("a").forEach(function (item) {
            item.addEventListener("click", function () {
                closeNav();
            });
        });
    }

    // Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeNav();
    });

    if (header) {
        function onScroll() {
            header.classList.toggle("scrolled", window.scrollY > 24);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }
});
