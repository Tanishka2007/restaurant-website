/**
 * ============================================================================
 * BLOOM & BUTTER CAFÉ - INTERACTIVE JAVASCRIPT
 * Clean, lightweight, modular vanilla JS for UI interactions & themes.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initMenuFilter();
  initActiveNavSpy();
  setDefaultReservationDate();
});

/* ----------------------------------------------------------------------------
   1. PASTEL THEME TOGGLER (Light Cream / Dark Velvet)
   ---------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('bloom-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  // Click handler to toggle theme
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('bloom-theme', newTheme);
  });
}

/* ----------------------------------------------------------------------------
   2. MOBILE NAVIGATION HAMBURGER TOGGLE
   ---------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking any navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ----------------------------------------------------------------------------
   3. MENU CATEGORY FILTER
   ---------------------------------------------------------------------------- */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Manage active filter button state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter cards
      menuCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------------------------------
   4. ACTIVE NAVIGATION LINK ON SCROLL (Scroll Spy)
   ---------------------------------------------------------------------------- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------------------------------
   5. RESERVATION FORM HANDLING
   ---------------------------------------------------------------------------- */
function setDefaultReservationDate() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

function handleReservation(event) {
  event.preventDefault();
  const form = document.getElementById('bookingForm');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  const guestName = document.getElementById('fullName').value;
  const guestCount = document.getElementById('guests').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').options[document.getElementById('time').selectedIndex].text;

  // Render pleasant pastel confirmation
  feedback.innerHTML = `🌸 <strong>Table Confirmed for ${guestName}!</strong><br>We look forward to hosting ${guestCount} guest(s) on ${date} at ${time}. Confirmation email has been sent.`;
  feedback.classList.remove('hidden');

  // Clear inputs and keep message visible
  form.reset();
  setDefaultReservationDate();

  // Scroll to feedback message smoothly
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ----------------------------------------------------------------------------
   6. NEWSLETTER SUBSCRIPTION
   ---------------------------------------------------------------------------- */
function handleNewsletter(event) {
  event.preventDefault();
  const msg = document.getElementById('newsletter-msg');
  if (msg) {
    msg.classList.remove('hidden');
    event.target.reset();
  }
}
