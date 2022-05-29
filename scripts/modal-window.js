const modalWindowWrapper = document.querySelector(".modal-window__wrapper");
let closeButton;
let modalWindow;
const body = document.querySelector('body');

function openFullSizePhoto(src) {
    let newSrc = src.replace(/(..\/\w+\/\w+\/)(\w+)/, '$1$2_full');
    let photoNumber = newSrc.match(/(\d+)\.+\w+$/m)[1];
    console.log(newSrc)
    console.log(photoNumber, '\n')
    console.log(newSrc.replace(/(..\/\w+\/\w+\/\w+\/\w+_)(\d+)(\.+\w+)$/m, `$1${+photoNumber + 1}$3`))

    // modalWindow = createModalWindow(newSrc);
    modalWindow = createModalWindow(newSrc);
    modalWindowWrapper.append(modalWindow);
    modalWindow.style.transition = 'transform 0.5s ease 0s';
    closeButton = modalWindow.querySelector(".modal-window__close-button");
    rightButton = modalWindow.querySelector(".modal-window__right-button");
    leftButton = modalWindow.querySelector(".modal-window__left-button");
    closeButton.addEventListener('click', () => {
        closeModalWindow();
    });
    rightButton.addEventListener('click', () => {
        closeModalWindow();
        if(+photoNumber >= '') {  //! доделать проверку через configAtr
            
        }
        setTimeout(() => { //! переделать на nextchild
            openFullSizePhoto(src.replace(/(..\/\w+\/\w+\/\w+\/\w+_)(\d+)(\.+\w+)$/m, `$1${+photoNumber + 1}$3`));
        }, 100)  //! timer waiting for close animation
    });
    leftButton.addEventListener('click', () => {
        closeModalWindow();
        if(+photoNumber === 1) {  //! доделать проверку через configAtr
            
        }
        setTimeout(() => { //! переделать на previousChild
            openFullSizePhoto(src.replace(/(..\/\w+\/\w+\/\w+\/\w+_)(\d+)(\.+\w+)$/m, `$1${+photoNumber - 1}$3`));
        }, 100)  //! timer waiting for close animation
    });
    body.classList.add('stop-scrolling');
    setTimeout(() => {
        modalWindowWrapper.classList.add('visible');
    }, 50);

}


function createModalWindow(src) {
    console.log('===', src)
    let newWindow = document.createElement('div');
    newWindow.classList.add('modal-window__container');
    newWindow.innerHTML = `
        <img src='${src}' alt = ''>
        <button class="modal-window__close-button">
            <svg class="modal-window__cross">
                <use xlink:href="../assets/svg/sprite.svg#cross"></use>
            </svg>
        </button>
        <button class="modal-window__left-button">
            <svg class="modal-window__arrow-left">
                <use xlink:href="../assets/svg/sprite.svg#arrow-left"></use>
            </svg>
        </button>
        <button class="modal-window__right-button">
            <svg class="modal-window__arrow-right">
                <use xlink:href="../assets/svg/sprite.svg#arrow-right"></use>
            </svg>
        </button>
        `
    return newWindow;
}


function closeModalWindow() {
    modalWindow.style.transition = 'none';
    document.querySelector(".modal-window__container").remove();
    body.classList.remove('stop-scrolling');
    modalWindowWrapper.classList.remove('visible');
}

