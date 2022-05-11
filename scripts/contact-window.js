function contactW(){
    document.querySelector('.contacts-window').addEventListener('click',openContactWindow)
    function openContactWindow(){
        this.classList.toggle('contacts-window--hidden')
        document.querySelector('.contacts-window-container').classList.toggle('contacts-window--hidden')
        document.querySelector('.contacts-window__svg-icon.phone').classList.toggle('phone--rotate')
        document.querySelector('.contacts-window__svg-icon.phone').classList.toggle('phone--rotate-return')
    }
}