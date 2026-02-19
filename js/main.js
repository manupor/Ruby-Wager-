// RubyWager.com Authentication Modal Functions
window.openAuthModal = function (tab = 'login') {
  // Close any open modal first
  closeAuthModal();

  if (tab === 'register' || tab === 'join') {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
};

window.closeAuthModal = function () {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('registerModal').style.display = 'none';
  document.body.style.overflow = 'auto';
};

// Close modal when clicking outside
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('auth-modal')) {
    closeAuthModal();
  }
});

// Close modal with Escape key
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeAuthModal();
  }
});

// Google reCAPTCHA initialization
var recaptchaWidgetId = null;
window.onRecaptchaLoad = function () {
  // reCAPTCHA will be rendered when register modal opens
};

// Render reCAPTCHA when register modal opens
var originalOpenAuthModal = window.openAuthModal;
window.openAuthModal = function (tab) {
  originalOpenAuthModal(tab);
  if ((tab === 'register' || tab === 'join') && typeof grecaptcha !== 'undefined') {
    setTimeout(function () {
      var container = document.getElementById('register-recaptcha');
      if (container && container.innerHTML === '') {
        recaptchaWidgetId = grecaptcha.render('register-recaptcha', {
          'sitekey': '6LcJ1PEpAAAAAAWNHsXB0WygF_9noPCjmWdVlY_F',
          'theme': 'dark'
        });
      }
    }, 100);
  }
};

// Wait for DOM to be ready
(function () {
  'use strict';

  // Mobile menu toggle function
  window.toggleMobileMenu = function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');

    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Setup event listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-overlay');

    // Hamburger click
    if (hamburger) {
      hamburger.addEventListener('click', window.toggleMobileMenu);
    }

    // Overlay click to close
    if (overlay) {
      overlay.addEventListener('click', function () {
        if (this.classList.contains('active')) {
          window.toggleMobileMenu();
        }
      });
    }
  }
})();

// Tab switching functionality
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }

  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }

  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Switch FAQ tab from mobile menu
window.switchFaqTab = function (tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }
  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }
  const target = document.getElementById(tabName);
  if (target) target.classList.add('active');
  // Activate matching button
  for (let i = 0; i < tabButtons.length; i++) {
    if (tabButtons[i].getAttribute('onclick') && tabButtons[i].getAttribute('onclick').includes("'" + tabName + "'")) {
      tabButtons[i].classList.add('active');
    }
  }
};

// FAQ accordion toggle functionality
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const isActive = answer.classList.contains('active');

  // Close all other open FAQs in the same tab
  const allAnswers = element.closest('.tab-content').getElementsByClassName('faq-answer');
  const allQuestions = element.closest('.tab-content').getElementsByClassName('faq-question');

  for (let i = 0; i < allAnswers.length; i++) {
    allAnswers[i].classList.remove('active');
    allQuestions[i].classList.remove('active');
  }

  // Toggle the clicked FAQ
  if (!isActive) {
    answer.classList.add('active');
    element.classList.add('active');
  }
}

// Generate random winners table
function generateWinners() {
  const names = ['Mike R.', 'Sarah L.', 'John D.', 'Emma W.', 'Carlos M.', 'Lisa K.', 'David P.', 'Anna S.', 'Tom H.', 'Maria G.', 'Chris B.', 'Nina F.', 'Alex T.', 'Sophie C.', 'Ryan J.'];
  const games = ['Wild Mirage', 'Hawaiian Fever', 'Hot Blizzard', 'La Tomatina', 'Pandas Run', 'Sweet Crush', 'The Cup', 'Thrones of Persia', 'Wheel of Luck'];
  const times = ['2 min ago', '5 min ago', '12 min ago', '18 min ago', '25 min ago'];

  const tbody = document.getElementById('winners-tbody');
  tbody.innerHTML = '';

  // Generate 5 random winners
  for (let i = 0; i < 5; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const game = games[Math.floor(Math.random() * games.length)];
    const amount = (Math.random() * 9000 + 1000).toFixed(2);
    const time = times[i];

    const row = document.createElement('tr');
    row.innerHTML = `
          <td class="winner-name">${name}</td>
          <td class="winner-game">${game}</td>
          <td class="winner-amount">$${amount}</td>
          <td>${time}</td>
        `;
    tbody.appendChild(row);
  }
}

// Generate winners on page load
generateWinners();

// ============================================
// HERO SLIDER / CAROUSEL
// ============================================
(function () {
  const track = document.getElementById('heroSliderTrack');
  const dots = document.querySelectorAll('.hero-dot');
  if (!track || dots.length === 0) return;

  let currentSlide = 0;
  const totalSlides = dots.length;
  const INTERVAL_MS = 10000; // 10 seconds
  let autoplayTimer = null;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Dot click navigation
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var slideIndex = parseInt(this.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);
      startAutoplay(); // Reset timer on manual navigation
    });
  });

  // Pause autoplay when page is not visible
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Start autoplay
  startAutoplay();
})();
