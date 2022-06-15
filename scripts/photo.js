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

class Slider {
    // openFullSize.openFullSizePhoto(e.target.src,dataAtr,currentPage,currentPos,orderPhotos[dataAtr]);
    constructor(src, dataAtr, currentPage, currentOrder, orderPhotos) {
        this.src = src;
        this.dataAtr = dataAtr;
        this.currentPage = currentPage;
        this.currentOrder = currentOrder;
        this.orderPhotos = orderPhotos;
        this.wrapper = document.querySelector(".modal-window__wrapper");
        this.NEXT = 1;
        this.PREV = -1;
        this.init();
    }
    init() {
        console.log(this.wrapper)
        document.querySelector('.modal-window__close-button.main').onclick = this.test
        this.createModalWindow(this.src);
        console.log(this);
    }
    getArrayOrders() { }
    getDataAtr() { }
    test(){
        console.log('test')
    }
    getSrc(order = 0) {
        return `../assets/portfolio/${this.dataAtr}_full/${this.dataAtr}_${this.orderPhotos[this.currentOrder + order]}.webp`;
    }
    getSlides() {
        return this.wrapper.querySelectorAll(".modal-window__container");
    }
    createModalWindow(src) {
        const modalWindowHTML = `
        <div class="modal-window__container current--slide">
            <img src='${src}' alt = ''>
        </div>
        `;
        this.generateNext()
        this.generatePrev()
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.wrapper.classList.add("visible");
        this.addEvents();
        // return newWindow;
    }
    addEvents() {
        const closeButton = document.querySelector(".modal-window__close-button");
        const rightButton = document.querySelector(".modal-window__right-button");
        const leftButton = document.querySelector(".modal-window__left-button");
        rightButton.onclick = this.nextPhoto.bind(this);
        leftButton.onclick = this.prevPhoto.bind(this);
        closeButton.onclick = this.closeModalWindow;
        console.log(leftButton);
    }

    nextPhoto() {
        console.log("next");
        this.currentOrder++;
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide')
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide')
        this.generateNext();
        this.clearSlides(0)
        this.clearSlides();
    }

    prevPhoto() {
        console.log("prev");
        if (this.currentOrder === 1) return -1
        this.currentOrder--
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide')
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide')
        this.generatePrev();
        this.clearSlides(3)

    }

    generateNext() {
        const html = `
        <div class="modal-window__container next--slide" >
            <img src='${this.getSrc(this.NEXT)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("beforeend", html);
    }

    clearSlides(order) {
        let slides = this.getSlides();
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generatePrev() {
        const html = `
        <div class="modal-window__container prev--slide" >
            <img src='${this.getSrc(this.PREV)}' alt = ''>
        </div>    
        `;
        this.wrapper.insertAdjacentHTML("afterbegin", html);
    }

    closeModalWindow() {
        document.querySelector(".modal-window__wrapper").classList.remove("visible");
        document
            .querySelectorAll(".modal-window__container")
            .forEach((i) => i.remove());
        body.classList.remove("stop-scrolling");
        console.log(this.wrapper)
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
        elems.source.setAttribute("src", "../assets/video/video_fullHD_clip.mp4");
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
        const openSlider = new Slider(e.target.src, dataAtr, currentPage, currentPos, orderPhotos[dataAtr]);
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
    //     openSliderPhoto(newCard.firstChild.getAttribute("src"));
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
