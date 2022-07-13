
    document.querySelector('.messengers-window').addEventListener('click',openContactWindow)
    function openContactWindow(){
        this.classList.toggle('messengers-window--hidden')
        document.querySelector('.messengers-window__links-container').classList.toggle('messengers-window--hidden')
        document.querySelector('.messengers-window__svg-icon.phone').classList.toggle('phone--rotate')
        document.querySelector('.messengers-window__svg-icon.phone').classList.toggle('phone--rotate-return')
    }
