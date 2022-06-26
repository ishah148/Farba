import { configAtr, configGridStyles, photoOrder } from "./photo_config.js"
import { Slider } from "./slider.js"
export class GridGalery {
    constructor(photoCategory) {
        this.countLoadedFhoto = 0;
        this.photoCategory = photoCategory;// photoCategory['threeRows']
        this.isFirstPartDownloaded = false;
        this.isAllPhotosDownloaded = false;
        this.firstPartLength = null;
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
        this.numberOfColumns = this.getNumberOfColumns();
        this.newCards(this.photoCategory);
        this.galeryEventsInit();
    }

    galeryEventsInit() {
        window.addEventListener("photoDowloaded", () => {
            this.elems.source.setAttribute("src", "../assets/video/video_fullHD_clip.mp4");
                                                    //TODO try to find another way maybe
    //        this.removeCards();                     //it's for correct working of grid 
    //        this.newCards(this.photoCategory);      //without these lines, order of photos will be different after every page reload
                                                    //because of asynchronous image onload
            this.elems.video.load();
            this.elems.video.play();
        });
        this.elems.buttons.forEach((button) => {
            button.onclick = this.switchPhotos.bind(this);
        });
        this.elems.portfolioContainer.addEventListener("click", this.openSlider.bind(this));
    }

    openSlider(event) {
        if (event.target.nodeName !== 'IMG') return;
        const numberOfColumns = this.getNumberOfColumns();
        const photoCategory = event.target.id.split("_")[0];
        const photoNumber = event.target.id.split("-")[0].split("_")[1];
        const currentPos = photoOrder[photoCategory][numberOfColumns].indexOf(`${photoNumber}`);
        //TODO check do we remove slider?
        new Slider(event.target.src, photoCategory, photoNumber, currentPos, photoOrder[photoCategory][numberOfColumns]);
    }

    newCards(photoCategory) {
        const allPhotosArrLength = photoOrder[photoCategory][this.numberOfColumns].length;
        this.firstPartLength = allPhotosArrLength > 43 ? 43 : allPhotosArrLength
        let temp = photoOrder[photoCategory][this.numberOfColumns].map((i) => +i);
        if (!this.isFirstPartDownloaded && !this.isAllPhotosDownloaded) {
            for (let i = 0; i < photoOrder[photoCategory][this.numberOfColumns].length; i++) {
                this.createCard(photoCategory, temp[i]);
            }
        }
        if (this.isFirstPartDownloaded) { //show first part
            for (let i = 0; i < this.firstPartLength; i++) {
                this.createCard(photoCategory, temp[i]);
            }
        }
        if (this.isAllPhotosDownloaded && allPhotosArrLength > this.firstPartLength) { //after btn click "show-all"
            for (let i = this.firstPartLength; i < allPhotosArrLength; i++) {
                this.createCard(photoCategory, temp[i]);
            }
        }
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
        if (this.countLoadedFhoto === 27) {  //!wtf 27
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


    showFirstPart() {
        this.isFirstPartDownloaded = true;
        this.isAllPhotosDownloaded = false;
        this.init();
    }

    showSecondPart() {
        this.isFirstPartDownloaded = false;
        this.isAllPhotosDownloaded = true;
        this.init()
    }

    removeCards() {
        // debugger
        this.elems.getPortfolioCards().forEach((card) => card.remove());
    }


    switchPhotos(event) {
        // debugger
        this.photoCategory = event.currentTarget.dataset.photo;
        this.isAllPhotosDownloaded = false;
        this.removeCards();
        this.newCards(event.currentTarget.dataset.photo);
        // TODO remove !
        this.debugClipboard();
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

    getNumberOfColumns() {
        const mediaFour = window.matchMedia('(min-width: 1381px)');
        const mediaThree = window.matchMedia('(max-width: 1380px)');
        const mediaTwo = window.matchMedia('(max-width: 1070px)');
        if (mediaTwo.matches) { return 'twoColumns' }
        if (mediaThree.matches) { return 'threeColumns' }
        if (mediaFour.matches) { return 'fourColumns' }
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

