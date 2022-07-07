import { configAtr, configGridStyles, photoOrder } from "./photo_config.js"
import { Slider } from "./slider.js"
export class GridGalery {
    constructor(photoCategory) {
        this.countOfLoadedPhoto = 0;
        this.numberOfPreShowedPhotos = 40;  //for all categories;
        // we can create array of specific values for each category
        this.photoCategory = photoCategory;// photoCategory['threeRows']
        this.isPreshowPhotoDownloaded = false;
        this.isAllPhotosDownloaded = false;
        this.elems = {
            buttons: document.querySelectorAll(".buttons-container__button"),
            showAllButton: document.getElementById('show-all'),
            portfolioContainer: document.querySelector(".portfolio__container"),
            video: document.querySelector(".start-screen__background-video"),
            source: document.querySelector(".start-screen__video-source"),
            getPortfolioCards: function () {
                return document.querySelectorAll(".portfolio__card");
            },
        };
        this.init()
    }

    init() {
        this.numberOfColumns = this.getNumberOfColumns();
        this.preShowCards();
        this.galeryEventsInit();
    }

    galeryEventsInit() {
        window.addEventListener("photoDowloaded", () => {
            if (!this.isAllPhotosDownloaded) {
                this.elems.source.setAttribute("src", "../assets/video/video_fullHD_clip.mp4");
                this.elems.video.load();
                this.elems.video.play();
            }
            this.alignGrid();
        });

        this.elems.buttons.forEach((button) => {
            button.onclick = this.switchPhotos.bind(this);
        });

        this.elems.showAllButton.addEventListener("click", () => {
            this.showRemainingCards();
            this.elems.showAllButton.classList.add('invisible');  //TODO change for "скрыть"
        });

        this.elems.portfolioContainer.addEventListener("click", this.openSlider.bind(this));
    }

    alignGrid() {
        //TODO try to find another way maybe
        //it's for correct working of grid 
        //without these lines, order of photos will be different after every page reload
        //because of asynchronous image onload
        this.removeCards();
        if (!this.isAllPhotosDownloaded) {
            this.preShowCards();
        } else {
            // let photoConfig = photoOrder[this.photoCategory][this.numberOfColumns];
            // for (let i = 0; i < photoConfig.length; i++) {
            //     this.createCard(photoConfig[i]);
            // }
        }
    }

    preShowCards() {
        let photoConfig = photoOrder[this.photoCategory][this.numberOfColumns];
        for (let i = 0; i < this.numberOfPreShowedPhotos; i++) {
            this.createCard(photoConfig[i]);
        }
    }

    showRemainingCards() {
        let photoConfig = photoOrder[this.photoCategory][this.numberOfColumns];
        for (let i = this.numberOfPreShowedPhotos; i < photoConfig.length; i++) {
            this.createCard(photoConfig[i]);
        }
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

    createCard(photoNumber) {
        let newCard = document.createElement("div");
        newCard.classList.add("portfolio__card");
        newCard.classList.add(`${this.photoCategory}_${photoNumber}`);
        let img = new Image()
        img.src = `../assets/portfolio/${this.photoCategory}/${this.photoCategory}_${photoNumber}.webp`;
        img.id = `${this.photoCategory}_${photoNumber}-img`;
        img.onload = () => {
            if(!this.isPreshowPhotoDownloaded) {
                this.countOfLoadedPhoto++;
                console.log(this.countOfLoadedPhoto);
            }
            this.addGridStyleOnload(newCard, img)
            this.elems.portfolioContainer.append(newCard);
            newCard.append(img)
            if (this.countOfLoadedPhoto === this.numberOfPreShowedPhotos && !this.isPreshowPhotoDownloaded) {
                this.isPreshowPhotoDownloaded = true;
                window.dispatchEvent(new CustomEvent("photoDowloaded"));
                console.log('half-done')
            }
            if (this.countOfLoadedPhoto === photoOrder[this.photoCategory][this.numberOfColumns].length && !this.isAllPhotosDownloaded) {
                this.isAllPhotosDownloaded = true;
                console.log('done')
                window.dispatchEvent(new CustomEvent("photoDowloaded"));
            }
        }
        img.onerror = function (e) {
            console.log('error', e)
            console.log(photoNumber)
            return
        };
    }

    addGridStyleOnload(newCard, img) {
        let imgH = img.naturalHeight;
        let imgW = img.naturalWidth;
        configGridStyles.forEach((config) => {
            if (imgW === config.width && imgH === config.height) {
                newCard.classList.add(config.class);
            }
        });
    }

    removeCards() {
        // debugger
        this.elems.getPortfolioCards().forEach((card) => card.remove());
    }


    switchPhotos(event) {
        // debugger
        this.photoCategory = event.currentTarget.dataset.photo;
        this.isAllPhotosDownloaded = false;
        this.isPreshowPhotoDownloaded = false;
        this.countOfLoadedPhoto = 0;
        this.elems.showAllButton.classList.remove('invisible');
        this.removeCards();
        this.preShowCards();
        // TODO remove !
        // this.debugClipboard();
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
