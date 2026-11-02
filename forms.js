/* forms.js - client-side validation for enquiry.html and contact.html.
   Validates on submit and again as the user corrects fields, shows inline error messages,
   then processes the data (enquiry: cost/availability response, contact: compiled email). */
'use strict';

var CONTACT_EMAIL = 'ubuntu.rise@gmail.com'; // recipient used by the contact form's email

/* ---------- Shared helpers ---------- */
var PHONE_RE = /^(\+27|0)[1-9][0-9]{8}$/;               // South African numbers, e.g. 012 456 7890 or +27 81 456 3760
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var NAME_RE = /^[A-Za-z][A-Za-z '\-]{1,59}$/;            // letters, spaces, hyphens, apostrophes; 2-60 chars

function setError(input, message) {
    var box = document.getElementById(input.id + '-error');
    if (box) box.textContent = message;
    input.classList.toggle('invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
}
function clean(v) { return v.replace(/[\s\-()]/g, ''); }
function isPhone(v) { return PHONE_RE.test(clean(v)); }
function isEmail(v) { return EMAIL_RE.test(v.trim()); }

// Re-validate a field when the user leaves it so errors appear early, and clear them when fixed
function liveValidate(form, validators) {
    Object.keys(validators).forEach(function (id) {
        var el = form.elements[id];
        el.addEventListener('blur', function () { validators[id](el); });
        el.addEventListener('input', function () { if (el.classList.contains('invalid')) validators[id](el); });
    });
}
function runAll(validators, form) {
    var firstBad = null;
    Object.keys(validators).forEach(function (id) {
        var el = form.elements[id];
        if (el.closest('.hidden')) return; // skip fields that are not shown
        if (!validators[id](el) && !firstBad) firstBad = el;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
}
function vName(el) {
    var v = el.value.trim();
    if (!v) return setError(el, 'Please enter your full name.');
    if (!NAME_RE.test(v)) return setError(el, 'Use 2-60 letters only (spaces, hyphens and apostrophes are fine).');
    return setError(el, '');
}
function vMessageLength(el, min, max, required) {
    var v = el.value.trim();
    if (!v && !required) return setError(el, '');
    if (!v) return setError(el, 'Please type your message.');
    if (v.length < min) return setError(el, 'Please write at least ' + min + ' characters (you have ' + v.length + ').');
    if (v.length > max) return setError(el, 'Please keep your message under ' + max + ' characters.');
    return setError(el, '');
}
function counter(el, max) {
    var out = document.getElementById(el.id + '-count');
    if (!out) return;
    function update() { out.textContent = el.value.length + ' / ' + max; }
    el.addEventListener('input', update); update();
}

/* ====================== ENQUIRY PAGE ====================== */
(function () {
    var form = document.getElementById('enquiry-form');
    if (!form) return;
    var result = document.getElementById('enquiry-result');
    var services = window.UBUNTU_SERVICES || [];

    // Fill the programme dropdown from the shared services data
    var programme = form.elements.programme;
    services.forEach(function (s) {
        var o = document.createElement('option');
        o.value = s.id; o.textContent = s.name + ' (R' + s.cost + ' per participant/month)';
        programme.appendChild(o);
    });

    // Date picker cannot select past dates
    var dateInput = form.elements.dateavailability;
    dateInput.min = new Date().toISOString().split('T')[0];

    // Show only the fields that belong to the chosen enquiry type
    var donateFields = document.getElementById('donate-fields');
    var volunteerFields = document.getElementById('volunteer-fields');
    form.elements.service.addEventListener('change', function () {
        donateFields.classList.toggle('hidden', this.value !== 'Donating');
        volunteerFields.classList.toggle('hidden', this.value !== 'Community service');
        result.classList.add('hidden');
    });

    counter(form.elements.message, 500);

    var validators = {
        fullname: vName,
        contactdetails: function (el) {
            var v = el.value.trim();
            if (!v) return setError(el, 'Please enter a phone number or email address.');
            if (!isPhone(v) && !isEmail(v)) return setError(el, 'Enter a valid email (you@email.com) or SA phone number (012 345 6789).');
            return setError(el, '');
        },
        service: function (el) { return setError(el, el.value ? '' : 'Please choose Donating or Community service.'); },
        programme: function (el) { return setError(el, el.value ? '' : 'Please choose a programme to sponsor.'); },
        participants: function (el) {
            var n = Number(el.value);
            return setError(el, Number.isInteger(n) && n >= 1 && n <= 100 ? '' : 'Enter a whole number from 1 to 100.');
        },
        months: function (el) {
            var n = Number(el.value);
            return setError(el, Number.isInteger(n) && n >= 1 && n <= 12 ? '' : 'Enter a whole number from 1 to 12.');
        },
        dateavailability: function (el) {
            if (!el.value) return setError(el, 'Please choose a date you are available.');
            var d = new Date(el.value + 'T00:00:00');
            var today = new Date(); today.setHours(0, 0, 0, 0);
            if (isNaN(d) || d < today) return setError(el, 'Please choose today or a future date.');
            return setError(el, '');
        },
        message: function (el) { return vMessageLength(el, 0, 500, false); }
    };
    liveValidate(form, validators);

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // stop the page reloading; we handle the result in JavaScript
        if (!runAll(validators, form)) { result.classList.add('hidden'); return; }
        var name = form.elements.fullname.value.trim().split(' ')[0];
        var html;

        if (form.elements.service.value === 'Donating') {
            var s = services.filter(function (x) { return x.id === programme.value; })[0];
            var people = Number(form.elements.participants.value);
            var months = Number(form.elements.months.value);
            var total = s.cost * people * months;
            html = '<h3>Thank you, ' + escapeHtml(name) + '!</h3>' +
                '<p>Sponsoring <strong>' + people + '</strong> participant' + (people > 1 ? 's' : '') +
                ' on <strong>' + escapeHtml(s.name) + '</strong> for <strong>' + months + '</strong> month' + (months > 1 ? 's' : '') + ':</p>' +
                '<p>R' + s.cost + ' x ' + people + ' x ' + months + ' = <strong>R' + total.toLocaleString('en-ZA') + '</strong></p>' +
                '<p>We will contact you within 24 hours to arrange payment and confirm the programme start date.</p>';
        } else {
            var d = new Date(form.elements.dateavailability.value + 'T00:00:00');
            var day = d.getDay(); // 0 = Sunday
            var nice = d.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            if (day === 0) {
                html = '<h3>Sorry, we are closed on Sundays</h3><p>' + nice + ' is a Sunday. Please choose a Monday to Saturday instead. Our hours are Mon-Fri 07:00-17:00 and Saturday 09:00-13:00.</p>';
            } else {
                var hours = day === 6 ? '09:00 - 13:00' : '07:00 - 17:00';
                html = '<h3>Great news, ' + escapeHtml(name) + '!</h3><p>We have volunteer spots on <strong>' + nice + '</strong> between <strong>' + hours + '</strong>. Community service is free. We will confirm your placement by email or phone within 24 hours.</p><p><em>Public holidays: we are closed, so we will contact you if your date is affected.</em></p>';
            }
        }
        result.innerHTML = html;
        result.classList.remove('hidden');
        result.setAttribute('tabindex', '-1');
        result.focus();
    });
})();

/* ====================== CONTACT PAGE ====================== */
(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var out = document.getElementById('email-preview');
    counter(form.elements.message, 1000);

    var validators = {
        fullname: vName,
        email: function (el) {
            var v = el.value.trim();
            if (!v) return setError(el, 'Please enter your email address.');
            return setError(el, isEmail(v) ? '' : 'That email address does not look right (e.g. you@email.com).');
        },
        phone: function (el) {
            var v = el.value.trim();
            if (!v) return setError(el, ''); // optional
            return setError(el, isPhone(v) ? '' : 'Enter a valid SA phone number, e.g. 081 456 3760.');
        },
        messagetype: function (el) { return setError(el, el.value ? '' : 'Please choose the type of message.'); },
        message: function (el) { return vMessageLength(el, 20, 1000, true); }
    };
    liveValidate(form, validators);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!runAll(validators, form)) { out.classList.add('hidden'); return; }
        var f = form.elements;
        var subject = '[' + f.messagetype.value + '] Message from ' + f.fullname.value.trim();
        var body = 'Name: ' + f.fullname.value.trim() + '\n' +
                   'Email: ' + f.email.value.trim() + '\n' +
                   'Phone: ' + (f.phone.value.trim() || 'not provided') + '\n' +
                   'Type of message: ' + f.messagetype.value + '\n\n' +
                   f.message.value.trim();

        document.getElementById('email-to').textContent = CONTACT_EMAIL;
        document.getElementById('email-subject').textContent = subject;
        document.getElementById('email-body').textContent = body;
        // encodeURIComponent keeps line breaks and special characters safe inside the mailto link
        document.getElementById('email-send').href = 'mailto:' + CONTACT_EMAIL +
            '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        out.classList.remove('hidden');
        out.setAttribute('tabindex', '-1');
        out.focus();
    });

    // Copy fallback for people without a desktop email app
    document.getElementById('email-copy').addEventListener('click', function () {
        var text = 'To: ' + CONTACT_EMAIL + '\nSubject: ' + document.getElementById('email-subject').textContent +
                   '\n\n' + document.getElementById('email-body').textContent;
        var btn = this;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () { btn.textContent = 'Copied!'; });
        }
    });
})();

// Prevents user-typed text from being interpreted as HTML when we build the result message
function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}
