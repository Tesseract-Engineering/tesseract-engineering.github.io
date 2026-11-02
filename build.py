"""
build.py - turn page.html into a standalone index.html you can deploy anywhere.

page.html is written as a fragment (title, styles, then the body) so it can also
be published as a Claude artifact. This wraps it in a full HTML document:
everything above the <!-- body --> marker goes in <head>, the rest in <body>.

    python build.py        ->  writes index.html next to this file
"""

from pathlib import Path

HERE = Path(__file__).resolve().parent
page = (HERE / "page.html").read_text(encoding="utf-8")
head, marker, body = page.partition("<!-- body -->")
if not marker:
    raise SystemExit("page.html has no <!-- body --> marker")

html = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n"
    "<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
    f"{head.strip()}\n</head>\n<body>\n{body.strip()}\n</body>\n</html>\n"
)
(HERE / "index.html").write_text(html, encoding="utf-8")
print(f"wrote {HERE / 'index.html'} ({len(html):,} bytes)")
