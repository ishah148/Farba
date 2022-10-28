function messageWindowEvents() { }
const blackout = document.querySelector('.blackout');
const msgSelectors = [
    ".contacts-window__container",
    ".contacts-window__wrapper",
];
const priceCardButtons = document.querySelectorAll('.price-card__button');
const inputName = document.querySelector('#contacts-window__user-name');
const inputNumber = document.querySelector('#contacts-window__user-number');
const contactsWindowWrapper = document.querySelector('.contacts-window__wrapper');

const contactsWindowButton = document.querySelector(".contacts-window__callback-bt");

contactsWindowButton.onclick = openMessageWindow;

function openMessageWindow() {
    contactsWindowButton.classList.add('hidden')
    msgSelectors.forEach((selector) =>
        document.querySelector(selector).classList.toggle("open")
    );
    blackout.classList.toggle("visible");
    document.querySelector(".contacts-window__wrapper").addEventListener('click', (e) => {
        if (e.target.classList.contains('contacts-window__wrapper')) closeMessageWindow()
    })
}

function closeMessageWindow() {
    document.querySelector(".contacts-window__callback-bt").classList.remove('hidden')
    msgSelectors.forEach((selector) =>
        document.querySelector(selector).classList.remove("open")
    );
    blackout.classList.remove("visible");
    document.querySelector(".contacts-window__wrapper").removeEventListener('click', closeMessageWindow)
}

blackout.addEventListener("click", () => {
    closeMessageWindow();
});


priceCardButtons.forEach((priceCardButton) => {
    priceCardButton.addEventListener('click', () => openMessageWindow())
})







inputName.addEventListener('focus', () => {
    if (/Mobi/i.test(window.navigator.userAgent) /* && window.innerHeight < window.innerWidth */) {
        if (!contactsWindowWrapper.classList.contains("absolute")) {
            contactsWindowWrapper.classList.add('absolute');
        }
    }
})

inputNumber.addEventListener('focus', () => {
    if (/Mobi/i.test(window.navigator.userAgent) /* && window.innerHeight < window.innerWidth */) {
        if (!contactsWindowWrapper.classList.contains("absolute")) {
            contactsWindowWrapper.classList.add('absolute');
        }
    }
})

inputName.addEventListener('blur', () => {
    if (/Mobi/i.test(window.navigator.userAgent)  /* && window.innerHeight < window.innerWidth */) {
        contactsWindowWrapper.classList.remove('absolute');
    }
})

inputNumber.addEventListener('blur', () => {
    if (/Mobi/i.test(window.navigator.userAgent)  /* && window.innerHeight < window.innerWidth */) {
        contactsWindowWrapper.classList.remove('absolute');
    }
})