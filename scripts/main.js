import { hamburger, burgerMenuLinks, blackout, addMenu, closeMenu, burgerMenuListItems } from "./hamburger.js";
import { switchLang, chooseLangButton } from "./switch_lang.js";

// price cards hover
let priceCards = document.querySelectorAll('.prices__card-wrapper');

//burger menu
let laptopMinWidth = window.matchMedia("(min-width: 768px)");


//price cards hover
priceCards.forEach((card) => {
    card.querySelector('.price-card__button').addEventListener('mouseover', () => {
        card.classList.add('hover');
        card.querySelector('.price-card__title').classList.add('hover');
    })
    card.querySelector('.price-card__button').addEventListener('mouseout', () => {
        card.classList.remove('hover');
        card.querySelector('.price-card__title').classList.remove('hover');
    })
})


//show price list 

const priceListButton = document.querySelector('.prices__price-list-button');
const priceListButtonText = document.querySelector('.prices__button-text');
const priceListButtonSvg = document.querySelector('.prices__button-svg');
const priceList = document.querySelector('.price-list');
let isClickAllowed = true;

priceListButton.addEventListener('click', () => {
    if (isClickAllowed) {
        isClickAllowed = false
        setTimeout(()=>{
            isClickAllowed = true;
        },500)
        if (priceListButton.classList.contains('window-closed')) {
            priceList.classList.remove('invisible');
            priceListButton.classList.remove('window-closed');
            priceListButton.classList.add('inverted');
            priceListButtonSvg.classList.add('rotate');
            priceListButtonText.innerHTML = 'Cкрыть прайс';
            setTimeout(() => {
                const yOffset = -100;
                const yPosition = priceList.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: yPosition, behavior: 'smooth' });
            }, 350);
        } else {
            priceList.classList.add('invisible');
            priceListButton.classList.add('window-closed');
            priceListButton.classList.remove('inverted');
            priceListButtonSvg.classList.remove('rotate');
            priceListButtonText.innerHTML = 'Показать прайс';
            setTimeout(() => {
                const yOffset = -100;
                const yPosition = priceList.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: yPosition, behavior: 'smooth' });
            }, 350);
        }
    }
})


//burger-menu


laptopMinWidth.addEventListener('change', function (laptopMinScreenSize) {
    if (laptopMinScreenSize.matches) {
        closeMenu();
    }
});

blackout.addEventListener('click', () => closeMenu());

hamburger.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('open-menu')) {
        closeMenu();
    } else {
        addMenu();
    }
});

burgerMenuLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu())
})

burgerMenuListItems.forEach((item) => {
    item.addEventListener('mouseover', () => {
        item.classList.add('list-item--active')
    })
})


burgerMenuListItems.forEach((item) => {
    item.addEventListener('mouseout', () => {
        item.classList.remove('list-item--active')
    })
})



//switch lang

switchLang.addEventListener('click', chooseLangButton);