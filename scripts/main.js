
import "./hamburger.js";
import "./header.js";
import "./price_cards_hover.js";
import "./switch_lang.js";
import "./show_price_table.js"
import "./contacts-window.js"
import TelegramSendMessage from "./tg_bot.js";
const tg = new TelegramSendMessage("contacts-window__form");

window.addEventListener("load", () => {
    const gg = new GridGalery("portfolio", "getCountRows() return 'threeRows'")
    // gg.init()
    gg.showFirstPart()
    document.getElementById('show-all').onclick = () => {
        console.log('cl')
        gg.showSecondPart()
    }
});

const configAtr = { //amount photos in each folder
    // portfolio: 15,
    portfolio: 86,
    furniture: 43,
    jewerly: 62,
    prams: 42,
    technics: 43,
    clothes: 30,
};

const orderPhotos = {
    portfolio: {
        fourRows: ["55", "31", "34", "4", "46", "77", "53", "27", "68", "33", "57", "75", "3", "70", "84", "65", "24", "39", "48", "16", "28", "22", "44", "19", "17", "71", "50", "21", "79", "81", "38", "36", "9", "5", "29", "80", "58", "49", "52", "83", "60", "12", "59", "47", "15", "69", "82", "85", "7", "32", "78", "43", "64", "74", "8", "35", "72", "18", "11", "61", "63", "51", "2", "62", "37", "1", "54", "41", "67", "26", "40", "10", "66", "20", "23", "86", "6", "45", "56", "76", "13", "42", "14", "25", "30"],
        threeRows: ["24", "29", "26", "3", "41", "40", "17", "28", "35", "37", "38", "1", "19", "23", "16", "5", "39", "20", "31", "14", "21", "10", "11", "33", "58", "4", "53", "2", "77", "18", "79", "7", "32", "65", "13", "85", "27", "43", "36", "8", "48", "6", "34", "22", "84", "45", "62", "12", "15", "81", "49", "44", "25", "42", "70", "64", "78", "67", "46", "57", "74", "86", "60", "50", "80", "52", "75", "73", "82", "51", "59", "47", "56", "63", "83", "54", "76", "71", "69", "68", "61", "55", "66", "72", "30"],
        twoRows: ["4", "31", "27", "55", "11", "86", "40", "41", "62", "78", "79", "74", "1", "47", "77", "19", "60", "17", "32", "30", "44", "76", "52", "57", "72", "54", "7", "81", "71", "28", "58", "49", "36", "8", "29", "46", "80", "63", "35", "25", "9", "14", "22", "15", "23", "75", "85", "68", "45", "16", "64", "13", "70", "2", "42", "67", "82", "66", "20", "73", "56", "5", "33", "69", "51", "48", "12", "53", "50", "43", "38", "18", "21", "59", "24", "34", "83", "65", "39", "61", "37", "26", "6", "3", "10"],
    },
    clothes: {
        fourRows: ["2", "28", "11", "21", "15", "20", "5", "13", "6", "26", "24", "18", "1", "23", "7", "8", "16", "30", "19", "14", "17", "29", "27", "10", "22", "12", "4", "9"],
        threeRows: ["8", "5", "28", "24", "27", "9", "29", "13", "26", "23", "1", "2", "11", "22", "3", "16", "18", "17", "15", "21", "20", "12", "25", "7", "10", "6", "4", "14"],
        twoRows: ["2", "28", "11", "21", "15", "20", "5", "13", "6", "26", "24", "18", "1", "23", "7", "8", "16", "30", "19", "14", "17", "29", "27", "10", "22", "12", "4", "9", "25"],
    }
};


