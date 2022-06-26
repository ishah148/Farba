import { configAtr, configGridStyles, orderPhotos } from "./photo_config.js"
import { Slider } from "./slider.js"
export class GridGalery {
    constructor(photoCategory) {
        this.countLoadedFhoto = 0;
        this.photoCategory = photoCategory;// photoCategory['threeRows']
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
        this.rowsNumber = this.getCountRows();
        console.log(this.elems);
        this.newCards(this.photoCategory);
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
        // debugger
        this.elems.getPortfolioCards().forEach((card) => card.remove());
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
            if(e.target.nodeName !== 'IMG') return;
            const rowsNumber = this.getCountRows();
            const photoCategory = e.target.id.split("_")[0];
            const photoNumber = e.target.id.split("-")[0].split("_")[1];
            const currentPos = orderPhotos[photoCategory][rowsNumber].indexOf(`${photoNumber}`);
            //! do we remove slider?
            new Slider(e.target.src, photoCategory, photoNumber, currentPos, orderPhotos[photoCategory][rowsNumber]);
    });
    }

    switchPhotos(event) {
        // debugger
        this.photoCategory = event.currentTarget.dataset.photo;
        this.isSecondPart = false;
        this.removeCards();
        this.newCards(event.currentTarget.dataset.photo);
        // TODO remove !
        this.debugClipboard();
    }


    newCards(photoCategory) {
        const secondPartLength = orderPhotos[photoCategory][this.rowsNumber].length;
        this.firstPartLength = secondPartLength > 43 ? 43 : secondPartLength
        let temp = orderPhotos[photoCategory][this.rowsNumber].map((i) => +i);
        if (!this.isFirstPart && !this.isSecondPart) {
            for (let i = 0; i < orderPhotos[photoCategory][this.rowsNumber].length; i++) {
                this.createCard(photoCategory, temp[i]);
            }
        }
        if (this.isFirstPart) { //show first part
            for (let i = 0; i < this.firstPartLength; i++) {
                this.createCard(photoCategory, temp[i]);
            }
        }
        if (this.isSecondPart && secondPartLength > this.firstPartLength) { //after btn click "show-all"
            for (let i = this.firstPartLength; i < secondPartLength; i++) {
                this.createCard(photoCategory, temp[i]);
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

    createCard(photoCategory, page) {
        let newCard = document.createElement("div");
        newCard.classList.add("portfolio__card");
        newCard.classList.add(`${photoCategory}_${page}`);
        let img = new Image()
        img.src = `../assets/portfolio/${photoCategory}/${photoCategory}_${page}.webp`;
        img.id = `${photoCategory}_${page}-img`;
        img.onload = () => {
            this.addGridStyleOnload(newCard, photoCategory, img)
            this.elems.portfolioContainer.append(newCard);
            newCard.append(img)
        }
        img.onerror = function (e) {
            console.log('error', e)
            console.log(page)
            return
        };

    }

    addGridStyleOnload(newCard, photoCategory, img) {
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
        const mediaFour = window.matchMedia('(min-width: 1381px)');
        const mediaThree = window.matchMedia('(max-width: 1380px)');
        const mediaTwo = window.matchMedia('(max-width: 1070px)');
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

