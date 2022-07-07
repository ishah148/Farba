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