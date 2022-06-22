import {configAtr,configGridStyles,orderPhotos} from "./photo_config.js"
import {Slider} from "./slider.js"
export class GridGalery {
    constructor(dataAtr) {
        this.countLoadedFhoto = 0;
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
                this.createCard(dataAtr, temp[i]);
            }
        }
        if (this.isSecondPart && secondPartLength > this.firstPartLength) { //after btn click "show-all"
            for (let i = this.firstPartLength; i < secondPartLength; i++) {
                this.createCard(dataAtr, temp[i]);
            }
        }
    }

    shuffleArr(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    getRange(max) {
        let arr = [];
        for (let i = 1; i <= max; i++) {
            arr.push(i);
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
        this.countLoadedFhoto++;
        if (this.countLoadedFhoto === 27) {
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