const configGridStyles = [
    {
        width: 300,
        height: 615,
        class: "g1-2",
    },
    {
        width: 615,
        height: 300,
        class: "g2-1",
    },
    {
        width: 300,
        height: 300,
        class: "g1-1",
    },
    {
        width: 615,
        height: 615,
        class: "g2-2",
    },
    {
        width: 300,
        height: 200,
        class: "g1-0_66",
    },
    {
        width: 300,
        height: 450,
        class: "g1-1_5",
    },
    {
        width: 615,
        height: 410,
        class: "g2-1_5",
    },
];






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
        this.generateNext()
        this.generatePrev()
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.wrapper.classList.add("visible");
        document.querySelector('body').classList.add('stop-scrolling');
        this.addEvents();
    }
    addEvents() {
        const closeButton = document.querySelector(".modal-window__close-button");
        const rightButton = document.querySelector(".modal-window__right-button");
        const leftButton = document.querySelector(".modal-window__left-button");
        rightButton.onclick = this.nextPhoto.bind(this);
        leftButton.onclick = this.prevPhoto.bind(this);
        closeButton.onclick = this.closeModalWindow;
        if (this.isTouchDevice) {
            this.touchHandle()
        }
    }

    isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    touchHandle() {
        const wrapper = this.wrapper
        wrapper.addEventListener('touchstart', handleTouchStart.bind(this), false);
        wrapper.addEventListener('touchmove', handleTouchMove.bind(this), false);
        let xStart = null;
        let yStart = null;
        let sensitivity = 100;
        function handleTouchStart(e) {
            xStart = e.touches[0].clientX;
            yStart = e.touches[0].clientY;

        };
        function handleTouchMove(e) {
            let xMove = e.touches[0].clientX;
            let yMove = e.touches[0].clientY;
            function left() {
                return xStart > (xMove + sensitivity)
            }
            function right() {
                return (xStart + sensitivity) < xMove
            }
            function down() {
                return (yStart + sensitivity) < yMove
            }
            function up() {
                return yStart > (yMove + sensitivity)
            }
            const removeEvents = () => {
                wrapper.replaceWith(wrapper.cloneNode(true));
            }
            if (left()) {
                this.nextPhoto()
                xStart = xMove
                console.log('next')
            }
            if (right()) {
                this.prevPhoto()
                xStart = xMove
                console.log('prev')
            }
            if (down() && !left() && !right()) {
                document.querySelector('.current--slide').classList.add('up')
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow()
                    removeEvents()
                })

            }
            if (up() && !left() && !right()) {
                console.log('op')
                document.querySelector('.current--slide').classList.add('down')
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow()
                    removeEvents()
                })
            }
        };
    }

    nextPhoto() {
        if (this.currentOrder === this.orderPhotos.length - 1) { return -1 }
        this.currentOrder++;
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide')
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide')
        this.generateNext();
        this.clearSlides(0)

    }

    prevPhoto() {

        if (this.currentOrder === 0) return -1
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
        document.querySelector('body').classList.remove("stop-scrolling");

    }
}

class GridGalery {
    constructor(dataAtr) {
        this.i = 1;
        this.dataAtr = dataAtr;// dataAtr['threeRows']
        this.isFirstPart = false;
        this.isSecondPart = false;
        this.firstPartLength = 43;
        this.elems = {
            buttons: document.querySelectorAll(".buttons-container__button"),
            portfolioContainer: document.querySelector(".portfolio__container"),
            video: document.querySelector("video"),
            source: document.querySelector("source"),
            getPortfolioCards: function () {
                return document.querySelectorAll(".portfolio__card");
            },
        };
        // this.init()
    }
    init() {
        this.countRows = this.getCountRows();
        console.log(this.elems);
        this.newCards(this.dataAtr);
        this.galeryEventsInit();
    }

    showFirstPart() {
        this.isFirstPart = true;
        this.isSecondPart = false;
        this.init();
    }

    showSecondPart() {
        this.isFirstPart = false;
        this.isSecondPart = true;
        this.init()
    }

    removeCards() {
        debugger
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
            const countRows = this.getCountRows();
            const dataAtr = e.target.id.split("_")[0];
            const currentPage = e.target.id.split("-")[0].split("_")[1];
            const currentPos = orderPhotos[dataAtr][countRows].indexOf(`${currentPage}`);
            const openSlider = new Slider(e.target.src, dataAtr, currentPage, currentPos, orderPhotos[dataAtr][countRows]); //  !is it normal ?
        });
    }

    switchPhotos(event) {
        // debugger
        this.dataAtr = event.currentTarget.dataset.photo;
        this.isSecondPart = false;
        this.removeCards();
        this.newCards(event.currentTarget.dataset.photo);
        // TODO remove !
        this.debugClipboard();
    }

    removeCards() {
        this.elems.getPortfolioCards().forEach((card) => card.remove());
    }


    newCards(dataAtr) {
        const secondPartLength = orderPhotos[dataAtr][this.countRows].length;
        this.firstPartLength  = secondPartLength > 43 ? 43 : secondPartLength
        let temp = orderPhotos[dataAtr][this.countRows].map((i) => +i);
        if (!this.isFirstPart && !this.isSecondPart) {
            for (let i = 0; i < orderPhotos[dataAtr][this.countRows].length; i++) {
                this.createCard(dataAtr, temp[i]);
            }
        }
        if (this.isFirstPart) { //show first part
            for (let i = 0; i < this.firstPartLength; i++) {
                console.log(this.firstPartLength)
                this.createCard(dataAtr, temp[i]);
            }
        }
        if (this.isSecondPart && secondPartLength > this.firstPartLength) { //after btn click "show-all"
            for (let i = this.firstPartLength; i < secondPartLength; i++) {
                this.createCard(dataAtr, temp[i]);
            }
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
        img.onload = () => {
            this.addGridStyleOnload(newCard, dataAtr, img)
            this.elems.portfolioContainer.append(newCard);
            newCard.append(img)
        }
        img.onerror = function (e) {
            console.log('error', e)
            console.log(page)
            return
        };

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

    getCountRows() {
        const mediaFour = window.matchMedia('(min-width: 1381px)')
        const mediaThree = window.matchMedia('(max-width: 1380px)')
        const mediaTwo = window.matchMedia('(max-width: 1070px)')
        if (mediaTwo.matches) { return 'twoRows' }
        if (mediaThree.matches) { return 'threeRows' }
        if (mediaFour.matches) { return 'fourRows' }
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