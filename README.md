# Tesseract website

Live at https://tesseract-engineering.github.io (GitHub Pages, deployed from `main`).

| File | What it is |
|---|---|
| `page.html` | The page source. Edit this one. |
| `index.html` | What Pages serves, generated from `page.html`. |
| `build.py` | `python build.py` regenerates `index.html`. Commit both. |

Preview locally with `python -m http.server 8095`, then open http://localhost:8095.
