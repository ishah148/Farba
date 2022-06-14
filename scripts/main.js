import {
    hamburger,
    burgerMenuLinks,
    blackout,
    addMenu,
    closeMenu,
    burgerMenuListItems,
} from "./hamburger.js";
import { switchLang, chooseLangButton } from "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
const tg = new TelegramSendMessage("contacts-window__form");

//message window
function messageWindowEvents(){}
const msgSelectors = [
    ".contacts-window__container",
    ".contacts-window__wrapper",
];

document.querySelector(".contacts-window__button").onclick = openMessageWindow;
function openMessageWindow() {
    msgSelectors.forEach((selector) =>
        document.querySelector(selector).classList.toggle("open")
    );
    blackout.classList.toggle("visible");
    document.querySelector(".contacts-window__wrapper").addEventListener('click',(e)=>{
            if(e.target.classList.contains('contacts-window__wrapper')) closeMessageWindow()
    })
}
function closeMessageWindow(){
    msgSelectors.forEach((selector) =>
        document.querySelector(selector).classList.remove("open")
    );
    blackout.classList.remove("visible");
    document.querySelector(".contacts-window__wrapper").removeEventListener('click',closeMessageWindow)
}

// price cards hover
let priceCards = document.querySelectorAll(".prices__card-wrapper");

//burger menu
let laptopMinWidth = window.matchMedia("(min-width: 768px)");

//price cards hover
priceCards.forEach((card) => {
    card.querySelector(".price-card__button").addEventListener(
        "mouseover",
        () => {
            card.classList.add("hover");
            card.querySelector(".price-card__title").classList.add("hover");
        }
    );
    card.querySelector(".price-card__button").addEventListener(
        "mouseout",
        () => {
            card.classList.remove("hover");
            card.querySelector(".price-card__title").classList.remove("hover");
        }
    );
});

//show price list

const priceListButton = document.querySelector(".prices__price-list-button");
const priceList = document.querySelector(".price-list");
let isClickAllowed = true;

priceListButton.addEventListener("click", () => {
    if (isClickAllowed) {
        isClickAllowed = false;
        setTimeout(() => {
            isClickAllowed = true;
        }, 500);
        if (priceListButton.classList.contains("window-closed")) {
            priceList.classList.remove("invisible");
            priceListButton.classList.remove("window-closed");
            priceListButton.innerHTML = "Cкрыть прайс";
            setTimeout(() => {
                const yOffset = -100;
                const yPosition =
                    priceList.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                window.scrollTo({ top: yPosition, behavior: "smooth" });
            }, 350);
        } else {
            priceList.classList.add("invisible");
            priceListButton.classList.add("window-closed");
            priceListButton.innerHTML = "Показать весь прайс-лист";
        }
    }
});

//burger-menu

laptopMinWidth.addEventListener("change", function (laptopMinScreenSize) {
    if (laptopMinScreenSize.matches) {
        closeMenu();
    }
});

blackout.addEventListener("click", () => {
    closeMessageWindow();
    closeMenu();
});

hamburger.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("open-menu")) {
        closeMenu();
    } else {
        addMenu();
    }
});

burgerMenuLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
});

burgerMenuListItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
        item.classList.add("list-item--active");
    });
});

burgerMenuListItems.forEach((item) => {
    item.addEventListener("mouseout", () => {
        item.classList.remove("list-item--active");
    });
});

//switch lang

switchLang.addEventListener("click", chooseLangButton);
