// home.js — small enhancements for the landing page. Everything works without it.
(function () {
    // Mobile menu
    var toggle = document.querySelector(".nav__toggle");
    var links = document.getElementById("nav-links");
    if (toggle && links) {
        toggle.addEventListener("click", function () {
            var open = links.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        });
        links.addEventListener("click", function (e) {
            if (e.target.closest("a")) {
                links.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "Open menu");
            }
        });
    }

    // Border under the nav once the page scrolls
    var nav = document.getElementById("nav");
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Demo reel: load the YouTube player only when clicked (faster first load)
    var reel = document.getElementById("reel");
    if (reel) {
        reel.querySelector(".reel__play").addEventListener("click", function () {
            var iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube-nocookie.com/embed/" + reel.dataset.video + "?autoplay=1&rel=0";
            iframe.title = "Patricio Landa — demo reel";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            reel.innerHTML = "";
            reel.appendChild(iframe);
        });
    }

    // Fade sections in as they scroll into view
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("is-visible"); });
        return;
    }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
})();
