import { currentLang } from "./switch_lang";
const priceListButton = document.querySelector('.prices__price-list-button');
const priceListButtonText = document.querySelector('.prices__button-text');
const priceListButtonSvg = document.querySelector('.prices__button-svg');
const priceList = document.querySelector('.price-list');
let isClickAllowed = true;

[priceListButton, priceListButtonSvg].forEach((element) => {
    element.addEventListener('click', () => {
        if (isClickAllowed) {
            isClickAllowed = false
            setTimeout(() => {
                isClickAllowed = true;
            }, 500)
            if (priceListButton.classList.contains('window-closed')) {
                priceList.classList.remove('invisible');
                priceListButton.classList.remove('window-closed');
                priceListButtonSvg.classList.add('rotate');
                priceListButtonText.innerHTML = currentLang.lang === 'ru' ? 'Cкрыть прайс' : 'Hide price';
                priceListButtonText.dataset.translate = 'hide-price';
                setTimeout(() => {
                    const yOffset = -100;
                    const yPosition = priceList.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: yPosition, behavior: 'smooth' });
                }, 350);
            } else {
                priceList.classList.add('invisible');
                priceListButton.classList.add('window-closed');
                priceListButtonSvg.classList.remove('rotate');
                priceListButtonText.innerHTML = currentLang.lang === 'ru' ? 'Показать весь прайс' : 'Show all price';
                priceListButtonText.dataset.translate = 'show-price';
                setTimeout(() => {
                    const yOffset = -100;
                    const yPosition = priceList.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: yPosition, behavior: 'smooth' });
                }, 350);
            }
        }
    })
});

priceListButtonSvg.addEventListener('mouseover', () => {
    priceListButton.classList.add('svg-button-is-hovered');
});

priceListButtonSvg.addEventListener('mouseleave', () => {
    priceListButton.classList.remove('svg-button-is-hovered');
});