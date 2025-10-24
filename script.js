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


// Stat Section
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.stats-section');
  if (!section) return;
  const counters = section.querySelectorAll('.stat-item h4');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((el) => {
          if (el.dataset.counted) return;
          const original = el.textContent.trim();
          const m = original.match(/^([0-9]*\.?[0-9]+)\s*([kKmM]?)\s*([+%]?)$/);
          if (!m) {
            el.dataset.counted = '1';
            return;
          }
          const numStr = m[1];
          const unit = m[2];
          const trail = m[3];
          const mul = unit.toLowerCase() === 'k' ? 1000 : unit.toLowerCase() === 'm' ? 1000000 : 1;
          const decimals = (numStr.split('.')[1] || '').length;
          const target = parseFloat(numStr) * mul;
          const duration = 1500;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = target * progress;
            let display;
            if (mul !== 1) {
              const val = current / mul;
              display = decimals ? val.toFixed(decimals) : Math.round(val).toString();
              display += unit.toLowerCase() === 'k' ? 'k' : 'm';
            } else {
              display = Math.round(current).toString();
            }
            el.textContent = display + trail;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              if (mul !== 1) {
                const finalVal = target / mul;
                el.textContent = (decimals ? finalVal.toFixed(decimals) : Math.round(finalVal).toString()) + (unit ? unit.toLowerCase() : '') + trail;
              } else {
                el.textContent = Math.round(target).toString() + trail;
              }
              el.dataset.counted = '1';
            }
          };
          requestAnimationFrame(step);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
});

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
      autoSwap: true,
    },

    // Responsive breakpoints
    breakpoints: {
      325: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      850: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },

    autoHeight: true,
  });
});


