let configAtr;
let orderPhotos;
let configGridStyles;
(async function () {
    const module = await import("./photo_config.js");
    window.addEventListener("load", () => {
        const gg = new GridGalery("portfolio", "getCountRows() return 'threeRows'")
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
        this.generateNext()
        this.generatePrev()
        this.wrapper.insertAdjacentHTML("beforeend", modalWindowHTML);
        this.wrapper.classList.add("visible");
        body.classList.add('stop-scrolling');
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
                document.querySelector('.current--slide').classList.add('down')
                document.querySelector('.current--slide').addEventListener('transitionend', () => {
                    this.closeModalWindow()
                    removeEvents()
                })
            }
        };
    }

    nextPhoto() {
        if(this.currentOrder === this.orderPhotos.length -1 ) {return -1}
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
        this.countRows = this.getCountRows()
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
            const countRows = this.getCountRows()
            const dataAtr = e.target.id.split("_")[0];
            const currentPage = e.target.id.split("-")[0].split("_")[1];
            const currentPos = orderPhotos[dataAtr][countRows].indexOf(`${currentPage}`);
            const openSlider = new Slider(e.target.src, dataAtr, currentPage, currentPos, orderPhotos[dataAtr][countRows]);
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
            temp = orderPhotos[dataAtr][this.countRows].map((i) => +i);
        }
        for (let i = 0; i < orderPhotos[dataAtr][this.countRows].length; i++) {

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
            console.log(page)
            return
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

    getCountRows() {
        const mediaFour = window.matchMedia('(min-width: 1381px)')
        const mediaThree = window.matchMedia('(max-width: 1380px)')
        const mediaTwo = window.matchMedia('(max-width: 700px)')
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