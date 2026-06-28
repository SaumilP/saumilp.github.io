/* search.js — modal + lazy-loaded Pagefind UI, with focus management. */
(function () {
  "use strict";
  var modal = document.getElementById("search-modal");
  if (!modal) return;

  var openers = document.querySelectorAll("[data-search-open]");
  var closers = modal.querySelectorAll("[data-search-close]");
  var hint = modal.querySelector("[data-search-hint]");
  var lastFocused = null;
  var loaded = false;

  var BASE = "/pagefind/";

  function loadPagefind() {
    if (loaded) return;
    loaded = true;
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = BASE + "pagefind-ui.css";
    document.head.appendChild(css);

    var script = document.createElement("script");
    script.src = BASE + "pagefind-ui.js";
    script.onload = function () {
      if (window.PagefindUI) {
        if (hint) hint.style.display = "none";
        new window.PagefindUI({
          element: "#pagefind-search",
          showImages: false,
          showSubResults: true,
          resetStyles: false,
        });
        focusInput();
      }
    };
    script.onerror = function () {
      if (hint) hint.textContent = "Search is unavailable right now.";
      loaded = false;
    };
    document.body.appendChild(script);
  }

  function focusInput() {
    setTimeout(function () {
      var input = modal.querySelector("input");
      if (input) input.focus();
    }, 60);
  }

  function open() {
    lastFocused = document.activeElement;
    modal.setAttribute("data-open", "true");
    document.body.style.overflow = "hidden";
    loadPagefind();
    focusInput();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    modal.setAttribute("data-open", "false");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function isOpen() {
    return modal.getAttribute("data-open") === "true";
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Tab") trapFocus(e);
  }

  function trapFocus(e) {
    var focusable = modal.querySelectorAll(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    var list = Array.prototype.filter.call(focusable, function (el) {
      return el.offsetParent !== null;
    });
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  openers.forEach(function (btn) {
    btn.addEventListener("click", open);
  });
  closers.forEach(function (btn) {
    btn.addEventListener("click", close);
  });

  // Global shortcut: Cmd/Ctrl + K, and "/" when not typing.
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      isOpen() ? close() : open();
    } else if (
      e.key === "/" &&
      !isOpen() &&
      !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) &&
      !document.activeElement.isContentEditable
    ) {
      e.preventDefault();
      open();
    }
  });
})();
