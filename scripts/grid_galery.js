import { configAtr, configGridStyles, photoOrder, preShowConfig, bastardsConfig } from "./photo_config.js"
import { Slider } from "./slider.js"
export class GridGalery {
    constructor(photoCategory) {
        this.countOfLoadedPhotos = 0;
        this.countOfAlignedPhotos = 0;
        this.photoCategory = photoCategory;// photoCategory['threeRows']
        this.isAllPhotosDownloaded = false;
        this.isGridAligning = false;  //flag is firing when photos are loaded and aligning works
        // this.isGridAligning goes down when this.countOfAlignedPhotos == this.countOfLoadedPhotos
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
        this.numberOfPreShowedPhotos = preShowConfig[this.photoCategory][this.numberOfColumns];
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
            this.fixBastards();
            this.alignGrid();
        });

        this.elems.buttons.forEach((button) => {
            button.onclick = this.switchPhotos.bind(this);
        });

        this.elems.showAllButton.addEventListener("click", () => {
            // document.querySelector("style").remove();
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
        //* How aligning works:
        //* first of all "preShow" is called in "init" function;
        //* it creates Cards from config and adds "countLoadedAndAlignedImgs" function for each Card onload event;
        //* Аfter loading, each image call "countLoadedAndAlignedImgs" function,
        //* where the number of uploaded photos is counted in "this.countOfLoadedPhotos" variable;
        //* when "this.countOfLoadedPhotos" === "this.numberOfPreShowedPhotos" , we dispatch an event "photoDowloaded",
        //* that removes all cards and adds them again;
        //*
        this.isGridAligning = true;
        this.removeCards();
        if (!this.isAllPhotosDownloaded) {
            this.preShowCards();
        } else {
            this.showAllCards();
        }
    }

    //TODO
    // showCards() {
    //     let startPosition = 
    //     let endPosition = 
    //     let photoConfig = photoOrder[this.photoCategory][this.numberOfColumns];
    //     for (let i = startPosition; i < endPosition; i++) {
    //         this.createCard(photoConfig[i]);
    //     }
    // }

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

    showAllCards() {
        let photoConfig = photoOrder[this.photoCategory][this.numberOfColumns];
        for (let i = 0; i < photoConfig.length; i++) {
            this.createCard(photoConfig[i]);
        }
    }

    openSlider(event) {
        if (event.target.nodeName !== 'IMG') return;
        const numberOfColumns = this.getNumberOfColumns();
        const photoCategory = event.target.classList[0].split("_")[0];
        const photoNumber = event.target.classList[0].split("-")[0].split("_")[1];
        const currentPos = photoOrder[photoCategory][numberOfColumns].indexOf(+photoNumber);
        //TODO check do we remove slider?
        new Slider(event.target.src, photoCategory, photoNumber, currentPos, photoOrder[photoCategory][numberOfColumns]);
    }

    createCard(photoNumber) {
        let newCard = document.createElement("div");
        newCard.classList.add("portfolio__card");
        newCard.classList.add(`${this.photoCategory}_${photoNumber}`);
        let img = new Image()
        img.src = `../assets/portfolio/${this.photoCategory}/${this.photoCategory}_${photoNumber}.webp`;
        img.classList.add(`${this.photoCategory}_${photoNumber}-img`);
        img.onload = this.countLoadedAndAlignedImgs.bind(this, [newCard, img]);
        img.onerror = function (e) {
            console.log('error', e);
            console.log(photoNumber);
            return;
        };
    }

    countLoadedAndAlignedImgs(args) {
        let [newCard, img] = args;
        if (!this.isGridAligning) {
            this.countOfLoadedPhotos++;
            // console.log(`loaded`, this.countOfLoadedPhotos);
        } else {
            this.countOfAlignedPhotos++;
            // console.log(`aligned`, this.countOfAlignedPhotos);
        }

        this.addGridStyleOnload(newCard, img)
        this.elems.portfolioContainer.append(newCard);
        newCard.append(img)             //! возможно дело в том, где апендим (нет)

        if (!this.isGridAligning && this.countOfLoadedPhotos === this.numberOfPreShowedPhotos) {
            window.dispatchEvent(new CustomEvent("photoDowloaded"));
            // console.log('half-done')
        }
        if (!this.isGridAligning && this.countOfLoadedPhotos === photoOrder[this.photoCategory][this.numberOfColumns].length) {
            this.isAllPhotosDownloaded = true;
            window.dispatchEvent(new CustomEvent("photoDowloaded"));
            // console.log('done');
        }
        if (this.countOfLoadedPhotos && this.countOfAlignedPhotos === this.countOfLoadedPhotos) {
            this.isGridAligning = false;
            this.countOfAlignedPhotos = 0;
        }
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
        this.isGridAligning = false;
        this.countOfLoadedPhotos = 0;
        this.countOfAlignedPhotos = 0;
        this.elems.showAllButton.classList.remove('invisible');
        this.numberOfColumns = this.getNumberOfColumns();
        this.numberOfPreShowedPhotos = preShowConfig[this.photoCategory][this.numberOfColumns];
        // document.querySelector("style").remove();
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

    fixBastards() {
        // const bastards = bastardsConfig[this.photoCategory][this.numberOfColumns];
        // let style = document.createElement('style');
        // for (let bastardNumber in bastards) {
        //     style.innerHTML += bastards[bastardNumber];
        // }
        // document.head.appendChild(style);
    }
}

