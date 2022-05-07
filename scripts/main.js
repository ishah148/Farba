import {
  hamburger, burgerMenuLinks, blackout, addMenu, closeMenu, burgerMenuListItems,
} from './hamburger.js';
import { switchLang, chooseLangButton } from './switch_lang.js';

// price cards hover
const priceCards = document.querySelectorAll('.prices__card-wrapper');

// burger menu
const laptopMinWidth = window.matchMedia('(min-width: 768px)');

// price cards hover
priceCards.forEach((card) => {
  card.querySelector('.prices__button').addEventListener('mouseover', () => {
    card.classList.add('hover');
    card.querySelector('.prices__card-title').classList.add('hover');
  });
  card.querySelector('.prices__button').addEventListener('mouseout', () => {
    card.classList.remove('hover');
    card.querySelector('.prices__card-title').classList.remove('hover');
  });
});
alert('111')
console.log('222222222222222222222222');
// burger-menu

laptopMinWidth.addEventListener('change', (laptopMinScreenSize) => {
  if (laptopMinScreenSize.matches) {
    closeMenu();
  }
});
goo
debu

blackout.addEventListener('click', () => closeMenu());

hamburger.addEventListener('click', (event) => {
  if (event.currentTarget.classList.contains('open-menu')) {
    closeMenu();
  } else {
    addMenu();
  }
});
foo()

burgerMenuLinks.forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

burgerMenuListItems.forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.classList.add('list-item--active');
  });
});

burgerMenuListItems.forEach((item) => {
  item.addEventListener('mouseout', () => {
    item.classList.remove('list-item--active');
  });
});


// switch lang

switchLang.addEventListener('click', chooseLangButton);
