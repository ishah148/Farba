
import {
    blackout,    //!REMOVE OR MOVE
} from "./hamburger.js";
import { windowScrollListener} from "./header.js";
import { switchLang, chooseLangButton } from "./switch_lang.js";
import TelegramSendMessage from "./tg_bot.js";
const tg = new TelegramSendMessage("contacts-window__form");


//message window
function messageWindowEvents(){}
const msgSelectors = [
    ".contacts-window__container",
    ".contacts-window__wrapper",
];

document.querySelector(".contacts-window__callback-bt").onclick = openMessageWindow;
function openMessageWindow() {
    this.classList.add('hidden')
    msgSelectors.forEach((selector) =>
        document.querySelector(selector).classList.toggle("open")
    );
    blackout.classList.toggle("visible");
    document.querySelector(".contacts-window__wrapper").addEventListener('click',(e)=>{
            if(e.target.classList.contains('contacts-window__wrapper')) closeMessageWindow()
    })
}
function closeMessageWindow(){
    document.querySelector(".contacts-window__callback-bt").classList.remove('hidden')
    msgSelectors.forEach((selector) =>
        document.querySelector(selector).classList.remove("open")
    );
    blackout.classList.remove("visible");
    document.querySelector(".contacts-window__wrapper").removeEventListener('click',closeMessageWindow)
}

// price cards hover
let priceCards = document.querySelectorAll(".prices__card-wrapper");


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




//TODO blackout.addEventListener in other file

blackout.addEventListener("click", () => {
    closeMessageWindow();
});




//switch lang

switchLang.addEventListener("click", chooseLangButton);
