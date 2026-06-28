/* toc.js — scrollspy for the table of contents + reading progress bar. */
(function () {
  "use strict";

  // ---- Reading progress ----
  var bar = document.getElementById("read-progress");
  var article = document.querySelector(".article");
  if (bar && article) {
    var update = function () {
      var rect = article.getBoundingClientRect();
      var total = article.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  // ---- TOC scrollspy ----
  var tocNav = document.getElementById("toc-nav");
  if (!tocNav || !("IntersectionObserver" in window)) return;

  var links = Array.prototype.slice.call(tocNav.querySelectorAll(".toc__link"));
  if (!links.length) return;

  var map = {};
  var headings = [];
  links.forEach(function (link) {
    var id = decodeURIComponent((link.getAttribute("href") || "").slice(1));
    var el = id && document.getElementById(id);
    if (el) {
      map[id] = link;
      headings.push(el);
    }
  });

  var current = null;
  var setActive = function (id) {
    if (current === id) return;
    if (current && map[current]) map[current].classList.remove("is-active");
    if (map[id]) map[id].classList.add("is-active");
    current = id;
  };

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "0px 0px -75% 0px", threshold: 0 }
  );
  headings.forEach(function (h) {
    observer.observe(h);
  });
})();
