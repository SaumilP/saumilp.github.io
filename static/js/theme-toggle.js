/* theme-toggle.js — light/dark toggle with persistence and syntax-sheet swap. */
(function () {
  "use strict";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function syncIcons(theme) {
    if (!toggle) return;
    var moon = toggle.querySelector(".theme-icon-light");
    var sun = toggle.querySelector(".theme-icon-dark");
    if (moon) moon.hidden = theme === "dark";
    if (sun) sun.hidden = theme !== "dark";
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var light = document.getElementById("hl-light");
    var dark = document.getElementById("hl-dark");
    if (light && dark) {
      light.disabled = theme === "dark";
      dark.disabled = theme !== "dark";
    }
    syncIcons(theme);
  }

  // Sync icons to the theme the inline head script already applied.
  syncIcons(currentTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      // Spin the icon before swapping it so the motion feels intentional.
      toggle.classList.add("is-spinning");
      toggle.addEventListener("animationend", function () {
        toggle.classList.remove("is-spinning");
      }, { once: true });

      var next = currentTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      applyTheme(next);
    });
  }

  // React to OS changes only when the user hasn't chosen explicitly.
  try {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  } catch (e) {}
})();
