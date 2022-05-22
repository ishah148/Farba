const elems = {
    buttons: document.querySelectorAll('.buttons-container__button'),
    portfolioContainer: document.querySelector('.portfolio__container'),
    getPortfolioCards: function () {
        return document.querySelectorAll('.portfolio__card');
    },
}

window.addEventListener('load', (event) => {
    // console.log(event)
    newCards('furniture');
})

// *furniture
//elems.buttons[0].dataset.photo
elems.buttons.forEach(button => {
    button.onclick = switchPhotos;
})



function switchPhotos(event) {
    removeCards()
    newCards(event.currentTarget.dataset.photo)
}

function removeCards() {
    elems.getPortfolioCards().forEach(card => card.remove())
}
//! async
function newCards(dataAtr) { //  dataAtr - our folder!!!
    let max = 20; //TODO correct!
    if (dataAtr === 'portfolio') { max = 86 }
    if (dataAtr === 'furniture') { max = 43 }
    if (dataAtr === 'jewerly') { max = 62 }
    if (dataAtr === 'prams') { max = 42 }
    if (dataAtr === 'technics') { max = 43 }
    if (dataAtr === 'clothes') { max = 30 }
    let temp = getRange(max)
    // stage 1
    for (let i = 1; i < max; i++) {
        createCard(dataAtr, temp[i]);
    }

    // setTimeout(() => { // ! Костыль
    // checkStyle(dataAtr)
    // }, 1500); //TODO correct it shit!!!!!!!!!!!!
}

function getRange(max) {
    let arr = []
    for (let i = 1; i <= max; i++) {
        arr.push(i)
    }
    function shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5)
    }
    return shuffleArr(arr)
}

function createCard(dataAtr, page) {
    let newCard = document.createElement('div');
    newCard.classList.add("portfolio__card");
    newCard.classList.add(`${dataAtr}_${page}`);
    newCard.innerHTML = `<img src="../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg" id = "${dataAtr}_${page}-img" onload="addGridStyleOnload('${dataAtr}_${page}-img')" alt="" ">`; //onload="addGridStyle('${dataAtr}_${page}-img')
    newCard.addEventListener('click', (event) => {   // TODO повесеить на родителя, а не добавлять каждому элементу
        openFullSizePhoto(newCard.firstChild.getAttribute('src'));
    })
    elems.portfolioContainer.append(newCard)
}

function checkStyle(dataAtr) { // TODO delete, old
    elems.getPortfolioCards().forEach(card => {
        addGridStyle(card, dataAtr)
    })

    function addGridStyle(card, dataAtr) {
        let imgH = card.querySelector('img').naturalHeight
        let imgW = card.querySelector('img').naturalWidth

        // if (dataAtr === 'furniture' || dataAtr === 'prams') { // TODO return this
        if (dataAtr) {
            if (imgW === 300 && imgH === 615) {
                card.classList.add("g1-2");
            }
            if (imgW === 615 && imgH === 300) {
                card.classList.add("g2-1");
            }
            if (imgW === 300 && imgH === 300) {
                card.classList.add("g1-1");
            }
            if (imgW === 615 && imgH === 615) {
                card.classList.add("g2-2");
            }
            if (imgW === 300 && imgH === 200) {
                card.classList.add("g1-0_66"); //1 0.66
            }
            if (imgW === 300 && imgH === 450) {
                card.classList.add("g1-1_5"); //1 0.66
            }
            if (imgW === 615 && imgH === 410) {
                card.classList.add("g2-1_5"); //1 0.66
            }
        }
    }
}

function addGridStyleOnload(id) {
    card = document.getElementById(`${id}`)
    let imgH = card.naturalHeight
    let imgW = card.naturalWidth
    // if (dataAtr === 'furniture' || dataAtr === 'prams') { // TODO return this
    if (1) {
        if (imgW === 300 && imgH === 615) {
            card.parentElement.classList.add("g1-2");
        }
        if (imgW === 615 && imgH === 300) {
            card.parentElement.classList.add("g2-1");
        }
        if (imgW === 300 && imgH === 300) {
            card.parentElement.classList.add("g1-1");
        }
        if (imgW === 615 && imgH === 615) {
            card.parentElement.classList.add("g2-2");
        }
        if (imgW === 300 && imgH === 200) {
            card.parentElement.classList.add("g1-0_66"); //1 0.66
        }
        if (imgW === 300 && imgH === 450) {
            card.parentElement.classList.add("g1-1_5"); //1 0.66
        }
        if (imgW === 615 && imgH === 410) {
            card.parentElement.classList.add("g2-1_5"); //1 0.66
        }
    }
}


const gridConfig = [
    {
        dataAtr: '',

    },
]





//////////////////////////////// !modal window //////////////////////////
const modalWindowWrapper = document.querySelector(".modal-window__wrapper");
let closeButton;
let modalWindow;
const body = document.querySelector('body');



function openFullSizePhoto(src) {
    let newSrc = src.replace(/(..\/\w+\/\w+\/)(\w+)/, '$1$2__full');
    console.log(newSrc)

    // modalWindow = createModalWindow(newSrc);
    modalWindow = createModalWindow(src);
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

    let newWindow = document.createElement('div');
    newWindow.classList.add('modal-window');
    newWindow.innerHTML = `
        <img src='${src}' alt = ''>
        <button class="modal-window__close-button">
            <svg class="modal-window__svg-cross">
                <use xlink:href="../assets/svg/sprite.svg#Vector"></use>
              </svg>
        </button>`
    return newWindow;
}


function closeModalWindow() {
    modalWindow.style.transition = 'none';
    document.querySelector(".modal-window").remove();
    body.classList.remove('stop-scrolling');
    modalWindowWrapper.classList.remove('visible');
}