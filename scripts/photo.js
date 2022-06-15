let configAtr;
let orderPhotos;
let configGridStyles;
(async function () {
    console.time();
    const module = await import("./photo_config.js");
    console.timeEnd();
    // console.log('test',module.configAtr)
    window.addEventListener("load", () => {
        newCards("portfolio");
    });
    configAtr = module.configAtr;
    orderPhotos = module.orderPhotos;
    configGridStyles = module.configGridStyles;
})();

class FullSize {
    // openFullSize.openFullSizePhoto(e.target.src,dataAtr,currentPage,currentPos,orderPhotos[dataAtr]);
    constructor(src, dataAtr, currentPage, currentOrder, orderPhotos) {
        this.src = src;
        this.dataAtr = dataAtr;
        this.currentPage = currentPage;
        this.currentOrder = currentOrder;
        this.orderPhotos = orderPhotos;
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.init();
        this.NEXT = 1;
        this.PREV = -1;
    }
    init() {
        console.log();
        this.createModalWindow(this.src);
    }
    openFullSizePhoto() {
        modalWindow = createModalWindow(newSrc);
        modalWindowWrapper.append(modalWindow);
        modalWindow.style.transition = "transform 0.5s ease 0s";
        closeButton = modalWindow.querySelector(".modal-window__close-button");
        rightButton = modalWindow.querySelector(".modal-window__right-button");
        leftButton = modalWindow.querySelector(".modal-window__left-button");
    }
    getArrayOrders() {}
    getDataAtr() {}
    getSrc(order = 0) {
        return `../assets/portfolio/${this.dataAtr}_full/${this.dataAtr}_${ this.orderPhotos[this.currentOrder + order]}.webp`;
    }
    createModalWindow(src) {
        const modalWindowHTML = `
        <div class="modal-window__container">
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
        </div>
        `;
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.wrapper.classList.add("visible");
        this.addEvents();
        // return newWindow;
    }
    addEvents() {
        const closeButton = document.querySelector(
            ".modal-window__close-button"
        );
        const rightButton = document.querySelector(
            ".modal-window__right-button"
        );
        const leftButton = document.querySelector(".modal-window__left-button");
        rightButton.onclick = this.nextPhoto.bind(this);
        leftButton.onclick = this.previousPhoto.bind(this);
        closeButton.onclick = this.closeModalWindow;
        
    }
    nextPhoto() {
        console.log("next");
        this.generatePrev()
        this.generateNext()
    }

    previousPhoto() {
        console.log("prev");
        this.generatePrev()
        this.generateNext()
    }

