const initNav = () => {
  const header = document.querySelector('.header');
  const nav = header.querySelector('.header__nav');
  const toggle = header.querySelector('.header__toggle');
  const overlay = header.querySelector('.header__overlay');
  const close = header.querySelector('.header__close');

  const onOpen = () => {
    nav.classList.add('visible');
    setTimeout(() => {
      nav.classList.add('open');
    }, 50)
  };

  const onClose = () => {
    nav.classList.remove('open');
    setTimeout(() => {
      nav.classList.remove('visible');
    }, 400)
  };

  toggle.addEventListener('click', onOpen);
  overlay.addEventListener('click', onClose);
  close.addEventListener('click', onClose);
};

const initForms = () => {

  // Selectboxes
  if (typeof NiceSelect !== 'undefined') {
    document.querySelectorAll('.form-select').forEach(el => {
      NiceSelect.bind(el);
    });
  }

  // Password visibility
  const toggles = document.querySelectorAll('.form-password-toggle');
  if (toggles) {
    toggles.forEach(elem => {
      elem.addEventListener('click', event => {
        let parent = elem.parentNode;
        let parentNodes = parent.children;
        let parentNodesArray = Array.from(parentNodes);
        let siblings = parentNodesArray.filter(function (sibling) {
          return sibling.classList.contains('form-control');
        });
        if (siblings.length > 0) {
          const password = siblings[0];
          const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
          if (type === 'text') {
            elem.classList.add('active');
          } else {
            elem.classList.remove('active');
          }
          password.setAttribute('type', type);
        }
        event.preventDefault();
      }, false);
    });
  }
}

const initFAQ = () => {
  const faq = document.querySelector('.faq');
  if (faq) {
    const list = faq.querySelectorAll('.faq__entry');
    list.forEach(e => {
      const entry = e;
      const question = entry.querySelector('.faq__question');
      const reply = entry.querySelector('.faq__reply');
      const space = entry.querySelector('.faq__space');

      const onClick = e => {
        if (entry.classList.contains('open')) {
          e.preventDefault();
          reply.removeAttribute('style');
          entry.classList.remove('open');
          setTimeout(() => {
            entry.classList.remove('visible');
          }, 400);
        } else {
          entry.classList.add('visible');
          setTimeout(() => {
            entry.classList.add('open');
            reply.setAttribute('style', 'max-height:' + reply.getAttribute('data-max') + 'px');
          }, 50);
          return false;
        }
      };
      question.addEventListener('click', onClick);

      const onResize = () => {
        reply.setAttribute('data-max', space.offsetHeight);
      };
      window.addEventListener('resize', onResize);
      onResize();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  //initNav();
  //initForms();
  //initFAQ();
});