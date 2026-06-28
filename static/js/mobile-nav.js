/* mobile-nav.js — accessible mobile navigation toggle. */
(function () {
  "use strict";
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("mobile-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.setAttribute("data-open", open ? "true" : "false");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var openIcon = toggle.querySelector(".nav-toggle__open");
    var closeIcon = toggle.querySelector(".nav-toggle__close");
    if (openIcon) openIcon.hidden = open;
    if (closeIcon) closeIcon.hidden = !open;
  }

  toggle.addEventListener("click", function () {
    setOpen(nav.getAttribute("data-open") !== "true");
  });

  // Close when a link is chosen.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  // Close on Escape and return focus to the toggle.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset when resizing up to desktop.
  var mq = window.matchMedia("(min-width: 800px)");
  mq.addEventListener("change", function (e) {
    if (e.matches) setOpen(false);
  });
})();
