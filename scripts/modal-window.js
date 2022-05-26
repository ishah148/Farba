const modalWindowWrapper = document.querySelector(".modal-window__wrapper");
let closeButton;
let modalWindow;
const body = document.querySelector('body');

function openFullSizePhoto(src) {
    let newSrc = src.replace(/(..\/\w+\/\w+\/)(\w+)/, '$1$2_full');
    console.log(newSrc)

    // modalWindow = createModalWindow(newSrc);
    modalWindow = createModalWindow(newSrc);
    modalWindowWrapper.append(modalWindow);
    modalWindow.style.transition = 'transform 0.5s ease 0s';
    closeButton = modalWindow.querySelector(".modal-window__close-button");
    closeButton.addEventListener('click', () => {
        closeModalWindow();
    })
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
        
        <svg class="modal-window__svg-cross">
        <use xlink:href="../assets/svg/cross.svg#cross"></use>
        </svg>
        
        </button>`
    return newWindow;
}


function closeModalWindow() {
    modalWindow.style.transition = 'none';
    document.querySelector(".modal-window__container").remove();
    body.classList.remove('stop-scrolling');
    modalWindowWrapper.classList.remove('visible');
}