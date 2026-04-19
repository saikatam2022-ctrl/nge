(function () {
  /* BASE_PATH is set per-page before this script loads.
     Root pages  → not set  → B = ''
     /states/*   → var BASE_PATH = '../';  → B = '../'  */
  var B = (typeof BASE_PATH !== 'undefined' ? BASE_PATH : '');

  var HEADER = `<nav>
  <a class="nav-logo" href="${B}index.html">
    <div class="nav-logo-mark">
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z" fill="white" stroke="white" stroke-width="0.5" stroke-linejoin="round"/>
      </svg>
    </div>
    NEXT-GEN ENERGY
  </a>
  <ul class="nav-links">
    <li><a href="${B}index.html">Home</a></li>
    <li><a href="${B}index.html#howItWorks">How It Works</a></li>
    <li><a href="${B}industries.html">Industries</a></li>
    <li class="nav-dropdown">
      <a href="${B}states/index.html">States</a>
      <div class="nav-dropdown-menu">
        <a class="nav-dropdown-item" href="${B}states/texas.html"><div class="ndi-abbr">TX</div><div class="ndi-label">Texas</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/illinois.html"><div class="ndi-abbr">IL</div><div class="ndi-label">Illinois</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/ohio.html"><div class="ndi-abbr">OH</div><div class="ndi-label">Ohio</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/new-jersey.html"><div class="ndi-abbr">NJ</div><div class="ndi-label">New Jersey</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/pennsylvania.html"><div class="ndi-abbr">PA</div><div class="ndi-label">Pennsylvania</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/connecticut.html"><div class="ndi-abbr">CT</div><div class="ndi-label">Connecticut</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/delaware.html"><div class="ndi-abbr">DE</div><div class="ndi-label">Delaware</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/maryland.html"><div class="ndi-abbr">MD</div><div class="ndi-label">Maryland</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/massachusetts.html"><div class="ndi-abbr">MA</div><div class="ndi-label">Massachusetts</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/missouri.html"><div class="ndi-abbr">MO</div><div class="ndi-label">Missouri</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/new-york.html"><div class="ndi-abbr">NY</div><div class="ndi-label">New York</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/virginia.html"><div class="ndi-abbr">VA</div><div class="ndi-label">Virginia</div><div class="ndi-badge ndi-live">Live</div></a>
        <a class="nav-dropdown-item" href="${B}states/washington-dc.html"><div class="ndi-abbr">DC</div><div class="ndi-label">Washington DC</div><div class="ndi-badge ndi-live">Live</div></a>
        <div class="ndi-divider"></div>
        <a class="ndi-seeall" href="${B}states/index.html">See all 13 states &amp; compare →</a>
      </div>
    </li>
    <li><a href="${B}index.html#faq">FAQ</a></li>  
    <li><a href="${B}about.html">About</a></li>
    <li><a href="${B}index.html#nlSec">Contact</a></li>
  </ul>
  <div class="nav-cta">
    <button class="btn btn-ghost" onclick="var el=document.getElementById('nlSec');el?el.scrollIntoView({behavior:'smooth'}):window.location='${B}index.html#nlSec'">Sign Up</button>
    <button class="btn btn-primary" onclick="var el=document.getElementById('calcCard');el?el.scrollIntoView({behavior:'smooth'}):window.location='${B}index.html#calcCard'">Get Free Review</button>
  </div>
  <button class="nav-hamburger" id="navHamburger" aria-label="Open navigation menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-mobile" id="navMobile">
  <div class="nav-mobile-inner">
    <div class="nav-mobile-header">
      <a class="nav-mobile-logo" href="${B}index.html">
        <div class="nav-logo-mark"><svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z" fill="white" stroke="white" stroke-width="0.5" stroke-linejoin="round"/></svg></div>
        NEXT-GEN ENERGY
      </a>
      <button class="nav-mobile-close" id="navMobileClose" aria-label="Close menu">✕</button>
    </div>
    <div class="nav-mobile-links">
      <a href="${B}index.html">Home</a>
      <a href="${B}index.html#howItWorks">How It Works</a>
      <a href="${B}industries.html">Industries</a>
      <div class="nav-mobile-section">
        <div class="nav-mobile-sec-title">States</div>
        <a href="${B}states/texas.html">TX — Texas</a>
        <a href="${B}states/illinois.html">IL — Illinois</a>
        <a href="${B}states/ohio.html">OH — Ohio</a>
        <a href="${B}states/new-jersey.html">NJ — New Jersey</a>
        <a href="${B}states/pennsylvania.html">PA — Pennsylvania</a>
        <a href="${B}states/connecticut.html">CT — Connecticut</a>
        <a href="${B}states/delaware.html">DE — Delaware</a>
        <a href="${B}states/maryland.html">MD — Maryland</a>
        <a href="${B}states/massachusetts.html">MA — Massachusetts</a>
        <a href="${B}states/missouri.html">MO — Missouri</a>
        <a href="${B}states/new-york.html">NY — New York</a>
        <a href="${B}states/virginia.html">VA — Virginia</a>
        <a href="${B}states/washington-dc.html">DC — Washington DC</a>
        <a class="nav-mobile-seeall" href="${B}states/index.html">See all 13 states &amp; compare →</a>
      </div>
      <a href="${B}index.html#faq">FAQ</a>
      <a href="${B}about.html">About</a>
      <a href="${B}index.html#nlSec">Contact</a>
    </div>
    <div class="nav-mobile-cta">
      <a class="btn btn-ghost nav-mob-link" href="${B}index.html#nlSec" style="width:100%;justify-content:center;text-decoration:none;display:flex">Sign Up</a>
      <a class="btn btn-primary nav-mob-link" href="${B}index.html#nlSec" style="width:100%;justify-content:center;margin-top:8px;text-decoration:none;display:flex">Get Free Review</a>
    </div>
  </div>
</div>`;

  var FOOTER = `<footer>
  <div class="footer-top">

    <!-- Brand -->
    <div class="footer-brand">
      <div class="footer-logo">
        <div class="footer-logo-mark">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="white"><path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z"/></svg>
        </div>
        NEXT-GEN ENERGY
      </div>
      <div class="footer-desc">Independent B2B commercial energy broker serving businesses across 13 deregulated and competitive energy markets — Texas, Illinois, Ohio, New Jersey, Pennsylvania, Connecticut, Delaware, Maryland, Massachusetts, Missouri, New York, Virginia, and Washington DC. We secure fixed-rate electricity below market averages — free to you.</div>
      <div class="footer-trust-badges">
        <div class="f-badge">🔒 SSL Secured</div>
        <div class="f-badge">⭐ 4.9/5 Rated</div>
        <div class="f-badge">🏛️ Licensed Broker</div>
        <div class="f-badge">✓ BBB Member</div>
      </div>
      <div class="footer-states" style="margin-top:14px">
        <div class="f-state-badge">🟢 TX</div>
        <div class="f-state-badge">🟢 IL</div>
        <div class="f-state-badge">🟢 OH</div>
        <div class="f-state-badge">🟢 NJ</div>
        <div class="f-state-badge">🟢 PA</div>
        <div class="f-state-badge">🟢 CT</div>
        <div class="f-state-badge">🟢 DE</div>
        <div class="f-state-badge">🟢 MD</div>
        <div class="f-state-badge">🟢 MA</div>
        <div class="f-state-badge">🟢 MO</div>
        <div class="f-state-badge">🟢 NY</div>
        <div class="f-state-badge">🟢 VA</div>
        <div class="f-state-badge">🟢 DC</div>
      </div>
    </div>

    <!-- Services -->
    <div>
      <div class="footer-col-title">Services</div>
      <ul class="footer-links">
        <li><a href="${B}index.html#howItWorks">How It Works</a></li>
        <li><a href="#">Commercial Electricity</a></li>
        <li><a href="#">Commercial Gas Supply</a></li>
        <li><a href="#">Energy Bill Audit</a></li>
        <li><a href="#">Multi-Site Management</a></li>
        <li><a href="#">Rate Lock Guarantee</a></li>
        <li><a href="${B}index.html#calcCard">Savings Calculator</a></li>
      </ul>
    </div>

    <!-- Industries -->
    <div>
      <div class="footer-col-title">Industries</div>
      <ul class="footer-links">
        <li><a href="${B}industries.html">Restaurants &amp; Cafés</a></li>
        <li><a href="${B}industries.html">Auto Repair Shops</a></li>
        <li><a href="${B}industries.html">Manufacturing</a></li>
        <li><a href="${B}industries.html">Office Spaces</a></li>
        <li><a href="${B}industries.html">Warehouses</a></li>
        <li><a href="${B}industries.html">Medical / Dental</a></li>
        <li><a href="${B}industries.html">Retail Stores</a></li>
      </ul>
    </div>

    <!-- States -->
    <div>
      <div class="footer-col-title">States We Serve</div>
      <ul class="footer-links">
        <li><a href="${B}states/texas.html">Texas (TX)</a></li>
        <li><a href="${B}states/illinois.html">Illinois (IL)</a></li>
        <li><a href="${B}states/ohio.html">Ohio (OH)</a></li>
        <li><a href="${B}states/new-jersey.html">New Jersey (NJ)</a></li>
        <li><a href="${B}states/pennsylvania.html">Pennsylvania (PA)</a></li>
        <li><a href="${B}states/connecticut.html">Connecticut (CT)</a></li>
        <li><a href="${B}states/delaware.html">Delaware (DE)</a></li>
        <li><a href="${B}states/maryland.html">Maryland (MD)</a></li>
        <li><a href="${B}states/massachusetts.html">Massachusetts (MA)</a></li>
        <li><a href="${B}states/missouri.html">Missouri (MO)</a></li>
        <li><a href="${B}states/new-york.html">New York (NY)</a></li>
        <li><a href="${B}states/virginia.html">Virginia (VA)</a></li>
        <li><a href="${B}states/washington-dc.html">Washington DC</a></li>
      </ul>
    </div>

    <!-- Company -->
    <div>
      <div class="footer-col-title">Company</div>
      <ul class="footer-links">
        <li><a href="${B}about.html">About Us</a></li>
        <li><a href="${B}index.html#faq">FAQ</a></li>
        <li><a href="${B}index.html#nlSec">Contact Us</a></li>
        <li><a href="${B}index.html#nlSec">Get a Free Quote</a></li>
        <li><a href="#">How We Make Money</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom">
    <div class="footer-copy">© 2026 Next Gen Energy. All rights reserved. Independent licensed commercial energy broker.</div>
    <div class="footer-legal">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Broker Disclosure</a>
      <a href="#">How We Make Money</a>
      <a href="#">Accessibility</a>
    </div>
  </div>
</footer>`;

  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  inject('header-placeholder', HEADER);
  inject('footer-placeholder', FOOTER);

  /* ── Active nav link ── */
  var pathname = window.location.pathname;
  var page = pathname.split('/').pop() || 'index.html';
  var isStatePage = pathname.indexOf('/states/') !== -1;

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    link.classList.remove('active');
    if (page === 'about.html' && href.indexOf('about.html') !== -1 && href.indexOf('#') === -1) {
      link.classList.add('active');
    } else if (page === 'industries.html' && href.indexOf('industries.html') !== -1 && href.indexOf('#') === -1) {
      link.classList.add('active');
    } else if (!isStatePage && page !== 'about.html' && page !== 'industries.html' && href.indexOf('index.html') !== -1 && href.indexOf('#') === -1) {
      link.classList.add('active');
    }
  });
  /* Highlight the States dropdown trigger when on a state page */
  var dropdownLi = document.querySelector('.nav-dropdown');
  if (isStatePage && dropdownLi) {
    dropdownLi.querySelector('a').classList.add('active');
  }

  /* ── Dropdown: click to open/persist, close on outside click or Escape ── */
  if (dropdownLi) {
    var trigger = dropdownLi.querySelector('a');
    trigger.addEventListener('click', function (e) {
      /* Intercept the click to toggle the dropdown open/closed instead of
         navigating immediately. If the user wants the states index page they
         can click "See all states" inside the menu. */
      e.preventDefault();
      dropdownLi.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!dropdownLi.contains(e.target)) {
        dropdownLi.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') dropdownLi.classList.remove('open');
    });
  }

  /* ── Mobile nav ── */
  var hamburger = document.getElementById('navHamburger');
  var mobileNav = document.getElementById('navMobile');
  var mobileClose = document.getElementById('navMobileClose');

  function openMobileNav() {
    if (mobileNav) { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; }
    if (hamburger) hamburger.classList.add('open');
  }
  function closeMobileNav() {
    if (mobileNav) { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }
    if (hamburger) hamburger.classList.remove('open');
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileNav) {
    /* Click on backdrop closes menu */
    mobileNav.addEventListener('click', function (e) { if (e.target === mobileNav) closeMobileNav(); });
    /* Any link inside closes menu */
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMobileNav(); });

  /* ── Smooth scroll: intercept index.html#hash links when already on index ── */
  if (page === 'index.html' || page === '') {
    document.querySelectorAll('a[href*="index.html#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var hash = (link.getAttribute('href') || '').split('#')[1];
        var target = hash && document.getElementById(hash);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }
})();
