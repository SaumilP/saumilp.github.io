/* copy-code.js — wraps code blocks with a header bar (language + copy button). */
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
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var CHECK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  var TERMINAL = ["bash", "sh", "shell", "zsh", "console", "shell-session"];
  var CONFIG = ["toml", "yaml", "yml", "json", "ini", "conf", "dotenv", "env", "xml"];

  function kindFor(lang) {
    if (TERMINAL.indexOf(lang) !== -1) return "terminal";
    if (CONFIG.indexOf(lang) !== -1) return "config";
    return "code";
  }

  function labelFor(lang, kind) {
    if (!lang) return kind === "terminal" ? "Terminal" : "Code";
    if (kind === "terminal") return "Terminal";
    return lang;
  }

  blocks.forEach(function (pre) {
    if (pre.parentElement && pre.parentElement.classList.contains("code-block")) return;

    var lang = (pre.getAttribute("data-lang") || "").toLowerCase();
    var kind = kindFor(lang);
    var name = pre.getAttribute("data-name"); // optional filename (Zola name=)

    var wrap = document.createElement("div");
    wrap.className = "code-block";
    wrap.setAttribute("data-kind", kind);
    pre.parentNode.insertBefore(wrap, pre);

    var header = document.createElement("div");
    header.className = "code-block__header";

    var langEl = document.createElement("span");
    langEl.className = "code-block__lang";
    var dot = document.createElement("span");
    dot.className = "code-block__dot";
    dot.setAttribute("aria-hidden", "true");
    langEl.appendChild(dot);
    langEl.appendChild(document.createTextNode(labelFor(lang, kind)));
    if (name) {
      var nameEl = document.createElement("span");
      nameEl.className = "code-block__name";
      nameEl.textContent = name;
      langEl.appendChild(nameEl);
    }

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-block__copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");
    btn.innerHTML = COPY + "<span>Copy</span>";

    header.appendChild(langEl);
    header.appendChild(btn);
    wrap.appendChild(header);
    wrap.appendChild(pre);

    btn.addEventListener("click", function () {
      var code = pre.querySelector("code") || pre;
      var text = code.innerText; // code text only — never the button/labels
      copy(text, function (ok) {
        if (ok) {
          btn.classList.add("is-copied");
          btn.innerHTML = CHECK + "<span>Copied</span>";
          btn.setAttribute("aria-label", "Code copied");
        } else {
          btn.innerHTML = COPY + "<span>Select manually</span>";
        }
        setTimeout(function () {
          btn.classList.remove("is-copied");
          btn.innerHTML = COPY + "<span>Copy</span>";
          btn.setAttribute("aria-label", "Copy code to clipboard");
        }, 2000);
      });
    });
  });

  function copy(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { fallback(text, done); }
      );
    } else {
      fallback(text, done);
    }
  }

  function fallback(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      done(ok);
    } catch (e) {
      done(false);
    }
  }
})();
