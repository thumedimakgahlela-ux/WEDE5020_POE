/* ============================================================
   Ubuntu rise Foundation — mobile navigation toggle
   Shows/hides the nav links on tablet and mobile screens.
   (The button is hidden by CSS on desktop widths.)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.textContent = isOpen ? '\u2715 Close' : '\u2630 Menu';
    });
});
