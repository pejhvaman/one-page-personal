'use strice';

//selected elements
const navContainer = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header-title');
const modal = document.querySelector('.modal');
const showModalBtns = document.querySelectorAll('.show-modal-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const overlay = document.querySelector('.overlay');
const sections = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('.lazy-img');

////Functions
// Nav fade effect
const navFader = function () {
  const hoverHandler = function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav-link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav-link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(sibling => {
        if (sibling != link) sibling.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
  navContainer.addEventListener('mouseover', hoverHandler.bind(0.5));
  navContainer.addEventListener('mouseout', hoverHandler.bind(1));
};

//Header revealing
const headerReaveler = function () {
  const revealHeader = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    headerTitle.style.transform = 'translateX(0)';
    navContainer.style.transform = 'translateX(0)';
    observer.unobserve(entry.target);
  };
  const headerObserver = new IntersectionObserver(revealHeader, {
    root: null,
    threshold: 0,
  });
  headerObserver.observe(header);
};

//Modal
const modalHandler = function () {
  const closeModal = function () {
    modal.classList.remove('size-modal'); //for transform effect
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };
  const showModal = function () {
    modal.classList.add('size-modal');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  showModalBtns.forEach(btn => btn.addEventListener('click', showModal));
  closeModalBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    e.key === 'Escape' && !modal.classList.contains('hidden') && closeModal();
  });
};

// section revealing
const sectionsRevealer = function () {
  const secRevealer = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('sec-hidden');
    observer.unobserve(entry.target);
  };

  sections.forEach(sec => {
    sec.classList.add('sec-hidden');
    const sectionObserver = new IntersectionObserver(secRevealer, {
      root: null,
      threshold: 0,
    });
    sectionObserver.observe(sec);
  });
};

const lazyImagesLoader = function () {
  const lazyLoader = function (entries, observer) {
    const [entry] = entries;
    const lazy = entry.target;
    if (!entry.isIntersecting) return;
    const src = lazy.dataset.src;
    lazy.src = src;
    lazy.addEventListener('load', function () {
      lazy.classList.remove('blur');
    });
    observer.unobserve(entry.target);
  };

  lazyImages.forEach(lazy => {
    const lazyObserver = new IntersectionObserver(lazyLoader, {
      root: null,
      threshold: 0,
      rootMargin: '300px',
    });
    lazyObserver.observe(lazy);
  });
};

// smooth scrolling
const smoothScroller = function () {
  navContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav-link')) {
      const id = e.target.getAttribute('href');
      // console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    } else {
      header.scrollIntoView({ behavior: 'smooth' }); //for icon to go home
    }
  });
};

// sticky nav
const navHieght = navContainer.getBoundingClientRect().height;
const main = document.querySelector('.main');
const sticker = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) navContainer.classList.remove('nav-sticky');
  else navContainer.classList.add('nav-sticky');
};
const mainObserver = new IntersectionObserver(sticker, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`,
});
mainObserver.observe(main);

////Functions calls
navFader();
headerReaveler();
modalHandler();
sectionsRevealer();
lazyImagesLoader();
smoothScroller();
