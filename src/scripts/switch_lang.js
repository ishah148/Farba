import translateObj from './translate.js';
export const currentLang = {
    lang: 'ru',
}
const switchLang = document.querySelectorAll('.switch-lang');

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
        document.querySelectorAll('.en').forEach(item => {
            item.classList.remove('active');
        })
        document.querySelectorAll('.ru').forEach(item => {
            item.classList.add('active');
        })
    } else {
        document.querySelectorAll('.ru').forEach(item => {
            item.classList.remove('active');
        })
        document.querySelectorAll('.en').forEach(item => {
            item.classList.add('active');
        })
    }

}

function chooseLangButton(event) {
    if (event.target.dataset.switch) {
        translatePage(event.target.dataset.switch);
        currentLang.lang = event.target.dataset.switch;
    }
}


switchLang.forEach(item => {
    item.addEventListener("click", chooseLangButton);
})



