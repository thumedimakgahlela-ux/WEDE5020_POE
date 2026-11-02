/* map.js - interactive Leaflet map (OpenStreetMap tiles) for the Contact page.
   !! Replace BRANCH with the foundation's real coordinates (right-click a spot in Google/OpenStreetMap). */
'use strict';
(function () {
    var el = document.getElementById('map');
    if (!el) return;
    if (typeof L === 'undefined') { // Leaflet failed to load (offline) - show a plain fallback
        el.innerHTML = '<p style="padding:20px">The map could not load. Please check your internet connection.</p>';
        return;
    }
    var BRANCH = { lat: -26.2041, lng: 28.0473, name: 'Ubuntu Rise Foundation' };
    var map = L.map('map').setView([BRANCH.lat, BRANCH.lng], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([BRANCH.lat, BRANCH.lng]).addTo(map)
        .bindPopup('<strong>' + BRANCH.name + '</strong><br>Mon-Fri 07:00-17:00<br>Sat 09:00-13:00')
        .openPopup();
})();
