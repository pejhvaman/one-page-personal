'use strice';

// Nav fade effect
const navContainer = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
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

//Header revealing
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header-title');
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

//Modal
const modal = document.querySelector('.modal');
const showModalBtns = document.querySelectorAll('.show-modal-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const overlay = document.querySelector('.overlay');

showModalBtns.forEach(btn =>
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.add('size-modal');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  })
);
closeModalBtn.addEventListener('click', function (e) {
  e.preventDefault();
  modal.classList.remove('size-modal');
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});
