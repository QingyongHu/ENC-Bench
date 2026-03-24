/* ============================================================
   ENC-Bench Project Page — Main JavaScript
   ============================================================ */

'use strict';

// ============================================================
// 1. DOMContentLoaded: init all interactive components
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

  // -- SimpleLightbox gallery --
  if (typeof SimpleLightbox !== 'undefined') {
    new SimpleLightbox('.gallery-item', {
      captionsData: 'title',
      captionDelay: 200,
      animationSpeed: 180,
      fadeSpeed: 120,
      overlayOpacity: 0.94,
      loop: true,
    });
  }

  // -- Smooth scroll for in-page anchor links --
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.enc-nav') ? document.querySelector('.enc-nav').offsetHeight : 60;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // -- Fade-in on scroll (IntersectionObserver) --
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('enc-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.enc-fade-in').forEach(function (el) {
    fadeObserver.observe(el);
  });

  // -- Stats counter animation (triggered when stats bar enters view) --
  var statsBar = document.querySelector('.enc-stats-bar');
  if (statsBar) {
    var statsAnimated = false;
    var statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.enc-stat-number[data-target]').forEach(function (el) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target, 1100);
        });
        statsObserver.unobserve(statsBar);
      }
    }, { threshold: 0.4 });
    statsObserver.observe(statsBar);
  }

  // -- Active nav link highlight on scroll --
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.enc-nav-links a');

  if (navLinks.length > 0) {
    var scrollSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove('enc-nav-active');
          });
          var activeLink = document.querySelector('.enc-nav-links a[href="#' + entry.target.id + '"]');
          if (activeLink) activeLink.classList.add('enc-nav-active');
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(function (section) {
      scrollSpy.observe(section);
    });
  }

});

// ============================================================
// 2. Stats counter animation (ease-out cubic)
// ============================================================
function animateCounter(el, target, duration) {
  var start = performance.now();
  function step(timestamp) {
    var elapsed = timestamp - start;
    var progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    var ease = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(target * ease);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

// ============================================================
// 3. BibTeX copy-to-clipboard (global — called by onclick)
// ============================================================
function copyBibTeX() {
  var bibtexEl = document.getElementById('bibtex-content');
  if (!bibtexEl) return;

  // Get inner text (strips HTML tags like <code>)
  var bibtexText = bibtexEl.innerText || bibtexEl.textContent;

  if (navigator.clipboard && window.isSecureContext) {
    // Modern async Clipboard API (requires HTTPS or localhost)
    navigator.clipboard.writeText(bibtexText).then(showCopySuccess).catch(fallbackCopy);
  } else {
    // Fallback for file:// protocol or older browsers
    fallbackCopy();
  }
}

function showCopySuccess() {
  var btn  = document.getElementById('bibtex-copy-btn');
  var icon = document.getElementById('bibtex-copy-icon');
  var text = document.getElementById('bibtex-copy-text');
  if (!btn) return;

  btn.classList.add('is-success');
  if (icon) icon.className = 'fas fa-check';
  if (text) text.textContent = 'Copied!';

  setTimeout(function () {
    btn.classList.remove('is-success');
    if (icon) icon.className = 'fas fa-copy';
    if (text) text.textContent = 'Copy';
  }, 2200);
}

function fallbackCopy() {
  var el = document.getElementById('bibtex-content');
  if (!el) return;
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  try {
    var success = document.execCommand('copy');
    if (success) showCopySuccess();
  } catch (err) {
    console.warn('ENC-Bench: clipboard copy failed', err);
  }
  sel.removeAllRanges();
}
