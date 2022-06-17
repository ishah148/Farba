
export const hamburger = document.querySelector('.hamburger');
export const burgerMenuLinks = document.querySelectorAll('.burger-menu__link')
export const blackout = document.querySelector('.blackout');
export const burgerMenuListItems = document.querySelectorAll('.burger-menu__list-item'); // TODO add this to obj and use {}

const burgerMenu = document.querySelector('.burger-menu');
const body = document.querySelector('body');
let laptopMinWidth = window.matchMedia("(min-width: 768px)");

export function addMenu() {
    hamburger.classList.add('open-menu');
    body.classList.add('stop-scrolling');
    blackout.classList.add('visible');
    burgerMenu.classList.add('visible');
}

export function closeMenu() {
    hamburger.classList.remove('open-menu');
    body.classList.remove('stop-scrolling');
    blackout.classList.remove('visible');
    burgerMenu.classList.remove('visible');
}


laptopMinWidth.addEventListener("change", function (laptopMinScreenSize) {
    if (laptopMinScreenSize.matches) {
        closeMenu();
    }
});


blackout.addEventListener("click", () => {
    closeMenu();
});

hamburger.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("open-menu")) {
        closeMenu();
    } else {
        addMenu();
    }
});
alert()
burgerMenuLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
});