    generateNext() {
        const html = `
        <div class="modal-window__container" style = "transform: translate3d(400px, 0px, 0px) scale(1);">
            <img src='${this.getSrc(this.NEXT)}' alt = ''>
            <button class="modal-window__close-button">
                <svg class="modal-window__cross">
                    <use xlink:href="../assets/svg/sprite.svg#cross"></use>
                </svg>
            </button>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    generatePrev() {
        const html = `
        <div class="modal-window__container" style = "transform: translate3d(-400px, 0px, 0px) scale(1);">
            <img src='${this.getSrc(this.PREV)}' alt = ''>
            <button class="modal-window__close-button">
                <svg class="modal-window__cross">
                    <use xlink:href="../assets/svg/sprite.svg#cross"></use>
                </svg>
            </button>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    closeModalWindow() {
        document.querySelectorAll(".modal-window__container").forEach(i => i.remove())
        body.classList.remove("stop-scrolling");
        modalWindowWrapper.classList.remove("visible");
    }
}

const elems = {
    buttons: document.querySelectorAll(".buttons-container__button"),
    portfolioContainer: document.querySelector(".portfolio__container"),
    video: document.querySelector("video"),
    source: document.querySelector("source"),
    getPortfolioCards: function () {
        return document.querySelectorAll(".portfolio__card");
    },
};

galeryEventsInit();
function galeryEventsInit() {
    window.addEventListener("photoDowloaded", () => {
        elems.source.setAttribute(
            "src",
            "../assets/video/video_fullHD_clip.mp4"
        );
        elems.video.load();
        elems.video.play();
    });
    elems.buttons.forEach((button) => {
        button.onclick = switchPhotos;
    });
    elems.portfolioContainer.addEventListener("click", (e) => {
        // TODO повесил на родителя
        // console.log(e.target.id.split())
        const dataAtr = e.target.id.split("_")[0];
        const currentPage = e.target.id.split("-")[0].split("_")[1];
        const currentPos = orderPhotos[dataAtr].indexOf(`${currentPage}`);
        // const currentPos = Array.from(elems.portfolioContainer.children).findIndex((i) =>i.classList.contains(dataAtr + '_' + currentPage))
        const openFullSize = new FullSize(
            e.target.src,
            dataAtr,
            currentPage,
            currentPos,
            orderPhotos[dataAtr]
        );
    });
}

//elems.buttons[0].dataset.photo

function switchPhotos(event) {
    removeCards();
    newCards(event.currentTarget.dataset.photo);
    // TODO remove !
    debugClipboard();
}

function removeCards() {
    elems.getPortfolioCards().forEach((card) => card.remove());
}

function newCards(dataAtr) {
    let temp = getRange(configAtr[dataAtr]);
    if (orderPhotos[dataAtr]) {
        // adaptive to orderPhotos array
        temp = orderPhotos[dataAtr].map((i) => +i);
        console.log("newTemp" + temp);
    }
    console.log(temp);
    for (let i = 1; i < configAtr[dataAtr]; i++) {
        createCard(dataAtr, temp[i]);
    }
}

function getRange(max) {
    let arr = [];
    for (let i = 1; i <= max; i++) {
        arr.push(i);
    }
    function shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
    return shuffleArr(arr);
}

function createCard(dataAtr, page) {
    let newCard = document.createElement("div");
    newCard.classList.add("portfolio__card");
    newCard.classList.add(`${dataAtr}_${page}`);
    newCard.innerHTML = `<img src="../assets/portfolio/${dataAtr}/${dataAtr}_${page}.webp" 
        id = "${dataAtr}_${page}-img" 
        onload="addGridStyleOnload('${dataAtr}_${page}-img','${dataAtr}','${page}')" 
        alt="" ">`; //onload="addGridStyle('${dataAtr}_${page}-img')
    // newCard.addEventListener("click", (e) => {
    //     // TODO повесеить на родителя, а не добавлять каждому элементу
    //     console.log('target',e.target.src)
    //     console.log('=>',newCard.firstChild.getAttribute("src"))
    //     openFullSizePhoto(newCard.firstChild.getAttribute("src"));
    // }); // TODO test!
    elems.portfolioContainer.append(newCard);
}

let i = 1;
async function addGridStyleOnload(id, dataAtr, page) {
    i++;
    if (i === configAtr[dataAtr]) {
        window.dispatchEvent(new CustomEvent("photoDowloaded"));
    }
    const card = document.getElementById(`${id}`);
    card.removeAttribute("onload"); // avoid loop!
    let imgH = card.naturalHeight;
    let imgW = card.naturalWidth;
    configGridStyles.forEach((config) => {
        if (imgW === config.width && imgH === config.height) {
            card.parentElement.classList.add(config.class);
        }
    });
}

function debugClipboard() {
    // TODO delete: debug!!!
    let a = [];
    document
        .querySelectorAll(".portfolio__container img")
        .forEach((i) => a.push(...i.src.match(/\w+_\d+/)));
    let b = JSON.stringify(a);
    // console.log(b)
    let input = document.querySelector(".contacts__textarea");
    input.textContent = b;
    input.select();
    document.execCommand("copy");
}

// let img = new Image()

// img.onload = function () {
//     // card.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg`
// }
// img.onerror = function () {
//     console.log('error')
// };
// img.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg`

// TODO
// document.getElementById('jpg').onclick = function (){
//     let reg = /\.\w+$/m
//     document.querySelectorAll('.portfolio__card img').forEach( img => img.src = img.src.replace(reg,'.jpg') )
//     if(document.querySelector('.modal-window__container img')){
//         document.querySelector('.modal-window__container img').src = document.querySelector('.modal-window__container img').src.replace(reg,'.jpg')
//     }
// }
// document.getElementById('webp').onclick = function (){
//     let reg = /\.\w+$/m
//     document.querySelectorAll('.portfolio__card img').forEach( img => img.src = img.src.replace(reg,'.webp') )
//     if(document.querySelector('.modal-window__container img')){
//         document.querySelector('.modal-window__container img').src = document.querySelector('.modal-window__container img').src.replace(reg,'.webp')
//     }
// }
