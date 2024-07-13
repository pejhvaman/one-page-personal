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
const main = document.querySelector('.main');
const tabsContainer = document.querySelector('.tabs');
const tabs = document.querySelectorAll('.tab');
const tabsContent = document.querySelector('.tabs-content');
const tabContents = document.querySelectorAll('.tab-content');
const footer = document.querySelector('.footer');
const footerNav = document.querySelector('.footer-nav');
const footerImg = document.querySelector('.footer-img');
const sliderEl = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const sliderBtnRight = document.querySelector('.slider-btn-right');
const sliderBtnLeft = document.querySelector('.slider-btn-left');
const dotsContainer = document.querySelector('.dots');
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
        if (sibling !== link) sibling.style.opacity = this;
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
      if (id === '#') return;
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    } else {
      header.scrollIntoView({ behavior: 'smooth' }); //for icon to go home
    }
  });
};

// sticky nav

const navSticker = function () {
  const navHieght = navContainer.getBoundingClientRect().height;
  const sticker = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) navContainer.classList.remove('nav-sticky');
    else navContainer.classList.add('nav-sticky');
  };
  const mainObserver = new IntersectionObserver(sticker, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHieght * 2}px`,
  });
  mainObserver.observe(main);
};

// Tabbed component
const tabbedComponent = function () {
  const activeTab = function (tab) {
    tabs.forEach(t => {
      t.classList.remove('tab-active');
    });
    tabs[tab].classList.add('tab-active');
  };

  const activeTabContent = function (content) {
    tabContents.forEach(c => {
      c.classList.add('tab-content-hidden');
      c.classList.remove('tab-content-active');
    });
    tabContents[content].classList.add('tab-content-active');
  };
  activeTab(0);
  activeTabContent(0);

  tabsContainer.addEventListener('click', function (e) {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    // console.log(tab);
    const tabNumber = tab.dataset.tab;
    // console.log(tabNumber);
    activeTab(tabNumber - 1);
    activeTabContent(tabNumber - 1);
  });
};

// slider
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };
  goToSlide(0);

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', prevSlide);

  const createDots = function () {
    slides.forEach((s, i) => {
      const dot = `<button class="dot" data-slide="${i}"></button>`;
      dotsContainer.insertAdjacentHTML('beforeend', dot);
    });
  };
  createDots();

  const activateDot = function (dot) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('dot-active'));
    document
      .querySelector(`.dot[data-slide="${dot}"`)
      .classList.add('dot-active');
  };
  activateDot(0);

  dotsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dot')) return;
    const slide = +e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
    curSlide = slide;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
};

// footer hover effect
const footerEffect = function () {
  const handleHover = function (e, className, parentClass, opac) {
    e.preventDefault();
    if (e.target.classList.contains(className)) {
      // console.log('yes');
      const target = e.target;
      const siblings = target
        .closest(`.${parentClass}`)
        .querySelectorAll(`.${className}`);
      siblings.forEach(sib => {
        if (sib !== target) sib.style.opacity = opac;
      });
    }
  };

  footerNav.addEventListener('mouseover', function (e) {
    handleHover(e, 'footer-nav-item', 'footer-nav', 0.5);
  });
  footerNav.addEventListener('mouseout', function (e) {
    handleHover(e, 'footer-nav-item', 'footer-nav', 1);
  });
};

////Functions calls
navFader();
headerReaveler();
modalHandler();
sectionsRevealer();
lazyImagesLoader();
smoothScroller();
navSticker();
tabbedComponent();
slider();
footerEffect();
