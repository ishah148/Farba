// @ts-nocheck
import { VideoPlayer } from "./video_player.js";

export class VideoSlider {
    constructor(videoCategory, currentPos, videoInfoArray) {
        this.videoCategory = videoCategory;
        this.currentPos = currentPos;
        this.videoInfoArray = videoInfoArray;
        this.slideContainer = document.querySelector(".video-galery__container");
        this.buttons = {
            rightButton: document.querySelector(".video-galery__mouse.area-right"),
            leftButton: document.querySelector(".video-galery__mouse.area-left"),
        };
        this.slideCodes = {
            prev: -1,
            current: 0,
            next: 1
        }

        this.currentPlayButtonElement = null;
        this.videoPlayerElement = null;
        this.videoPlayer = null;
        this.init();
    }

    init() {
        this.createSlides();
        this.setPlayButtonEventHandlers();
        this.addEvents();
    }

    createSlides() {
        this.generatePrevSlide();
        this.generateCurrentSlide();
        this.generateNextSlide();
    }

    addEvents() {
        this.buttons.rightButton.onclick = this.openNextSlide.bind(this);
        this.buttons.leftButton.onclick = this.openPrevSlide.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
        document.addEventListener('keyup', this.keyHandler);
    }

    keyHandler(e) {
        if (e.code === 'ArrowRight') this.openNextSlide();
        if (e.code === 'ArrowLeft') this.openPrevSlide();
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
        const wrapper = this.slideContainer
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

            const removeEvents = () => {
                wrapper.replaceWith(wrapper.cloneNode(true));
            }

            if (left()) {
                this.openNextSlide();
                xStart = xMove;
            }

            if (right()) {
                this.openPrevSlide();
                xStart = xMove;
            }
        };
    }

    openNextSlide() {
        this.removeVideoPlayer();
        this.removePlayButtonEventHandlers();

        if (this.currentPos === this.videoInfoArray.length - 1) {
            this.currentPos = 0;
        } else {
            this.currentPos++;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'prev--slide');
        document.querySelector('.next--slide').classList.replace('next--slide', 'current--slide');
        this.generateNextSlide();
        this.clearSlide(0);

        this.setPlayButtonEventHandlers();
    }

    openPrevSlide() {
        this.removeVideoPlayer();
        this.removePlayButtonEventHandlers();

        if (this.currentPos === 0) {
            this.currentPos = this.videoInfoArray.length - 1;
        } else {
            this.currentPos--;
        }
        document.querySelector('.current--slide').classList.replace('current--slide', 'next--slide');
        document.querySelector('.prev--slide').classList.replace('prev--slide', 'current--slide');
        this.generatePrevSlide();
        this.clearSlide(3);

        this.setPlayButtonEventHandlers();
    }

    clearSlide(order) {
        let slides = this.slideContainer.querySelectorAll(".video-galery__slide");
        if (slides[order]) {
            slides[order].remove()
        }
    }

    generateNextSlide() {
        const index = this.getIndexOfVideoInfoArray(this.slideCodes.next);
        const videoInfo = this.videoInfoArray[index];
        const html = `
        <div class="video-galery__slide next--slide" >
            ${this.getVideoPlayerElement(videoInfo)}
        </div>    
        `;
        this.slideContainer.insertAdjacentHTML("beforeend", html);
    }

    generateCurrentSlide() {
        const index = this.getIndexOfVideoInfoArray(this.slideCodes.current);
        const videoInfo = this.videoInfoArray[index];
        const html = `
                <div class="video-galery__slide current--slide">
                    ${this.getVideoPlayerElement(videoInfo)}
                </div>
            `;
        this.slideContainer.insertAdjacentHTML("beforeend", html);
    }

    generatePrevSlide() {
        const index = this.getIndexOfVideoInfoArray(this.slideCodes.prev);
        const videoInfo = this.videoInfoArray[index];
        const html = `
        <div class="video-galery__slide prev--slide" >
            ${this.getVideoPlayerElement(videoInfo)}
        </div>    
        `;
        this.slideContainer.insertAdjacentHTML("afterbegin", html);
    }

    getIndexOfVideoInfoArray(order) {
        let index = this.currentPos + order;
        if ((this.currentPos === 0 && order === -1)) {
            index = this.videoInfoArray.length - 1;
        }
        if (this.currentPos === this.videoInfoArray.length - 1 && order === 1) {
            index = 0;
        }
        return index;
    }

    getVideoPlayerElement(videoInfo) {
        return `
        <div class="slide-content">
            <div class="video-player">
                <div class="video-player__caption" data-translate="${videoInfo.dataTranslate}">
                    <p class="video-player__caption-header">${videoInfo['caption-header']}</p>
                    <p class="video-player__caption-subheader">${videoInfo['caption-subheader']}</p>
                </div>
                <div class="video-player__video-wrapper" id="video-player__video-wrapper_${videoInfo.id}">
                    <video class="video-player__video" id="video-player__video_${videoInfo.id}"
                        poster="./assets/images/video_posters/poster${videoInfo.id}.jpg" preload="metadata">
                        <source id="source__HD-quality_${videoInfo.id}" src="./assets/video/content/video_${videoInfo.id}_1080.mp4"
                            type="video/mp4">
                        <source id="source__high-quality_${videoInfo.id}" src="./assets/video/content/video_${videoInfo.id}_720.mp4"
                            type="video/mp4">
                        <source id="source__medium-quality_${videoInfo.id}"
                            src="./assets/video/content/video_${videoInfo.id}_540.mp4" type="video/mp4">
                        <source id="source__low-quality_${videoInfo.id}" src="./assets/video/content/video_${videoInfo.id}_360.mp4"
                            type="video/mp4">
                    </video>
                    <button class="video-player__start-button" id="video-player__start-button_${videoInfo.id}">
                        <svg class="video-player__start-button-svg">
                            <use xlink:href="./assets/svg/player-sprite.svg#Play_hover"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="video-description-wrapper">
                <div class="video-description">
                    Обычно, когда бренду нужен ролик на 5 секунд, получается один пэк-шот. Но не в этот раз. 
                    Три слова и три ролика о наших любимых консервах Доброфлот. По традиции, в стоп-моушн анимации.
                </div>
            </div>
            <div class="video-contacts">
                <p>stfarba@gmail.com<span>&nbsp;&nbsp;//&nbsp;&nbsp;</span>+375 29 777 40 59</p>
                <a>Telegram</a><span>&nbsp;&nbsp;//&nbsp;&nbsp;</span><a>Whatsapp</a><span>&nbsp;&nbsp;//&nbsp;&nbsp;</span><a>Viber</a>
            </div>
        </div>
        `
    }

    setPlayButtonEventHandlers() {
        this.currentPlayButtonElement = document.querySelector(`#video-player__start-button_${this.currentPos + 1}`);
        this.currentPlayButtonElement.addEventListener("click", () => this.createVideoPlayer());
    }

    
    createVideoPlayer() {
        this.videoPlayer = new VideoPlayer(this.currentPos + 1);
        this.setVideoEndedEventHandler();
        this.videoPlayer.start();
        this.currentPlayButtonElement.classList.add('disappearance');
    }
    
    setVideoEndedEventHandler() {
        this.videoPlayerElement = document.getElementById(`video-player__video_${this.currentPos + 1}`);
        this.videoPlayerElement.addEventListener("videoEnded", () => this.removeVideoPlayer());
    }

    removePlayButtonEventHandlers() {
        let playButtonClone = this.currentPlayButtonElement.cloneNode(true);
        this.currentPlayButtonElement.parentNode.replaceChild(playButtonClone, this.currentPlayButtonElement);
    }

    removeVideoEndedEventHandler() {
        let videoClone = this.videoPlayerElement.cloneNode(true);
        this.videoPlayerElement.parentNode.replaceChild(videoClone, this.videoPlayerElement);
    }


    removeVideoPlayer() {
        const videoPlayerControls = document.getElementById(`video-player__controls_${this.currentPos + 1}`);
        if (videoPlayerControls) {
            delete this.videoPlayer;
            this.currentPlayButtonElement.classList.remove('disappearance');
            videoPlayerControls.remove();

            if (this.videoPlayerElement) {
                this.removeVideoEndedEventHandler();
            }
        }
    }
}
