import { hamburger, burgerMenuLinks, blackout, addMenu, closeMenu, burgerMenuListItems} from "./hamburger.js"

// price cards hover
let priceCards = document.querySelectorAll('.prices__card');

//burger menu
let laptopMinWidth = window.matchMedia("(min-width: 768px)");


//price cards hover
priceCards.forEach((card)=>{
    card.querySelector('.prices__button').addEventListener('mouseover', ()=>{
        card.classList.add('hover');
        card.querySelector('.prices__card-title').classList.add('hover');
    })
    card.querySelector('.prices__button').addEventListener('mouseout', ()=>{
        card.classList.remove('hover');
        card.querySelector('.prices__card-title').classList.remove('hover');
    })
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