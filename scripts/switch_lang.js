import translateObj from './translate.js';

const switchLang = document.querySelector('.switch-lang');

function translatePage(language) {
    let data = document.querySelectorAll('[data-translate]');
    for (let currentElement of data) {
        currentElement.textContent = translateObj[language][currentElement.getAttribute('data-translate')];
        if (currentElement.placeholder) {
            currentElement.placeholder = translateObj[language][currentElement.getAttribute('data-translate')];
            currentElement.textContent = '';
        }

    }

    if (language === 'ru') {
        document.querySelector('.en').classList.remove('active');
        document.querySelector('.ru').classList.add('active');
    } else {
        document.querySelector('.ru').classList.remove('active');
        document.querySelector('.en').classList.add('active');
    }

}

function chooseLangButton(event) {
    if (event.target.dataset.switch)
        translatePage(event.target.dataset.switch);
}


switchLang.addEventListener("click", chooseLangButton);

