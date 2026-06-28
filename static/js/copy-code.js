/* copy-code.js — adds a copy button to each code block. */
(function () {
  "use strict";

  // Wrap wide tables so they scroll horizontally instead of breaking layout.
  document.querySelectorAll(".prose table").forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains("table-wrap")) return;
    var wrap = document.createElement("div");
    wrap.className = "table-wrap";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  var blocks = document.querySelectorAll(".prose pre");
  if (!blocks.length) return;

  var COPY =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var CHECK =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  blocks.forEach(function (pre) {
    // Wrap <pre> so the button can be positioned without affecting copy text.
    var wrap = document.createElement("div");
    wrap.className = "code-block";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-code-btn";
    btn.setAttribute("aria-label", "Copy code to clipboard");
    btn.innerHTML = COPY + "<span>Copy</span>";
    wrap.appendChild(btn);

    btn.addEventListener("click", function () {
      var code = pre.querySelector("code") || pre;
      var text = code.innerText;
      var done = function () {
        btn.classList.add("is-copied");
        btn.innerHTML = CHECK + "<span>Copied</span>";
        btn.setAttribute("aria-label", "Code copied");
        setTimeout(function () {
          btn.classList.remove("is-copied");
          btn.innerHTML = COPY + "<span>Copy</span>";
          btn.setAttribute("aria-label", "Copy code to clipboard");
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text, done);
        });
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } catch (e) {}
    document.body.removeChild(ta);
  }
})();
