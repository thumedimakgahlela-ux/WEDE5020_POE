/* main.js - shared interactivity: accordion, tabs, lightbox gallery, service modal helpers.
   Loaded on every page; each feature only runs if its elements exist. */
'use strict';

/* ---------- Accordion (aria-expanded toggles, one open at a time) ---------- */
document.querySelectorAll('.accordion').forEach(function (acc) {
    var buttons = acc.querySelectorAll('.acc-btn');
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var open = btn.getAttribute('aria-expanded') === 'true';
            buttons.forEach(function (b) { // close all first
                b.setAttribute('aria-expanded', 'false');
                document.getElementById(b.getAttribute('aria-controls')).classList.remove('open');
            });
            if (!open) { // then open the one that was clicked
                btn.setAttribute('aria-expanded', 'true');
                document.getElementById(btn.getAttribute('aria-controls')).classList.add('open');
            }
        });
    });
});

/* ---------- Tabs (click + arrow-key navigation) ---------- */
document.querySelectorAll('.tabs').forEach(function (tabs) {
    var tabList = Array.from(tabs.querySelectorAll('[role="tab"]'));
    function select(tab) {
        tabList.forEach(function (t) {
            var on = t === tab;
            t.setAttribute('aria-selected', on);
            t.tabIndex = on ? 0 : -1;
            document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
        tab.focus();
    }
    tabList.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') select(tabList[(i + 1) % tabList.length]);
            if (e.key === 'ArrowLeft') select(tabList[(i - 1 + tabList.length) % tabList.length]);
        });
    });
});

/* ---------- Gallery with lightbox ---------- */
(function () {
    var thumbs = Array.from(document.querySelectorAll('.gallery button'));
    var box = document.getElementById('lightbox');
    if (!thumbs.length || !box) return;
    var img = box.querySelector('.lightbox-img');
    var cap = box.querySelector('.lb-caption');
    var current = 0;

    function show(i) {
        current = (i + thumbs.length) % thumbs.length;
        var t = thumbs[current].querySelector('img');
        img.src = thumbs[current].dataset.full || t.src; // larger image if provided
        img.alt = t.alt;
        cap.textContent = thumbs[current].dataset.caption || t.alt;
    }
    thumbs.forEach(function (btn, i) {
        btn.addEventListener('click', function () { show(i); box.showModal(); });
    });
    box.querySelector('.prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.next').addEventListener('click', function () { show(current + 1); });
    box.querySelector('.dlg-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); }); // click backdrop
    box.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
    });
})();

/* ---------- Close any plain modal via its close button / backdrop ---------- */
document.querySelectorAll('dialog.modal').forEach(function (dlg) {
    dlg.querySelector('.dlg-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
});

/* ---------- Mobile navigation toggle (button is hidden by CSS on desktop) ---------- */
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.textContent = isOpen ? '\u2715 Close' : '\u2630 Menu';
    });
})();
