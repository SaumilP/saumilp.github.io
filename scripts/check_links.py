#!/usr/bin/env python3
"""Validate internal links and local asset references in the built Zola site.

Usage: python3 scripts/check_links.py [public_dir]

Scans every generated .html file, extracts href/src targets, and verifies that
each internal target (absolute base_url link or root-relative path) resolves to
a real file in the output directory. Exits non-zero if any are broken.
"""
import os
import re
import sys
import glob

ROOT = sys.argv[1] if len(sys.argv) > 1 else "public"


def base_url():
    try:
        with open("config.toml", encoding="utf-8") as fh:
            for line in fh:
                m = re.match(r'\s*base_url\s*=\s*"([^"]+)"', line)
                if m:
                    return m.group(1).rstrip("/")
    except OSError:
        pass
    return ""


BASE = base_url()
HREF = re.compile(r'(?:href|src)=["\']?([^"\'> ]+)')


def resolves(url):
    u = url.split("#")[0].split("?")[0]
    if BASE and u.startswith(BASE):
        u = u[len(BASE):]
    if not u.startswith("/"):
        return True  # relative asset, external, or anchor-only
    p = u.lstrip("/")
    if p == "":
        return os.path.exists(f"{ROOT}/index.html")
    return any(
        os.path.exists(c)
        for c in (f"{ROOT}/{p}", f"{ROOT}/{p}/index.html", f"{ROOT}/{p}index.html")
    )


def main():
    broken, checked = set(), 0
    for f in glob.glob(f"{ROOT}/**/*.html", recursive=True):
        html = open(f, encoding="utf-8", errors="ignore").read()
        for target in HREF.findall(html):
            if target.startswith(("mailto:", "data:", "javascript:", "#", "tel:")):
                continue
            if target.startswith("http") and not (BASE and target.startswith(BASE)):
                continue  # external link
            checked += 1
            if not resolves(target):
                broken.add((os.path.relpath(f, ROOT), target))
    print(f"Checked {checked} internal references in {ROOT}/")
    if broken:
        print(f"BROKEN ({len(broken)}):")
        for f, u in sorted(broken):
            print(f"  {f}  ->  {u}")
        sys.exit(1)
    print("No broken internal links or local assets. OK")


if __name__ == "__main__":
    main()
