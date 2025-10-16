(() => {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const openBtn = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.drawer-close');
  const focusableSelectors = 'a[href], button:not([disabled])';
  let lastFocused = null;

  if (!drawer || !overlay || !openBtn || !closeBtn) return;

  const setAria = (open) => {
    openBtn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  };

  const openDrawer = () => {
    lastFocused = document.activeElement;
    drawer.classList.add('open');
    overlay.hidden = false;
    document.body.classList.add('no-scroll');
    setAria(true);
    const firstLink = drawer.querySelector(focusableSelectors);
    if (firstLink) firstLink.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');
    setAria(false);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    } else {
      openBtn.focus();
    }
  };

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      e.preventDefault();
      closeDrawer();
    }
  });

  // Optional: close after navigating within drawer
  drawer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('a[href]')) {
      closeDrawer();
    }
  });
})();


// Accordion

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const question = item.querySelector('.accordion-question');
    const answer = item.querySelector('.accordion-answer');

    question.addEventListener('click', () => {

      // Check if the current item is already active
      const wasActive = item.classList.contains('active');

      // Close all other active items (Optional: for a single-open accordion)
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          // otherItem.querySelector('.accordion-answer').style.maxHeight = '0';
          // otherItem.querySelector('.accordion-answer').style.paddingTop = '0';
        }
      });

      // Toggle the current item
      if (!wasActive) {
        // Open the item
        item.classList.add('active');
        // Set maxHeight to the scrollHeight to allow smooth transition to the full content height
        // answer.style.maxHeight = answer.scrollHeight + "px";
        // answer.style.paddingTop = '0.6rem';
      } else {
        // Close the item
        item.classList.remove('active');
        // answer.style.maxHeight = '0';
        // answer.style.paddingTop = '0';
      }
    });
  });
});


// Feedback Section

document.addEventListener('DOMContentLoaded', function () {
  // We use the Swiper library's class name here: .swiper-container
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    spaceBetween: 20,
    grabCursor: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },

    autoHeight: true,
  });
});




