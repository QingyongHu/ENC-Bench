# ENC-Bench Project Page

Academic project page for:

> **ENC-Bench: A Benchmark for Evaluating Multimodal Large Language Models in Electronic Navigational Chart Understanding**
> CVPR 2026

**Live page:** https://QingyongHu.github.io/ENC-Bench/

---

## Quick Start

No build step required. Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

---

## File Structure

```
index.html              # Main project page
dataset.html            # Dataset page (Coming Soon)
static/
  css/style.css         # Custom styles (overrides Bulma)
  js/index.js           # Interactive components
  images/
    teaser-overview.png
    dataset-comparison.png
    benchmark-result.png
    pipeline.png
    key-statistics.png
    symbology-types.png
    error-distribution.png
    google-vs-enc-comparison.png
    bio/                # Author photos (ao-cheng.jpg, etc.)
README.md
```

---

## Before Publishing (Required Steps)

### 1. Update the arXiv link
In `index.html`, replace:
```html
href="https://arxiv.org/abs/2506.XXXXX"
```
with the actual arXiv URL after submission.

### 2. Register ClustrMaps visitor widget
1. Go to https://clustrmaps.com and sign up (free)
2. Enter your GitHub Pages URL: `https://QingyongHu.github.io/ENC-Bench/`
3. Copy the widget script ID (the `d=` parameter value)
4. In `index.html`, replace `REPLACE_WITH_YOUR_CLUSTRMAP_ID` with your actual ID

### 3. Update the benchmark results table
In `index.html`, find the results table (section `#results`) and fill in the
actual accuracy numbers for all 10 models from the paper.

### 4. Enable GitHub Pages
After pushing, go to the repository **Settings → Pages** and set:
- Source: **Deploy from a branch**
- Branch: `main` / `master`, folder: `/ (root)`

---

## Adding or Replacing Images

All images are in `static/images/`. To replace a figure:

| Image slot | File to replace |
|---|---|
| Hero teaser | `static/images/teaser-overview.png` |
| Comparison slider | `static/images/google-vs-enc-comparison.png` |
| Benchmark results | `static/images/benchmark-result.png` |
| Pipeline figure | `static/images/pipeline.png` |
| Dataset statistics | `static/images/key-statistics.png` |
| Symbology types | `static/images/symbology-types.png` |
| Error distribution | `static/images/error-distribution.png` |
| Dataset comparison | `static/images/dataset-comparison.png` |
| Author photos | `static/images/bio/<name>.jpg` |

Just replace the file with the same name — no HTML changes needed.

---

## CDN Libraries Used

| Library | Purpose |
|---|---|
| [Bulma 0.9.4](https://bulma.io) | CSS layout framework |
| [Font Awesome 6.4](https://fontawesome.com) | Icons |
| [Academicons](https://jpswalsh.github.io/academicons/) | arXiv, Google Scholar icons |
| [img-comparison-slider](https://img-comparison-slider.sneas.io/) | Before/after drag slider |
| [SimpleLightbox](https://simplelightbox.com/) | Gallery lightbox |
| [ClustrMaps](https://clustrmaps.com) | Visitor world map |
| [Inter](https://fonts.google.com/specimen/Inter) | Typography (Google Fonts) |

---

## Credits

Website design inspired by [Nerfies](https://nerfies.github.io) and the
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template).
