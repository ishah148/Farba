
let configAtr;
let orderPhotos;
let configGridStyles;
(async function () {
    const module = await import("./photo_config.js");
    window.addEventListener("load", () => {
        const gg = new GridGalery("portfolio","getCountRows() return 'threeRows'")
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
        this.buttons = [
            document.querySelector('.modal-window__right-button'),
            document.querySelector('.modal-window__left-button'),
            document.querySelector('.modal-window__close-button'),
        ]
        this.init();
    }
    init() {

        document.querySelector('.modal-window__close-button.main').onclick = this.test
        this.createModalWindow(this.src);
    }
    test() {
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
            <img src='${this.getSrc()}' alt = ''>
        </div>
        `;
        // const modalWindowHTML = `
        // <div class="modal-window__container current--slide">
        //     <img src='${src}' alt = ''>
        // </div>
        // `;
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
    }

    nextPhoto() {
        this.currentOrder++;
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide')
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide')
        this.generateNext();
        this.clearSlides(0)
        this.clearSlides();
    }

    prevPhoto() {

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

    }
}
class GridGalery {
    constructor(dataAtr) {
        this.i = 1;
        this.dataAtr = dataAtr;// dataAtr['threeRows']
        this.elems = {
            buttons: document.querySelectorAll(".buttons-container__button"),
            portfolioContainer: document.querySelector(".portfolio__container"),
            video: document.querySelector("video"),
            source: document.querySelector("source"),
            getPortfolioCards: function () {
                return document.querySelectorAll(".portfolio__card");
            },
        };
        this.init()
    }
    init() {
        console.log(this.elems)
        this.newCards(this.dataAtr)
        this.galeryEventsInit()
    }

    removeCards() {
        elems.getPortfolioCards().forEach((card) => card.remove());
    }

    galeryEventsInit() {
        window.addEventListener("photoDowloaded", () => {
            this.elems.source.setAttribute("src", "../assets/video/video_fullHD_clip.mp4");
            this.elems.video.load();
            this.elems.video.play();
        });
        this.elems.buttons.forEach((button) => {
            button.onclick = this.switchPhotos.bind(this);
        });
        this.elems.portfolioContainer.addEventListener("click", (e) => {
            const dataAtr = e.target.id.split("_")[0];
            const currentPage = e.target.id.split("-")[0].split("_")[1];
            const currentPos = orderPhotos[dataAtr].indexOf(`${currentPage}`);
            const openSlider = new Slider(e.target.src, dataAtr, currentPage, currentPos, orderPhotos[dataAtr]);
        });
    }

    switchPhotos(event) {
        this.removeCards();
        this.newCards(event.currentTarget.dataset.photo);
        // TODO remove !
        this.debugClipboard();
    }

    removeCards() {
        this.elems.getPortfolioCards().forEach((card) => card.remove());
    }

    newCards(dataAtr) {
        let temp = this.getRange(configAtr[dataAtr]);
        if (orderPhotos[dataAtr]) {
            // adaptive to orderPhotos array
            temp = orderPhotos[dataAtr].map((i) => +i);
        }
        for (let i = 1; i < configAtr[dataAtr]; i++) {
            this.createCard(dataAtr, temp[i]);
        }
    }
    getRange(max) {
        let arr = [];
        for (let i = 1; i <= max; i++) {
            arr.push(i);
        }
        function shuffleArr(arr) {
            return arr.sort(() => Math.random() - 0.5);
        }
        return shuffleArr(arr);
    }

    createCard(dataAtr, page) {
        let newCard = document.createElement("div");
        newCard.classList.add("portfolio__card");
        newCard.classList.add(`${dataAtr}_${page}`);
        let img = new Image()
        img.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.webp`;
        img.id = `${dataAtr}_${page}-img`;
        img.onload = () => this.addGridStyleOnload(newCard, dataAtr, img)
        img.onerror = function (e) {
            console.log('error', e)
        };
        this.elems.portfolioContainer.append(newCard);
        newCard.append(img)
    }

    addGridStyleOnload(newCard, dataAtr, img) {
        this.i++;
        if (this.i === configAtr[dataAtr]) {
            window.dispatchEvent(new CustomEvent("photoDowloaded"));
        }
        let imgH = img.naturalHeight;
        let imgW = img.naturalWidth;
        configGridStyles.forEach((config) => {
            if (imgW === config.width && imgH === config.height) {
                newCard.classList.add(config.class);
            }
        });
    }

    debugClipboard() {
        // TODO delete: debug!!!
        let a = [];
        document
            .querySelectorAll(".portfolio__container img")
            .forEach((i) => a.push(...i.src.match(/\w+_\d+/)));
        let b = JSON.stringify(a);
        // 
        let input = document.querySelector(".contacts__textarea");
        input.textContent = b;
        input.select();
        document.execCommand("copy");
    }
}















// const gg = new GridGalery()


// const elems = {
//     buttons: document.querySelectorAll(".buttons-container__button"),
//     portfolioContainer: document.querySelector(".portfolio__container"),
//     video: document.querySelector("video"),
//     source: document.querySelector("source"),
//     getPortfolioCards: function () {
//         return document.querySelectorAll(".portfolio__card");
//     },
// };

// galeryEventsInit();
// function galeryEventsInit() {
//     window.addEventListener("photoDowloaded", () => {
//         elems.source.setAttribute("src", "../assets/video/video_fullHD_clip.mp4");
//         elems.video.load();
//         elems.video.play();
//     });
//     elems.buttons.forEach((button) => {
//         button.onclick = switchPhotos;
//     });
//     elems.portfolioContainer.addEventListener("click", (e) => {
//         // TODO повесил на родителя
//         // 
//         const dataAtr = e.target.id.split("_")[0];
//         const currentPage = e.target.id.split("-")[0].split("_")[1];
//         const currentPos = orderPhotos[dataAtr].indexOf(`${currentPage}`);
//         // const currentPos = Array.from(elems.portfolioContainer.children).findIndex((i) =>i.classList.contains(dataAtr + '_' + currentPage))
//         const openSlider = new Slider(e.target.src, dataAtr, currentPage, currentPos, orderPhotos[dataAtr]);
//     });
// }

// //elems.buttons[0].dataset.photo

// function switchPhotos(event) {
//     removeCards();
//     newCards(event.currentTarget.dataset.photo);
//     // TODO remove !
//     debugClipboard();
// }

// function removeCards() {
//     elems.getPortfolioCards().forEach((card) => card.remove());
// }

// function newCards(dataAtr) {
//     let temp = getRange(configAtr[dataAtr]);
//     if (orderPhotos[dataAtr]) {
//         // adaptive to orderPhotos array
//         temp = orderPhotos[dataAtr].map((i) => +i);

//     }

//     for (let i = 1; i < configAtr[dataAtr]; i++) {
//         createCard(dataAtr, temp[i]);
//     }
// }

// function getRange(max) {
//     let arr = [];
//     for (let i = 1; i <= max; i++) {
//         arr.push(i);
//     }
//     function shuffleArr(arr) {
//         return arr.sort(() => Math.random() - 0.5);
//     }
//     return shuffleArr(arr);
// }

// function createCard(dataAtr, page) {
//     let newCard = document.createElement("div");
//     newCard.classList.add("portfolio__card");
//     newCard.classList.add(`${dataAtr}_${page}`);
//     let img = new Image()
//     img.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.webp`;
//     img.id = `${dataAtr}_${page}-img`;
//     img.onload = function () {
//         addGridStyleOnload(newCard, dataAtr, img)
//     }
//     img.onerror = function (e) {
//         console.log('error', e)
//     };
//     elems.portfolioContainer.append(newCard);
//     newCard.append(img)
// }

// let i = 1;
// function addGridStyleOnload(newCard, dataAtr, img) {
//     i++;
//     if (i === configAtr[dataAtr]) {
//         window.dispatchEvent(new CustomEvent("photoDowloaded"));
//     }
//     let imgH = img.naturalHeight;
//     let imgW = img.naturalWidth;
//     configGridStyles.forEach((config) => {
//         if (imgW === config.width && imgH === config.height) {
//             newCard.classList.add(config.class);
//         }
//     });
// }

// function debugClipboard() {
//     // TODO delete: debug!!!
//     let a = [];
//     document
//         .querySelectorAll(".portfolio__container img")
//         .forEach((i) => a.push(...i.src.match(/\w+_\d+/)));
//     let b = JSON.stringify(a);
//     // 
//     let input = document.querySelector(".contacts__textarea");
//     input.textContent = b;
//     input.select();
//     document.execCommand("copy");
// }

// let img = new Image()

// img.onload = function () {
// card.src = `../assets/portfolio/${dataAtr}/${dataAtr}_${page}.jpg`
// }
// img.onerror = function () {
//
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


// cls Rat extends Slider {
//     constructor() {
//         this.rat = 'red';
//         this.init()
//     }
//     init(){
//
//     }
// }

// let x = new Rat();

// as