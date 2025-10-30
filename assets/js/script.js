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

const initValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate(e, form) {
        isValid = true;

        form.querySelectorAll('.form-success-message').forEach(msg => msg.textContent = '');
        form.querySelectorAll('.form-success').forEach(el => el.classList.remove('form-success'));
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

        function showSuccess(input, msg) {
            let group = input.parentNode;
            input.classList.add('form-success');

            let successEl = group.querySelector('.form-success-message');
            if (!successEl) {
                successEl = document.createElement('p');
                successEl.className = 'form-success-message';
                group.appendChild(successEl);
            }
            if (msg) successEl.textContent = msg;
        }

        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach((input) => {
            if (input.getAttribute('type') === 'email') {
                if (!emailPattern.test(input.value.trim())) {
                    showError(input, 'Invalid email address');
                    isValid = false;
                } else {
                    if (form.classList.contains('form-inited')) {
                        showSuccess(input, 'Email is valid');
                    }
                }
            } else {
                if (input.value.trim().length < 1) {
                    showError(input, 'Field is required');
                    isValid = false;
                }
            }
        });

        if (isValid) {
            form.classList.add('form-valid', isValid);
        } else {
            form.classList.remove('form-valid', isValid);
        }
    }

    let isValid = true;

    document.querySelectorAll('.form-validate').forEach(form => {
        form.addEventListener('submit', e => {
            validate(e, form);
            if (!form.classList.contains('form-inited')) {
                form.querySelectorAll('input[type="email"]').forEach(input => {
                    input.oninput = () => validate(e, form);
                });
                form.classList.add('form-inited');
            }
            if (!isValid) {
                e.preventDefault();
            } else {
                if (form.classList.contains('form-subscribe')) {
                    alert('Thank you for subscribing!');
                    e.preventDefault();
                }
            }
        });
    });
}

const initCopy = () => {
    function copyLink(link = window.location.href) {
        navigator.clipboard.writeText(link)
            .then(() => {
                console.log('Copied link:', link);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    }

    const copyButtons = document.querySelectorAll('.copy-link');
    copyButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            copyLink();
        });
    });
}

const initHelpful = () => {
    const helpfulContainer = document.querySelector('.helpful');
    if (!helpfulContainer) return;

    const links = helpfulContainer.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            if (link.classList.contains('active')) {
                link.classList.remove('active');
                return;
            }
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
};

const initMetaLinks = () => {
    const metaLinks = document.querySelectorAll('.meta-links li');

    metaLinks.forEach(li => {
        const link = li.querySelector('a');
        if (!link) return;

        link.addEventListener('click', e => {
            metaLinks.forEach(l => l.classList.remove('active'));
            li.classList.add('active');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initAnimation();
    initNav();
    initValidation();
    initCopy();
    initHelpful();
    initMetaLinks();
});