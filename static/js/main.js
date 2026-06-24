/* ====================================================================
   PANAH STUDIOS — main.js
   Small, focused scripts only. No framework, no build step.
   Behavior is static after the initial load: each block below wires
   up one UI affordance once, then stays idle.
   ==================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------
     1. Mobile nav toggle
     ------------------------------------------------------------------ */
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the mobile menu after a nav link is used
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     2. Header background toggle on scroll
        (transparent over the hero, solid once the user scrolls)
     ------------------------------------------------------------------ */
  var header = document.getElementById("site-header");

  if (header) {
    var SCROLL_THRESHOLD = 60;
    var ticking = false;

    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateHeader(); // set correct state on load (e.g. mid-scroll refresh)
  }

  /* ------------------------------------------------------------------
     3. Scroll-reveal for sections
        Elements are visible by default (see CSS .reveal fallback);
        this only adds the gentle fade/rise once they enter view.
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ------------------------------------------------------------------
     4. Hero scroll cue — jumps to the next section
     ------------------------------------------------------------------ */
  var scrollCue = document.getElementById("scroll-cue");

  if (scrollCue) {
    scrollCue.addEventListener("click", function () {
      var hero = scrollCue.closest(".hero");
      var next = hero ? hero.nextElementSibling : null;
      if (next) {
        next.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  }
})();
