const initAnimation = () => {
  const elements = document.querySelectorAll('.has-animation');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% visible
  });

  elements.forEach(el => observer.observe(el));
};

const initNav = () => {
  const header = document.querySelector('.header');
  const nav = header.querySelector('.header__nav');
  const toggle = header.querySelector('.header__toggle');
  const overlay = header.querySelector('.header__overlay');

  const menuToggle = () => {
    if (nav.classList.contains('open')) {
      menuClose();
    } else {
      menuOpen();
    }
  };

  const menuOpen = () => {
    nav.classList.add('visible');
    setTimeout(() => {
      nav.classList.add('open');
    }, 50)
  };

  const menuClose = () => {
    nav.classList.remove('open');
    setTimeout(() => {
      nav.classList.remove('visible');
    }, 400)
  };

  toggle.addEventListener('click', menuToggle);
  overlay.addEventListener('click', menuClose);
};

const initForms = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(e, form) {
    form.querySelectorAll('.form-error-message').forEach(msg => msg.textContent = '');
    form.querySelectorAll('.form-error').forEach(el => el.classList.remove('form-error'));

    function showError(input, msg) {
      let group = input.parentNode;
      input.classList.add('form-error');

      let errorEl = group.querySelector('.form-error-message');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-error-message';
        group.appendChild(errorEl);
      }
      if (msg) errorEl.textContent = msg;
    }

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach((input) => {
      if (input.getAttribute('type') === 'email') {
        if (!emailPattern.test(input.value.trim())) {
          showError(input, 'Invalid email address');
          isValid = false;
        }
      } else {
        if (input.value.trim().length < 1) {
          showError(input, 'Field is required');
          isValid = false;
        }
      }
    });
  }

  let isValid = true;

  document.querySelectorAll('.form-validate').forEach(form => {
    form.addEventListener('submit', e => {
      isValid = true;
      validate(e, form);
      if (!isValid) e.preventDefault();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAnimation();
  initNav();
  initForms();
});