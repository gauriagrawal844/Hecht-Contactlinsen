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




// @media (max-width:1800px) {
//     .about-section {
//         padding: 245px 138px 70px 123px;
//     }

//     .features-card {
//         max-width: 1244px;
//         max-height: 330px;
//         padding: 30px 37px;
//         gap: 24px;
//     }

//     .feature-icon-wrapper img {
//         width: 70px;
//         height: 70px;
//     }

//     .feature-item {
//         gap: 18px;
//     }
// }

// @media(max-width:1600px) {
//     .features-card {
//         max-width: 1200px;
//         max-height: 280px;
//         padding: 30px 37px;
//         gap: 20px;
//         bottom: 3%;
//     }

//     .feature-description {
//         font-size: 16px;
//     }

//     .feature-item {
//         gap: 15px;
//     }

//     .feature-icon-wrapper img {
//         width: 65px;
//         height: 65px;
//     }

//     .text-heading {
//         font-size: 45px;
//     }

//     .about-text-container {
//         gap: 20px;
//         padding-top: 70px;
//     }
// }

// @media (max-width:1440px) {
//     .about-section {
//         padding: 176px 76px 70px 77px;
//     }

//     .feature-item {
//         gap: 16px;
//     }

//     .feature-icon-wrapper img {
//         width: 60px;
//         height: 60px;
//     }

//     .features-card {
//         max-width: 1079px;
//         max-height: 295px;
//         height: 100%;
//         padding: 30px;
//         gap: 20px;
//     }

//     .feature-title {
//         font-size: 22px;
//         line-height: 22px;
//     }

//     .feature-description {
//         font-size: 16px;
//         line-height: 120%;
//         max-height: 80px;
//     }

//     .about-text-container {
//         padding-top: 60px;
//         gap: 12px;
//     }

//     .text-overline {
//         font-size: 20px;
//         line-height: 20px;
//     }

//     .text-heading {
//         font-size: 39px;
//     }

//     .text-body {
//         font-size: 17px;
//     }
// }

// @media(max-width:1250px) {
//     .about-section {
//         padding: 125px 76px 70px 77px;
//     }

//     .feature-item {
//         gap: 14px;
//     }

//     .feature-icon-wrapper img {
//         width: 50px;
//         height: 50px;
//     }

//     .features-card {
//         max-width: 879px;
//         max-height: 240px;
//         height: 100%;
//         padding: 25px;
//         gap: 17px;
//     }

//     .feature-title {
//         font-size: 19px;
//         line-height: 19px;
//     }

//     .feature-description {
//         font-size: 14px;
//         line-height: 120%;
//         max-height: 70px;
//     }

//     .about-text-container {
//         padding-top: 50px;
//     }

//     .text-overline {
//         font-size: 18px;
//         line-height: 18px;
//     }

//     .text-heading {
//         font-size: 36px;
//     }

//     .text-body {
//         font-size: 15px;
//     }

//     .learn-more-link {
//         font-size: 16px;
//     }

//     .learn-more-link i {
//         font-size: 15px;
//     }
// }

// @media (max-width:1100px) {

//     .feature-item {
//         gap: 11px;
//     }

//     .feature-icon-wrapper img {
//         width: 40px;
//         height: 40px;
//     }

//     .features-card {
//         max-width: 779px;
//         max-height: 220px;
//         height: 100%;
//         padding: 25px;
//         gap: 17px;
//     }

//     .feature-title {
//         font-size: 17px;
//         line-height: 17px;
//     }

//     .feature-description {
//         font-size: 12px;
//         line-height: 120%;
//         max-height: 60px;
//     }

//     .about-text-container {
//         padding-top: 40px;
//     }

//     .text-overline {
//         font-size: 16px;
//         line-height: 16px;
//     }

//     .text-heading {
//         font-size: 31px;
//     }

//     .text-body {
//         font-size: 13px;
//     }

//     .learn-more-link {
//         font-size: 15px;
//     }

//     .learn-more-link i {
//         font-size: 14px;
//     }

//     .about-section {
//         padding: 114px 70px 50px 70px;
//     }
// }

// @media(max-width:992px) {
//     .about-card-content {
//         gap: 4%;
//     }

//     .about-text-container {
//         padding-top: 0;
//         justify-content: center;
//     }

//     .features-card {
//         margin: 0 auto;
//         margin-top: 20px;
//         position: static;
//     }

//     .text-heading {
//         font-size: 26px;
//     }

//     .text-overline {
//         font-size: 15px;
//         line-height: 15px;
//     }

//     .about-text-container {
//         gap: 17px;
//     }

//     .feature-description {
//         font-size: 11px;
//         line-height: 110%;
//         max-height: 60px;
//     }

//     .feature-title {
//         font-size: 14px;
//         line-height: 15px;
//     }

//     .feature-icon-wrapper img {
//         width: 30px;
//         height: 30px;
//     }

//     .learn-more-link {
//         font-size: 14px;
//     }

//     .learn-more-link i {
//         font-size: 12px;
//     }
// }

// @media(max-width:768px) {
//     .about-section {
//         padding: 73px 60px 50px 60px;
//     }

//     .text-overline {
//         font-size: 13px;
//         line-height: 13px;
//     }

//     .text-heading {
//         font-size: 22px;
//     }

//     .text-body {
//         font-size: 11px;
//     }
// }

// @media(max-width:691px) {
//     .about-section {
//         padding: 58px 40px 42px 40px;
//     }

//     .features-card {
//         gap: 6px;
//         padding: 20px 15px;
//     }

//     .feature-description {
//         max-height: 75px;

//     }
// }

// @media(max-width:590px) {
//     .about-card-content {
//         flex-direction: column-reverse;
//         gap: 20px;
//     }

//     .features-card {
//         max-height: 360px;
//         grid-template-columns: repeat(2, 1fr);
//         gap: 20px;
//     }

//     .text-body {
//         font-size: 15px;
//     }

//     .text-heading {
//         font-size: 25px;
//     }

//     .text-overline {
//         font-size: 16px;
//         line-height: 16px;
//     }
// }

// @media(max-width:500px) {
//     .text-body {
//         font-size: 12px;
//     }

//     .feature-item {
//         gap: 5px;
//     }

//     .feature-description {
//         font-size: 10px;
//     }

//     .learn-more-link {
//         font-size: 12px;
//         gap: 6px;
//     }

//     .learn-more-link i {
//         font-size: 10px;
//     }

//     .feature-title {
//         font-size: 12px;
//         line-height: 12px;
//     }

//     .feature-icon-wrapper img {
//         width: 24px;
//         height: 24px;
//     }

//     .about-text-container {
//         gap: 8px;
//     }

// }