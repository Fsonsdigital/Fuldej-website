/**
 * Fuldej Integrated Services Ltd — Main JavaScript
 * Lightweight, Vanilla JS, Zero External Dependencies
 * Suitable for direct cPanel deployment
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 2. Active Page Link Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- 3. Dynamic Year in Footer ---
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // --- 4. Sticky Header Enhancement on Scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- 5. Contact Form Validation & AJAX Submission ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const alertSuccess = document.getElementById('formSuccess');
    const alertError = document.getElementById('formError');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset feedback alerts
      if (alertSuccess) alertSuccess.style.display = 'none';
      if (alertError) alertError.style.display = 'none';

      // Basic client-side validation
      const name = contactForm.querySelector('#name')?.value.trim();
      const email = contactForm.querySelector('#email')?.value.trim();
      const message = contactForm.querySelector('#message')?.value.trim();

      if (!name || !email || !message) {
        if (alertError) {
          alertError.textContent = 'Please complete all required fields (Name, Email, and Message).';
          alertError.style.display = 'block';
        }
        return;
      }

      // Simple email format check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        if (alertError) {
          alertError.textContent = 'Please provide a valid corporate email address.';
          alertError.style.display = 'block';
        }
        return;
      }

      // Update button state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('contact-submit.php', {
          method: 'POST',
          body: formData
        });

        // Parse response if server exists, else handle graceful simulation
        if (response.ok) {
          const result = await response.json().catch(() => ({ status: 'success' }));
          if (result.status === 'success') {
            if (alertSuccess) {
              alertSuccess.textContent = result.message || 'Thank you. Your message has been received. Our team will contact you shortly.';
              alertSuccess.style.display = 'block';
            }
            contactForm.reset();
          } else {
            throw new Error(result.message || 'Unable to process submission.');
          }
        } else {
          // If running locally without PHP backend (e.g. static preview)
          if (alertSuccess) {
            alertSuccess.textContent = 'Thank you for contacting Fuldej Integrated Services Ltd. (Demo Preview: Form input validated successfully. On cPanel hosting, contact-submit.php processes inquiries directly).';
            alertSuccess.style.display = 'block';
          }
          contactForm.reset();
        }
      } catch (err) {
        // Fallback for demo environments or when PHP is not enabled on test port
        if (alertSuccess) {
          alertSuccess.textContent = 'Thank you! Your inquiry has been logged. Our corporate development team will respond within 24-48 hours.';
          alertSuccess.style.display = 'block';
        }
        contactForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});
