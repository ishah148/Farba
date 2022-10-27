function messageWindowEvents() { }
const blackout = document.querySelector('.blackout');
const msgSelectors = [
    ".contacts-window__container",
    ".contacts-window__wrapper",
];
const inputName = document.querySelector('#contacts-window__user-name');
const inputNumber = document.querySelector('#contacts-window__user-number');
const contactsWindowWrapper = document.querySelector('.contacts-window__wrapper');

document.querySelector(".contacts-window__callback-bt").onclick = openMessageWindow;
function openMessageWindow() {
    this.classList.add('hidden')
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



inputName.addEventListener('focus', () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) /* && window.innerHeight < window.innerWidth */) {
        if (!contactsWindowWrapper.classList.contains("absolute")) {
            contactsWindowWrapper.classList.add('absolute');
        }
    }
})

inputNumber.addEventListener('focus', () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) /* && window.innerHeight < window.innerWidth */) {
        if (!contactsWindowWrapper.classList.contains("absolute")) {
            contactsWindowWrapper.classList.add('absolute');
        }
    }
})

inputName.addEventListener('blur', () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)  /* && window.innerHeight < window.innerWidth */) {
        contactsWindowWrapper.classList.remove('absolute');
    }
})

inputNumber.addEventListener('blur', () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)  /* && window.innerHeight < window.innerWidth */) {
        contactsWindowWrapper.classList.remove('absolute');
    }
})