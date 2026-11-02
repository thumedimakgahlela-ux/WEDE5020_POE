/* services.js - builds the service cards from data with JavaScript (dynamic content),
   plus search, category filter and sort. Cost figures are illustrative; edit as needed. */
'use strict';

// Exposed on window so forms.js can reuse the same prices on the enquiry page.
window.UBUNTU_SERVICES = [
    { id: 'youth',      name: 'Youth empowerment',        category: 'Youth',      cost: 350, description: 'Workshops and community projects that build confidence and give young people a voice.', details: 'Weekly sessions run by trained facilitators, with a showcase event at the end of each term.' },
    { id: 'lifeskills', name: 'Life-skills training',     category: 'Skills',     cost: 300, description: 'Practical training in money management, communication and problem solving.', details: 'Small groups of up to 20 learners, with take-home workbooks and a certificate of completion.' },
    { id: 'leadership', name: 'Leadership programmes',    category: 'Leadership', cost: 450, description: 'Structured programmes that grow the next generation of community leaders.', details: 'Participants plan and lead a community project of their own over six months.' },
    { id: 'career',     name: 'Career guidance',          category: 'Career',     cost: 250, description: 'CV writing, interview practice and advice on study and work options.', details: 'One-on-one and group sessions, including job-readiness days with local employers.' },
    { id: 'mentorship', name: 'Mentorship for young people', category: 'Youth',   cost: 400, description: 'Each young person is matched with a mentor who walks the journey with them.', details: 'Mentors meet their mentee at least twice a month and receive training and ongoing support.' }
];

(function () {
    var list = document.getElementById('service-list');
    if (!list) return;
    var search = document.getElementById('search');
    var category = document.getElementById('category');
    var sort = document.getElementById('sort');
    var status = document.getElementById('status');
    var modal = document.getElementById('service-modal');
    var data = window.UBUNTU_SERVICES;

    // Fill the category dropdown from the data so it never goes out of date
    Array.from(new Set(data.map(function (s) { return s.category; }))).sort().forEach(function (c) {
        var o = document.createElement('option');
        o.value = c; o.textContent = c;
        category.appendChild(o);
    });

    function render() {
        var q = search.value.trim().toLowerCase();
        var results = data.filter(function (s) {
            var matchText = (s.name + ' ' + s.description).toLowerCase().indexOf(q) !== -1;
            return matchText && (category.value === 'all' || s.category === category.value);
        });
        results.sort(function (a, b) {
            if (sort.value === 'cost-low') return a.cost - b.cost;
            if (sort.value === 'cost-high') return b.cost - a.cost;
            return a.name.localeCompare(b.name);
        });

        list.innerHTML = ''; // clear, then rebuild the DOM
        results.forEach(function (s) {
            var card = document.createElement('article');
            card.className = 'service-card';
            card.innerHTML = '<span class="tag"></span><h3></h3><p></p><button type="button" class="btn">Learn more</button>';
            card.querySelector('.tag').textContent = s.category;
            card.querySelector('h3').textContent = s.name;
            card.querySelector('p').textContent = s.description;
            card.querySelector('button').addEventListener('click', function () { openModal(s); });
            list.appendChild(card);
        });
        status.textContent = results.length
            ? 'Showing ' + results.length + ' of ' + data.length + ' services.'
            : 'No services match your search. Try a different word or clear the filter.';
    }

    function openModal(s) {
        modal.querySelector('h2').textContent = s.name;
        modal.querySelector('.m-desc').textContent = s.description + ' ' + s.details;
        modal.querySelector('.m-cost').textContent = 'Sponsorship: R' + s.cost + ' per participant per month';
        modal.showModal();
    }

    [search, category, sort].forEach(function (el) { el.addEventListener('input', render); });
    render();
})();
